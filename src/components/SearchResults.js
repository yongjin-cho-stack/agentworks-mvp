"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { CATEGORIES, BADGES } from "@/lib/mockData";
import BadgePill from "./BadgePill";
import Stars from "./Stars";

const BADGE_OPTIONS = [BADGES.TOP_RATED_PLUS, BADGES.TOP_RATED, BADGES.RISING];

const PRICE_BUCKETS = [
  { key: "low", label: "10만원 이하", test: (p) => p <= 100000 },
  { key: "mid", label: "10~20만원", test: (p) => p > 100000 && p <= 200000 },
  { key: "high", label: "20만원 이상", test: (p) => p > 200000 },
];

const SORTS = [
  { key: "relevance", label: "관련도순" },
  { key: "rating", label: "평점 높은순" },
  { key: "priceAsc", label: "가격 낮은순" },
  { key: "completed", label: "완료건수 많은순" },
];

export default function SearchResults() {
  const { agents, searchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [badgeFilter, setBadgeFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [favorites, setFavorites] = useState([]);

  const q = searchQuery.trim().toLowerCase();

  function toggleBadge(key) {
    setBadgeFilter((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function togglePrice(key) {
    setPriceFilter((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  const results = useMemo(() => {
    let list = agents.filter((a) => {
      const matchesCategory = selectedCategory === "전체" || a.category === selectedCategory;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      const matchesBadge = badgeFilter.length === 0 || badgeFilter.includes(a.badge);
      const matchesPrice =
        priceFilter.length === 0 ||
        priceFilter.some((key) => PRICE_BUCKETS.find((b) => b.key === key).test(a.packages[0].price));
      return matchesCategory && matchesQuery && matchesBadge && matchesPrice;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "priceAsc") return a.packages[0].price - b.packages[0].price;
      if (sortBy === "completed") return b.completedJobs - a.completedJobs;
      return 0; // relevance: keep filter order
    });

    return list;
  }, [agents, q, selectedCategory, badgeFilter, priceFilter, sortBy]);

  return (
    <div className="space-y-5">
      {/* 검색 범위 좁히기 */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-600">검색 범위 좁히기</p>
        <div className="flex flex-wrap gap-2">
          {["전체", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                selectedCategory === cat
                  ? "border-teal-600 bg-teal-50 text-teal-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* 사이드바 필터 */}
        <aside className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">등급</p>
            <div className="space-y-2">
              {BADGE_OPTIONS.map((b) => (
                <label key={b.key} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={badgeFilter.includes(b.key)}
                    onChange={() => toggleBadge(b.key)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className={`inline-block h-2 w-2 rounded-full ${b.color.split(" ")[0]}`} />
                  {b.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">시작 가격</p>
            <div className="space-y-2">
              {PRICE_BUCKETS.map((b) => (
                <label key={b.key} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={priceFilter.includes(b.key)}
                    onChange={() => togglePrice(b.key)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  {b.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* 결과 리스트 */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">{results.length}명의 에이전트</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {results.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">조건에 맞는 에이전트가 없습니다.</p>
          )}

          <div className="space-y-3">
            {results.map((agent) => (
              <div
                key={agent.id}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl ring-1 ring-slate-200">
                      {agent.emoji}
                    </div>
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/agents/${agent.id}`} className="font-semibold text-slate-900 hover:text-teal-700">
                        {agent.name}
                      </Link>
                      <BadgePill badgeKey={agent.badge} />
                    </div>
                    <p className="text-sm text-slate-500">{agent.tagline}</p>
                    <p className="text-xs text-slate-400">{agent.category}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        ₩{agent.packages[0].price.toLocaleString()}~
                      </span>
                      <span className="inline-flex items-center gap-1">
                        👑 JSS {agent.jss}%
                      </span>
                      <Stars value={agent.rating} count={agent.reviewCount} />
                      <span>완료 {agent.completedJobs}건</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {agent.packages.map((pkg) => (
                        <span
                          key={pkg.tier}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {pkg.title} · ₩{pkg.price.toLocaleString()}
                        </span>
                      ))}
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      {agent.name.split(" · ")[0]}는{" "}
                      <span className="font-medium text-teal-700">
                        이 검색과 관련된 작업을 {agent.completedJobs}건
                      </span>{" "}
                      완료했습니다.
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <button
                      onClick={() => toggleFavorite(agent.id)}
                      aria-label="즐겨찾기"
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg ${
                        favorites.includes(agent.id)
                          ? "border-teal-600 text-teal-600"
                          : "border-slate-200 text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {favorites.includes(agent.id) ? "♥" : "♡"}
                    </button>
                    <Link
                      href={`/agents/${agent.id}`}
                      className="whitespace-nowrap rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                    >
                      프로필 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
