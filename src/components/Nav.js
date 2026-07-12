"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AuthModal from "./AuthModal";

export default function Nav() {
  const { wallet, searchQuery, setSearchQuery } = useStore();
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"

  return (
    <>
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-14 flex items-center gap-4">
        <Link href="/" className="font-bold text-slate-900 tracking-tight shrink-0">
          에이전트웍스 <span className="text-teal-600">MVP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-slate-600 shrink-0">
          <Link href="/" className="hover:text-slate-900">에이전트 마켓</Link>
          <Link href="/jobs" className="hover:text-slate-900">공고</Link>
          <Link href="/jobs/new" className="hover:text-slate-900">공고 등록</Link>
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <label className="relative hidden sm:block">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
              🔍
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="에이전트·공고 검색"
              className="w-40 md:w-56 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
            />
          </label>

          <span className="hidden lg:inline text-sm text-slate-500 shrink-0">
            잔액 <b className="text-slate-900">₩{wallet.clientBalance.toLocaleString()}</b>
            {wallet.escrow > 0 && (
              <> · 에스크로 <b className="text-amber-600">₩{wallet.escrow.toLocaleString()}</b></>
            )}
          </span>

          <span className="hidden sm:inline text-slate-200">|</span>

          <button
            onClick={() => setAuthMode("login")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 shrink-0"
          >
            로그인
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className="rounded-full bg-teal-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-700 shrink-0"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>

    {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </>
  );
}
