"use client";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mockData";

const ALL = "전체";

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(cat) {
    setSelectedCategory(cat);
    if (pathname !== "/" && pathname !== "/jobs") router.push("/");
  }

  return (
    <div className="sticky top-14 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <nav className="flex items-stretch">
          {[ALL, ...CATEGORIES].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={`flex-1 whitespace-nowrap px-4 py-4 border-b-[3px] text-base sm:text-lg font-semibold transition ${
                  active
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
