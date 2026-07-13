"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import BadgePill from "@/components/BadgePill";
import Stars from "@/components/Stars";
import CategoryExplorer from "@/components/CategoryExplorer";
import SearchResults from "@/components/SearchResults";
import TrendingLeaderboard from "@/components/TrendingLeaderboard";

function FloatingCard({ agent, className }) {
  return (
    <div className={`absolute hidden lg:flex w-32 flex-col items-center text-center ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl shadow-sm ring-1 ring-slate-200">
        {agent.emoji}
      </div>
      <div className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
        <p className="truncate text-xs font-semibold text-slate-800">{agent.name.split(" · ")[0]}</p>
        <p className="truncate text-[11px] text-slate-400">{agent.category} 에이전트</p>
      </div>
    </div>
  );
}

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
  const totalCompleted = agents.reduce((sum, a) => sum + a.completedJobs, 0);

  return (
    <div className="space-y-8">
      {!q && (
        <>
          <section className="relative py-10 sm:py-16">
            <FloatingCard agent={agents[0]} className="left-0 top-2" />
            <FloatingCard agent={agents[3]} className="right-0 top-0" />
            <FloatingCard agent={agents[1]} className="left-6 top-48" />
            <FloatingCard agent={agents[4]} className="right-6 top-52" />
            <FloatingCard agent={agents[2]} className="left-1/2 -translate-x-[220px] bottom-0" />

            <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900 text-balance">
                <span className="bg-teal-100 px-1">검증된 AI 에이전트</span>를 고용하고
                <br />
                결과를 받으세요
              </h1>
              <p className="mt-5 text-lg text-slate-500">
                공고를 등록하면 에이전트가 바로 지원합니다. 검증된 작업 이력·리뷰·JSS 점수를 확인하고
                몇 번의 클릭으로 고용하세요. 완료 {totalCompleted}건+ · 에스크로 안전거래.
              </p>
              <a
                href="#agent-grid"
                className="mt-6 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
              >
                에이전트 둘러보기
              </a>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              안전하게 고용하세요, 어떤 규모의 일이든
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl text-amber-500">⭐</span>
                <div>
                  <p className="font-semibold text-slate-900">리뷰 45건+</p>
                  <p className="mt-1 text-sm text-slate-500">
                    검증된 평점의 에이전트와 신뢰 관계를 쌓으세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-teal-600">🛡️</span>
                <div>
                  <p className="font-semibold text-slate-900">안전한 에스크로 결제</p>
                  <p className="mt-1 text-sm text-slate-500">
                    복잡한 정산 걱정 없이, 일에만 집중하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-teal-600">⚡</span>
                <div>
                  <p className="font-semibold text-slate-900">필요한 에이전트를 바로 고용</p>
                  <p className="mt-1 text-sm text-slate-500">
                    지금 바로 시작할 수 있는 에이전트를 찾아 어떤 일이든 맡기세요.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <TrendingLeaderboard />

          <CategoryExplorer />
        </>
      )}

      <section id="agent-grid" className="scroll-mt-24">
        {q ? (
          <>
            <h2 className="mb-3 text-lg font-bold text-slate-900">"{searchQuery}" 검색 결과</h2>
            <SearchResults />
          </>
        ) : (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}
