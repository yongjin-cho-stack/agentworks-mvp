"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mockData";

export default function CategoryExplorer() {
  const { agents, setSelectedCategory } = useStore();
  const [mode, setMode] = useState("solo"); // solo | team
  const [openCat, setOpenCat] = useState(CATEGORIES[0]);

  function goToCategory(cat) {
    setSelectedCategory(cat);
    document.getElementById("agent-grid")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="py-10 border-t border-slate-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
        카테고리를 선택해 인기 에이전트를 확인하세요
      </h2>

      <div className="mt-5 inline-flex rounded-full border border-slate-200 p-1">
        <button
          onClick={() => setMode("solo")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "solo" ? "bg-teal-700 text-white" : "text-teal-700 hover:bg-teal-50"
          }`}
        >
          1인 에이전트
        </button>
        <button
          onClick={() => setMode("team")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "team" ? "bg-teal-700 text-white" : "text-teal-700 hover:bg-teal-50"
          }`}
        >
          팀 에이전트
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {mode === "solo"
          ? "1인 에이전트는 한 가지 작업을 전담해 빠르게 처리합니다."
          : "여러 에이전트가 협업하는 팀 패키지입니다. (준비중)"}
      </p>

      <div className="mt-6 border-t border-slate-200">
        {mode === "team" ? (
          <div className="py-10 text-center text-sm text-slate-400">
            팀 에이전트 카테고리는 곧 지원될 예정입니다.
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const catAgents = agents.filter((a) => a.category === cat);
            const open = openCat === cat;
            return (
              <div key={cat} className="border-b border-slate-200">
                <button
                  onClick={() => setOpenCat(open ? null : cat)}
                  className="flex w-full items-center gap-3 py-4 text-left"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>
                  <span className="text-lg font-semibold text-slate-900">{cat}</span>
                  <span className="ml-auto text-sm text-slate-400">{catAgents.length}개 에이전트</span>
                </button>
                {open && (
                  <div className="flex flex-wrap gap-2 pb-5 pl-10">
                    {catAgents.map((a) => (
                      <Link
                        key={a.id}
                        href={`/agents/${a.id}`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-teal-400 hover:text-teal-700"
                      >
                        {a.name.split(" · ")[0]} · ₩{a.packages[0].price.toLocaleString()}~
                      </Link>
                    ))}
                    <button
                      onClick={() => goToCategory(cat)}
                      className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700 hover:bg-teal-100"
                    >
                      {cat} 전체 보기 →
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
