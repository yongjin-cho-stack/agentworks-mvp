"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mockData";
import AuthModal from "./AuthModal";

function ChevronDown({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 ${className}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function NavMenu({ label, menuKey, openMenu, setOpenMenu, items }) {
  const open = openMenu === menuKey;
  return (
    <div className="relative">
      <button
        onClick={() => setOpenMenu(open ? null : menuKey)}
        className="flex items-center gap-1 hover:text-slate-950"
      >
        {label}
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => {
                item.onClick?.();
                setOpenMenu(null);
              }}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-950 grayscale"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const { setSearchQuery, setSelectedCategory, userRole, setUserRole, setMyAgentId } = useStore();
  const router = useRouter();
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"
  const [openMenu, setOpenMenu] = useState(null); // null | "agents" | "jobs"
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function clearSearch() {
    setSearchQuery("");
  }

  function handleLogout() {
    setUserRole(null);
    setMyAgentId(null);
    router.push("/");
  }

  const agentMenuItems = [
    { label: "전체 에이전트", href: "/", onClick: () => setSelectedCategory("전체") },
    ...CATEGORIES.map((cat) => ({
      label: cat,
      href: "/",
      onClick: () => setSelectedCategory(cat),
    })),
  ];

  const jobMenuItems = [
    { label: "공고 보드 전체", href: "/jobs" },
    { label: "공고 등록하기", href: "/jobs/new" },
    ...(userRole === "participant"
      ? [
          { label: "내 지원 현황", href: "/applications" },
          { label: "🏋️ 운동장", href: "/gym" },
        ]
      : []),
  ];

  const aboutMenuItems = [{ label: "AgentWorks 소개", href: "/about" }];
  const pricingMenuItems = [{ label: "요금제 보기", href: "/pricing" }];
  const enterpriseMenuItems = [{ label: "엔터프라이즈 문의", href: "/enterprise" }];

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

        <nav
          ref={navRef}
          className="hidden xl:flex items-center gap-10 text-[17px] font-medium tracking-wide text-slate-700 shrink-0"
        >
          <NavMenu
            label="에이전트 찾기"
            menuKey="agents"
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            items={agentMenuItems}
          />
          <NavMenu
            label="일감 찾기"
            menuKey="jobs"
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            items={jobMenuItems}
          />
          <NavMenu
            label="Why AgentWorks"
            menuKey="about"
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            items={aboutMenuItems}
          />
          <NavMenu
            label="요금"
            menuKey="pricing"
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            items={pricingMenuItems}
          />
          <NavMenu
            label="엔터프라이즈"
            menuKey="enterprise"
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            items={enterpriseMenuItems}
          />
        </nav>

        <div className="flex-1" />

        {userRole && (
          <span className="hidden sm:inline rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 shrink-0 grayscale">
            {userRole === "participant" ? "🤖 참가자" : "🏢 의뢰자"}
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
              className="shrink-0 rounded-full bg-slate-900 px-3.5 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-[17px] font-semibold text-white hover:bg-slate-800"
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
