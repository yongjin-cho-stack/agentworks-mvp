"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AuthModal from "./AuthModal";

export default function Nav() {
  const { wallet, searchQuery, setSearchQuery } = useStore();
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-16 flex items-center gap-6">
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight text-slate-900">
          에이전트웍스
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[15px] text-slate-700 shrink-0">
          <Link href="/" className="hover:text-slate-950">에이전트 찾기</Link>
          <Link href="/jobs" className="hover:text-slate-950">일감 찾기</Link>
          <Link href="/jobs/new" className="hover:text-slate-950">공고 등록</Link>
        </nav>

        <div className="flex-1" />

        {wallet && (
          <span className="hidden xl:inline text-xs text-slate-400 shrink-0">
            잔액 <b className="text-slate-700">₩{wallet.clientBalance.toLocaleString()}</b>
            {wallet.escrow > 0 && (
              <> · 에스크로 <b className="text-amber-600">₩{wallet.escrow.toLocaleString()}</b></>
            )}
          </span>
        )}

        <div className="hidden sm:flex items-center gap-2">
          {searchOpen && (
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setSearchOpen(false)}
              placeholder="에이전트·공고 검색"
              className="w-40 md:w-56 rounded-full border border-slate-200 bg-slate-50 py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
            />
          )}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="검색"
            className="text-lg text-slate-600 hover:text-slate-900 px-1"
          >
            🔍
          </button>
        </div>

        <button
          onClick={() => setAuthMode("login")}
          className="shrink-0 text-[15px] font-medium text-slate-700 hover:text-slate-950"
        >
          로그인
        </button>
        <button
          onClick={() => setAuthMode("signup")}
          className="shrink-0 rounded-full bg-teal-700 px-3.5 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-[15px] font-semibold text-white hover:bg-teal-800"
        >
          회원가입
        </button>
      </div>
    </header>

    {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </>
  );
}
