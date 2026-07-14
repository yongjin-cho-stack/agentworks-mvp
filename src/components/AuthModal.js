"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const ROLES = [
  {
    key: "participant",
    emoji: "🤖",
    title: "참가자",
    desc: "내 에이전트로 공고에 지원하고 일해서 소득을 법니다.",
  },
  {
    key: "client",
    emoji: "🏢",
    title: "의뢰자",
    desc: "공고를 올리고 에이전트를 고용해 결과물을 받습니다.",
  },
];

export default function AuthModal({ mode, onClose }) {
  const { setUserRole, setMyAgentId, agents } = useStore();
  const router = useRouter();
  const isSignup = mode === "signup";
  const [role, setRole] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setUserRole(role);
    if (role === "participant" && agents.length > 0) {
      setMyAgentId(agents[0].id);
    }
    setSubmitted(true);
  }

  function handleStart() {
    onClose();
    router.push(role === "participant" ? "/jobs" : "/");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {isSignup ? "회원가입" : "로그인"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="mt-4 rounded-lg bg-teal-50 p-4 text-sm text-teal-700">
            {isSignup
              ? "가입 완료(mock)! 실제 계정은 만들어지지 않았습니다 — 클릭목업 데모입니다."
              : "로그인 완료(mock)! 실제 인증은 이 데모에 연결돼 있지 않습니다."}
            <p className="mt-1 text-teal-600">
              선택하신 역할: <b>{role === "participant" ? "참가자" : "의뢰자"}</b>
            </p>
            <button
              onClick={handleStart}
              className="mt-3 block w-full rounded-lg bg-teal-600 py-2 font-semibold text-white hover:bg-teal-700"
            >
              {role === "participant" ? "공고 보드로 이동" : "시작하기"}
            </button>
          </div>
        ) : !role ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-slate-700">역할을 선택하세요</p>
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-teal-400 hover:bg-teal-50/50"
              >
                <span className="text-2xl grayscale">{r.emoji}</span>
                <span>
                  <span className="block font-semibold text-slate-900">{r.title}</span>
                  <span className="block text-xs text-slate-500">{r.desc}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setRole(null)}
              className="text-xs font-medium text-slate-400 hover:text-slate-600"
            >
              ← 역할 다시 선택
            </button>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <span className="grayscale">{ROLES.find((r) => r.key === role).emoji}</span> {ROLES.find((r) => r.key === role).title}로 진행
            </div>
            {isSignup && (
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-1">이름</span>
                <input className="modal-input" placeholder="홍길동" required />
              </label>
            )}
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">이메일</span>
              <input type="email" className="modal-input" placeholder="you@example.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">비밀번호</span>
              <input type="password" className="modal-input" placeholder="********" required />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-2.5 font-semibold text-white hover:bg-teal-700"
            >
              {isSignup ? "가입하기" : "로그인"}
            </button>
            <p className="text-center text-xs text-slate-400">
              데모용 UI입니다 — 실제 계정을 만들지 않습니다.
            </p>
          </form>
        )}
      </div>

      <style jsx global>{`
        .modal-input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
        }
        .modal-input:focus {
          outline: none;
          border-color: #14b8a6;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
        }
      `}</style>
    </div>
  );
}
