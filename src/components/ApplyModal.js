"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { mockDeliverable } from "@/lib/store";

const STEPS = ["공고 확인", "에이전트 실행", "검토·개입", "제출"];

export default function ApplyModal({ job, onClose }) {
  const { agents, myAgentId, submitApplication } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [deliverable, setDeliverable] = useState(null);
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(job.budget);
  const [done, setDone] = useState(false);

  const myAgent = agents.find((a) => a.id === myAgentId) || agents[0];

  function runAgent() {
    setRunning(true);
    setTimeout(() => {
      setDeliverable(mockDeliverable(job, myAgent));
      setRunning(false);
      setStep(2);
    }, 900);
  }

  function submit() {
    const proposalId = submitApplication(job.id, myAgent.id, { price: Number(price), note });
    setDone(true);
    setStep(3);
    return proposalId;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-900">⚡ 지원하기 (Apply)</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {/* 진행 단계 표시 */}
        <div className="mt-4 flex items-center gap-1">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-1">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i < step
                    ? "bg-teal-600 text-white"
                    : i === step
                    ? "bg-teal-100 text-teal-700 ring-2 ring-teal-500"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs ${i === step ? "font-semibold text-slate-900" : "text-slate-400"}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && <div className="mx-1 h-px flex-1 bg-slate-200" />}
            </div>
          ))}
        </div>

        {/* 0. 공고 확인 */}
        {step === 0 && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">{job.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{job.clientName} · {job.category}</p>
              <p className="mt-2 text-sm text-slate-600">{job.description}</p>
              <p className="mt-2 font-bold text-slate-900">예산 ₩{job.budget.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm">
              <span className="text-xl grayscale">{myAgent.emoji}</span>
              <span>
                내 에이전트: <b>{myAgent.name}</b>
              </span>
            </div>
            <button
              onClick={() => setStep(1)}
              className="w-full rounded-lg bg-teal-600 py-2.5 font-semibold text-white hover:bg-teal-700"
            >
              다음 →
            </button>
          </div>
        )}

        {/* 1. 에이전트 실행 */}
        {step === 1 && (
          <div className="mt-5 space-y-3">
            <p className="text-sm text-slate-600">
              내 에이전트가 이 공고에 맞는 초안을 생성합니다. 실행하면 결과물 미리보기가 나옵니다.
            </p>
            {running ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-teal-300 bg-teal-50/50 py-10">
                <span className="animate-pulse text-2xl grayscale">{myAgent.emoji}</span>
                <span className="text-sm text-teal-700">실행 중…</span>
              </div>
            ) : (
              <button
                onClick={runAgent}
                className="w-full rounded-lg bg-teal-600 py-2.5 font-semibold text-white hover:bg-teal-700"
              >
                에이전트 실행하기 ▶
              </button>
            )}
          </div>
        )}

        {/* 2. 검토·개입 */}
        {step === 2 && deliverable && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold text-slate-900">생성된 결과물 미리보기</p>
            <div className="grid grid-cols-3 gap-2">
              {deliverable.items.slice(0, 6).map((item) => (
                <div
                  key={item.index}
                  className="flex aspect-square flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-center"
                >
                  <span className="text-xl grayscale">{item.emoji}</span>
                  <span className="mt-1 text-[10px] leading-tight text-slate-500">시안 {item.index}</span>
                </div>
              ))}
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                수정 요청 · 코멘트 (선택)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="예: 3번 시안 톤 좀 더 밝게 부탁드려요"
                className="h-16 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">지원 견적</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <button
              onClick={submit}
              className="w-full rounded-lg bg-teal-600 py-2.5 font-semibold text-white hover:bg-teal-700"
            >
              이 결과물로 제출하기 →
            </button>
          </div>
        )}

        {/* 3. 제출 완료 */}
        {step === 3 && done && (
          <div className="mt-5 space-y-3">
            <div className="rounded-lg bg-teal-50 p-4 text-sm text-teal-700">
              제출 완료! "{job.title}"에 {myAgent.name}로 지원했습니다. 의뢰자가 검토 후 고용 여부를
              결정합니다.
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push("/applications");
                }}
                className="flex-1 rounded-lg bg-teal-600 py-2.5 font-semibold text-white hover:bg-teal-700"
              >
                내 지원 현황 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
