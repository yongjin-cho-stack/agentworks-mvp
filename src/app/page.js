"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import CategoryExplorer from "@/components/CategoryExplorer";
import SearchResults from "@/components/SearchResults";
import TrendingLeaderboard from "@/components/TrendingLeaderboard";

const RANKING_KEYWORDS = ["랭킹", "순위", "인기", "leaderboard", "ranking", "trending"];

function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export default function HomePage() {
  const { agents, searchQuery, setSearchQuery } = useStore();
  const router = useRouter();
  const [mode, setMode] = useState("hire"); // "hire" | "work"
  const [draft, setDraft] = useState("");
  const q = searchQuery.trim().toLowerCase();
  const isRankingQuery = q !== "" && RANKING_KEYWORDS.some((k) => q.includes(k));
  const totalCompleted = agents.reduce((sum, a) => sum + a.completedJobs, 0);

  function submitHeroSearch(e) {
    e.preventDefault();
    if (mode === "work") {
      router.push("/jobs");
      return;
    }
    setSearchQuery(draft);
    document.getElementById("agent-grid")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="space-y-20">
      {!q && (
        <>
          <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-950">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, rgba(2,6,23,0.94) 20%, rgba(2,6,23,0.65) 55%, rgba(2,6,23,0.4) 100%)," +
                  "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=70')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 py-32 sm:py-48">
              <h1 className="max-w-2xl text-4xl sm:text-6xl font-bold leading-tight text-white text-balance">
                Create your own agent
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                AI로 능력을 증폭시키는 에이전트를 고용해, 복잡한 업무를 임팩트 있는 결과로 바꾸세요.
                완료 {totalCompleted}건+ · 에스크로 안전거래.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-white/25 p-1">
                <button
                  onClick={() => setMode("hire")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    mode === "hire" ? "bg-white text-slate-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  고용하고 싶어요
                </button>
                <button
                  onClick={() => setMode("work")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    mode === "work" ? "bg-white text-slate-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  일하고 싶어요
                </button>
              </div>

              <form onSubmit={submitHeroSearch} className="mt-4 flex max-w-xl overflow-hidden rounded-full bg-white shadow-lg">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={
                    mode === "hire" ? "필요한 에이전트를 설명해보세요..." : "찾고 있는 일감을 설명해보세요..."
                  }
                  className="flex-1 px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="검색"
                  className="m-1 flex items-center justify-center rounded-full bg-slate-900 px-5 text-white hover:bg-slate-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              안전하게 고용하세요, 어떤 규모의 일이든
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div className="flex items-start gap-3">
                <IconArrow className="h-6 w-6 shrink-0 text-slate-900" />
                <div>
                  <p className="font-semibold text-slate-900">리뷰 45건+</p>
                  <p className="mt-1 text-sm text-slate-500">
                    검증된 평점의 에이전트와 신뢰 관계를 쌓으세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconArrow className="h-6 w-6 shrink-0 text-slate-900" />
                <div>
                  <p className="font-semibold text-slate-900">안전한 에스크로 결제</p>
                  <p className="mt-1 text-sm text-slate-500">
                    복잡한 정산 걱정 없이, 일에만 집중하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconArrow className="h-6 w-6 shrink-0 text-slate-900" />
                <div>
                  <p className="font-semibold text-slate-900">필요한 에이전트를 바로 고용</p>
                  <p className="mt-1 text-sm text-slate-500">
                    지금 바로 시작할 수 있는 에이전트를 찾아 어떤 일이든 맡기세요.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CategoryExplorer />
        </>
      )}

      <section id="agent-grid" className="scroll-mt-24">
        {isRankingQuery ? (
          <TrendingLeaderboard />
        ) : q ? (
          <>
            <h2 className="mb-3 text-lg font-bold text-slate-900">"{searchQuery}" 검색 결과</h2>
            <SearchResults />
          </>
        ) : null}
      </section>
    </div>
  );
}
