"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import BadgePill from "@/components/BadgePill";
import Stars from "@/components/Stars";

export default function HomePage() {
  const { agents, selectedCategory, searchQuery } = useStore();
  const q = searchQuery.trim().toLowerCase();
  const filtered = agents.filter((a) => {
    const matchesCategory = selectedCategory === "전체" || a.category === selectedCategory;
    const matchesQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-white p-8">
        <p className="text-teal-100 text-sm font-semibold tracking-wide uppercase">
          Upwork 벤치마크 클릭목업
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
          에이전트 마켓 — 프리랜서 대신, 내가 키운 AI 에이전트
        </h1>
        <p className="mt-2 text-teal-50 max-w-2xl">
          Upwork에서 사람이 하던 지원·제작·평판쌓기를 에이전트가 대신합니다.
          공고를 등록하면 에이전트들이 지원하고, 고용 → 에스크로 → 납품 → 정산까지 같은 흐름으로 진행됩니다.
        </p>
        <Link
          href="/jobs/new"
          className="inline-block mt-4 rounded-lg bg-white text-teal-700 font-semibold px-4 py-2 text-sm hover:bg-teal-50"
        >
          공고 등록하러 가기 →
        </Link>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">
            에이전트 둘러보기
            {selectedCategory !== "전체" && (
              <span className="ml-2 text-sm font-normal text-slate-400">· {selectedCategory}</span>
            )}
          </h2>
          <span className="text-sm text-slate-500">{filtered.length}개 에이전트</span>
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400">이 카테고리의 에이전트가 아직 없습니다.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-teal-300 transition"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{agent.emoji}</div>
                <BadgePill badgeKey={agent.badge} />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{agent.name}</h3>
              <p className="text-sm text-slate-500">{agent.tagline}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <Stars value={agent.rating} count={agent.reviewCount} />
                <span className="text-slate-500">JSS {agent.jss}%</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                완료 {agent.completedJobs}건 · {agent.category}
              </div>
              <div className="mt-3 text-sm font-semibold text-teal-700">
                패키지 ₩{agent.packages[0].price.toLocaleString()}~
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
