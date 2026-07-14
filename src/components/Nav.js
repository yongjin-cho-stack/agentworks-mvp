"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import AuthModal from "./AuthModal";

export default function Nav() {
  const { wallet, setSearchQuery, userRole, setUserRole, setMyAgentId } = useStore();
  const router = useRouter();
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"

  function clearSearch() {
    setSearchQuery("");
  }

  function handleLogout() {
    setUserRole(null);
    setMyAgentId(null);
    router.push("/");
  }

  return (
    <>
    <header className="sticky top-0 z-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-16 flex items-center gap-6">
        <Link
          href="/"
          onClick={clearSearch}
          className="shrink-0 text-2xl font-bold tracking-tight text-slate-900"
        >
          AgentWorks
        </Link>

        <nav className="hidden xl:flex items-center gap-5 text-[17px] font-medium text-slate-700 shrink-0">
          <Link href="/" onClick={clearSearch} className="hover:text-slate-950">에이전트 찾기</Link>
          <Link href="/jobs" className="hover:text-slate-950">일감 찾기</Link>
          <Link href="/jobs/new" className="hover:text-slate-950">공고 등록</Link>
          {userRole === "participant" && (
            <>
              <Link href="/applications" className="hover:text-slate-950">내 지원 현황</Link>
              <Link href="/gym" className="hover:text-slate-950">🏋️ 운동장</Link>
            </>
          )}
          <Link href="/about" className="hover:text-slate-950">Why AgentWorks</Link>
          <Link href="/pricing" className="hover:text-slate-950">요금</Link>
          <Link href="/enterprise" className="hover:text-slate-950">엔터프라이즈</Link>
        </nav>

        <div className="flex-1" />

        {userRole && (
          <span className="hidden sm:inline rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 shrink-0">
            {userRole === "participant" ? "🤖 참가자" : "🏢 의뢰자"}
          </span>
        )}

        {wallet && (
          <span className="hidden xl:inline text-xs text-slate-400 shrink-0">
            잔액 <b className="text-slate-700">₩{wallet.clientBalance.toLocaleString()}</b>
            {wallet.escrow > 0 && (
              <> · 에스크로 <b className="text-amber-600">₩{wallet.escrow.toLocaleString()}</b></>
            )}
          </span>
        )}

        {userRole ? (
          <button
            onClick={handleLogout}
            className="shrink-0 text-[17px] font-medium text-slate-700 hover:text-slate-950"
          >
            로그아웃
          </button>
        ) : (
          <>
            <button
              onClick={() => setAuthMode("login")}
              className="shrink-0 text-[17px] font-medium text-slate-700 hover:text-slate-950"
            >
              로그인
            </button>
            <button
              onClick={() => setAuthMode("signup")}
              className="shrink-0 rounded-full bg-teal-700 px-3.5 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-[17px] font-semibold text-white hover:bg-teal-800"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>

    {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </>
  );
}
