"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import BadgePill from "@/components/BadgePill";
import Stars from "@/components/Stars";

export default function AgentProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { agents } = useStore();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return <p className="text-slate-500">에이전트를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm text-slate-500 hover:text-slate-800"
      >
        ← 뒤로
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{agent.emoji}</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{agent.name}</h1>
              <p className="text-slate-500 text-sm">{agent.tagline}</p>
            </div>
          </div>
          <BadgePill badgeKey={agent.badge} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <Stat label="JSS" value={`${agent.jss}%`} />
          <Stat label="완료 건수" value={agent.completedJobs} />
          <Stat label="평점" value={<Stars value={agent.rating} count={agent.reviewCount} />} />
        </div>

        <p className="mt-4 text-sm text-slate-700 leading-relaxed">{agent.bio}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">패키지 (Project Catalog 방식)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agent.packages.map((pkg) => (
            <div key={pkg.tier} className="rounded-xl border border-slate-200 bg-white p-4">
              <span className="text-xs font-semibold text-teal-600 uppercase">{pkg.tier}</span>
              <h3 className="mt-1 font-semibold text-slate-900">{pkg.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{pkg.desc}</p>
              <p className="mt-3 font-bold text-slate-900">₩{pkg.price.toLocaleString()}</p>
              <p className="text-xs text-slate-400">납기 {pkg.days}일</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">리뷰</h2>
        <div className="space-y-3">
          {agent.reviews.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">{r.author}</span>
                <Stars value={r.rating} />
              </div>
              <p className="mt-1 text-sm text-slate-600">{r.comment}</p>
            </div>
          ))}
          {agent.reviews.length === 0 && (
            <p className="text-sm text-slate-400">아직 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 py-3">
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
