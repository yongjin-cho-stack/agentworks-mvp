"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mockData";

const TABS = ["최상위 선택 항목", ...CATEGORIES];

export default function TrendingLeaderboard() {
  const { agents } = useStore();
  const [tab, setTab] = useState("최상위 선택 항목");
  const [query, setQuery] = useState("");

  const ranked = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents
      .filter((a) => tab === "최상위 선택 항목" || a.category === tab)
      .filter(
        (a) =>
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
      .slice()
      .sort((a, b) => b.completedJobs - a.completedJobs);
  }, [agents, tab, query]);

  return (
    <section className="border-t border-slate-200 pt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">🔥 인기 에이전트 랭킹</h2>

      <div className="relative mt-5">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="에이전트 검색"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
        />
      </div>

      <div className="mt-5 flex items-center gap-6 overflow-x-auto border-b border-slate-200 text-sm">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 whitespace-nowrap border-b-2 py-2.5 font-medium transition ${
              tab === t
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {ranked.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">해당하는 에이전트가 없습니다.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {ranked.map((agent, i) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="flex items-start gap-4 rounded-lg p-2 -m-2 hover:bg-slate-50"
            >
              <span className="w-5 shrink-0 pt-1 text-base font-semibold text-slate-400">
                {i + 1}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xl ring-1 ring-slate-200 grayscale">
                {agent.emoji}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-slate-900">
                  {agent.name.split(" · ")[0]}
                </span>
                <span className="mt-0.5 block text-sm text-slate-500 line-clamp-2">
                  {agent.tagline}
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  완료 {agent.completedJobs}건 · JSS {agent.jss}%
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
