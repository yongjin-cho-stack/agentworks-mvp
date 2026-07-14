"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import BadgePill from "@/components/BadgePill";
import Stars from "@/components/Stars";
import ApplyModal from "@/components/ApplyModal";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { jobs, agents, simulateApplications, hireAgent } = useStore();
  const [applyOpen, setApplyOpen] = useState(false);
  const job = jobs.find((j) => j.id === id);

  if (!job) return <p className="text-slate-500">공고를 찾을 수 없습니다.</p>;

  function agentOf(agentId) {
    return agents.find((a) => a.id === agentId);
  }

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="text-sm text-slate-500 hover:text-slate-800">
        ← 뒤로
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
            <p className="mt-1 text-sm text-slate-500">{job.clientName} · {job.category}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">₩{job.budget.toLocaleString()}</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">{job.description}</p>
        {job.status === "open" && (
          <button
            onClick={() => setApplyOpen(true)}
            className="mt-4 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            ⚡ 지원하기 (Apply)
          </button>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">지원한 에이전트 ({job.proposals.length})</h2>
          {job.status === "open" && (
            <button
              onClick={() => simulateApplications(job.id)}
              className="rounded-lg border border-teal-600 text-teal-700 text-sm font-semibold px-3 py-1.5 hover:bg-teal-50"
            >
              지원 받기 시뮬레이션 ▶
            </button>
          )}
        </div>

        {job.proposals.length === 0 && (
          <p className="text-sm text-slate-400">
            아직 지원한 에이전트가 없습니다. 위 버튼으로 지원을 시뮬레이션하세요.
          </p>
        )}

        <div className="space-y-3">
          {job.proposals.map((proposal) => {
            const agent = agentOf(proposal.agentId);
            return (
              <div
                key={proposal.id}
                className={`rounded-xl border p-4 ${
                  proposal.status === "hired"
                    ? "border-teal-300 bg-teal-50"
                    : proposal.status === "rejected"
                    ? "border-slate-200 bg-slate-50 opacity-60"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl grayscale">{agent.emoji}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{agent.name}</span>
                        <BadgePill badgeKey={agent.badge} />
                        {proposal.isMine && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            내 지원
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5">
                        <Stars value={agent.rating} count={agent.reviewCount} />
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{proposal.message}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Connects {proposal.connectsUsed}개 사용해 지원 · JSS {agent.jss}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-slate-900">₩{proposal.price.toLocaleString()}</div>
                    {proposal.status === "pending" && job.status === "open" && (
                      <button
                        onClick={() => {
                          const contractId = hireAgent(job.id, proposal.id);
                          if (contractId) router.push(`/contracts/${contractId}`);
                        }}
                        className="mt-2 rounded-lg bg-teal-600 text-white text-sm font-semibold px-3 py-1.5 hover:bg-teal-700"
                      >
                        고용하기
                      </button>
                    )}
                    {proposal.status === "hired" && (
                      <span className="mt-2 inline-block text-xs font-semibold text-teal-700">
                        고용됨 →{" "}
                        <button
                          className="underline"
                          onClick={() => router.push(`/contracts/${job.contractId}`)}
                        >
                          계약 보기
                        </button>
                      </span>
                    )}
                    {proposal.status === "rejected" && (
                      <span className="mt-2 inline-block text-xs text-slate-400">미선정</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {applyOpen && <ApplyModal job={job} onClose={() => setApplyOpen(false)} />}
    </div>
  );
}
