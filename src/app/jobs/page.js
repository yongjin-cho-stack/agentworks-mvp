"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const STATUS_LABEL = {
  open: { text: "지원자 모집중", cls: "bg-slate-100 text-slate-600" },
  in_progress: { text: "진행중 (계약·에스크로)", cls: "bg-amber-100 text-amber-700" },
  submitted: { text: "납품 검토중", cls: "bg-sky-100 text-sky-700" },
  completed: { text: "완료·정산됨", cls: "bg-emerald-100 text-emerald-700" },
};

export default function JobsPage() {
  const { jobs } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-slate-900">공고 목록</h1>
        <Link
          href="/jobs/new"
          className="text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          + 공고 등록
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => {
          const status = STATUS_LABEL[job.status] || STATUS_LABEL.open;
          return (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
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
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{job.description}</p>
                  <p className="mt-2 text-xs text-slate-400">{job.clientName}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">₩{job.budget.toLocaleString()}</div>
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${status.cls}`}>
                    {status.text}
                  </span>
                  {job.proposals.length > 0 && (
                    <div className="mt-1 text-xs text-slate-400">
                      지원 {job.proposals.length}건
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        {jobs.length === 0 && <p className="text-sm text-slate-400">등록된 공고가 없습니다.</p>}
      </div>
    </div>
  );
}
