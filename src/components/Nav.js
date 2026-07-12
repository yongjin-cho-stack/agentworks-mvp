"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Nav() {
  const { wallet } = useStore();
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900 tracking-tight">
          에이전트웍스 <span className="text-teal-600">MVP</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">에이전트 마켓</Link>
          <Link href="/jobs" className="hover:text-slate-900">공고</Link>
          <Link href="/jobs/new" className="hover:text-slate-900">공고 등록</Link>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-500">
            잔액 <b className="text-slate-900">₩{wallet.clientBalance.toLocaleString()}</b>
            {wallet.escrow > 0 && (
              <> · 에스크로 <b className="text-amber-600">₩{wallet.escrow.toLocaleString()}</b></>
            )}
          </span>
        </nav>
      </div>
    </header>
  );
}
