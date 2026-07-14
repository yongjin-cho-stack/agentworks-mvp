"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import BadgePill from "@/components/BadgePill";

const STEPS = [
  { key: "active", label: "④ 계약·에스크로", desc: "Supabase 지갑에 대금 예치 완료" },
  { key: "submitted", label: "⑤ 작업·납품 → ⑥ 검토", desc: "에이전트가 납품, 14일 자동승인 대기중" },
  { key: "released", label: "⑦ 정산·평판", desc: "대금 지급 및 리뷰 등록 완료" },
];

function stepIndex(status) {
  if (status === "released") return 2;
  if (status === "submitted") return 1;
  return 0;
}

export default function ContractPage() {
  const { id } = useParams();
  const router = useRouter();
  const { contracts, jobs, agents, submitWork, releasePayment } = useStore();
  const contract = contracts.find((c) => c.id === id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!contract) return <p className="text-slate-500">계약을 찾을 수 없습니다.</p>;

  const job = jobs.find((j) => j.id === contract.jobId);
  const agent = agents.find((a) => a.id === contract.agentId);
  const idx = stepIndex(contract.status);

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="text-sm text-slate-500 hover:text-slate-800">
        ← 뒤로
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">계약 · {contract.id}</p>
            <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
            <p className="mt-1 text-sm text-slate-500 flex items-center gap-2">
              <span className="grayscale">{agent.emoji}</span> {agent.name} <BadgePill badgeKey={agent.badge} />
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">₩{contract.price.toLocaleString()}</div>
            <div className="text-xs text-amber-600">에스크로 예치중</div>
          </div>
        </div>

        {/* Upwork 7단계 흐름 매핑 진행바 */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className={`rounded-lg p-3 text-sm ${
                i <= idx ? "bg-teal-50 border border-teal-200" : "bg-slate-50 border border-slate-200 opacity-50"
              }`}
            >
              <div className="font-semibold text-slate-800">{step.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {contract.status === "active" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900 mb-2">작업 진행중</h2>
          <p className="text-sm text-slate-500 mb-4">
            에이전트가 헤르메스 + 콘텐츠 툴로 작업 중입니다. 완료되면 제출합니다.
          </p>
          <button
            onClick={() => submitWork(contract.id)}
            className="rounded-lg bg-teal-600 text-white font-semibold px-4 py-2 text-sm hover:bg-teal-700"
          >
            에이전트 작업 완료 → 납품물 제출
          </button>
        </div>
      )}

      {(contract.status === "submitted" || contract.status === "released") && contract.deliverable && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900 mb-1">납품물 (mock)</h2>
          <p className="text-sm text-slate-500 mb-4">{contract.deliverable.summary}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {contract.deliverable.items.map((item) => (
              <div
                key={item.index}
                className="aspect-square rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center p-2"
              >
                <div className="text-3xl grayscale">{item.emoji}</div>
                <p className="mt-1 text-[11px] text-slate-500 leading-tight">{item.caption}</p>
              </div>
            ))}
          </div>
          {contract.status === "submitted" && (
            <p className="mt-4 text-xs text-slate-400">
              제출일 {contract.submittedAt.toLocaleDateString()} · 자동승인 예정일{" "}
              {contract.autoReleaseAt.toLocaleDateString()} (14일 리뷰 규칙)
            </p>
          )}
        </div>
      )}

      {contract.status === "submitted" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900 mb-3">검토 및 정산</h2>
          <label className="block text-sm font-medium text-slate-700 mb-1">평점</label>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className={`text-2xl ${n <= rating ? "text-amber-500" : "text-slate-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <label className="block text-sm font-medium text-slate-700 mb-1">리뷰 코멘트</label>
          <textarea
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm h-20"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="납품물에 대한 평가를 남겨주세요"
          />
          <button
            onClick={() => releasePayment(contract.id, { rating, comment: comment || "만족스러운 결과물입니다." })}
            className="mt-3 rounded-lg bg-teal-600 text-white font-semibold px-4 py-2 text-sm hover:bg-teal-700"
          >
            승인 및 대금 정산
          </button>
        </div>
      )}

      {contract.status === "released" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-bold text-emerald-800">정산 완료</h2>
          <p className="mt-1 text-sm text-emerald-700">
            ₩{contract.price.toLocaleString()}이 {agent.name}에게 지급되었습니다.
            평점 {contract.review.rating}점이 반영되어 JSS·등급이 갱신되었습니다.
          </p>
          <Link href={`/agents/${agent.id}`} className="mt-3 inline-block text-sm font-semibold text-emerald-800 underline">
            에이전트 프로필에서 갱신된 등급 확인 →
          </Link>
        </div>
      )}
    </div>
  );
}
