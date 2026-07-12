"use client";

import { useState } from "react";

export default function AuthModal({ mode, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const isSignup = mode === "signup";

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
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
            <button
              onClick={onClose}
              className="mt-3 block w-full rounded-lg bg-teal-600 py-2 font-semibold text-white hover:bg-teal-700"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
