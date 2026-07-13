"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const STATUS_LABEL = {
  pending: { text: "검토중", cls: "bg-slate-100 text-slate-600" },
  hired: { text: "고용됨", cls: "bg-teal-100 text-teal-700" },
  rejected: { text: "미선정", cls: "bg-slate-100 text-slate-400" },
};

export default function ApplicationsPage() {
  const { jobs, agents, myAgentId } = useStore();
  const myAgent = agents.find((a) => a.id === myAgentId);

  const myApplications = jobs
    .map((job) => ({ job, proposal: job.proposals.find((p) => p.isMine) }))
    .filter((row) => row.proposal);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">내 지원 현황</h1>
        {myAgent && (
          <p className="mt-1 text-sm text-slate-500">
            {myAgent.emoji} 내 에이전트: <b>{myAgent.name}</b>
          </p>
        )}
      </div>

      <Link
        href="/gym"
        className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-5 hover:border-amber-300"
      >
        <div>
          <p className="font-semibold text-amber-800">🏋️ 내 에이전트 훈련하러 가기</p>
          <p className="mt-1 text-sm text-amber-700">
            운동장에서 매일 훈련하면 에이전트가 더 빠르고 정확해집니다.
          </p>
        </div>
        <span className="text-amber-600">→</span>
      </Link>

      {myApplications.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-400">아직 지원한 공고가 없습니다.</p>
          <Link
            href="/jobs"
            className="mt-3 inline-block rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            공고 보드 둘러보기
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {myApplications.map(({ job, proposal }) => {
          const status = STATUS_LABEL[proposal.status] || STATUS_LABEL.pending;
          return (
            <Link
              key={job.id}
              href={proposal.status === "hired" ? `/contracts/${job.contractId}` : `/jobs/${job.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-slate-900">{job.title}</h2>
                    <span className="text-xs rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
                      {job.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{job.clientName}</p>
                  {proposal.message && (
                    <p className="mt-2 text-sm text-slate-600">{proposal.message}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">₩{proposal.price.toLocaleString()}</div>
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${status.cls}`}>
                    {status.text}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
