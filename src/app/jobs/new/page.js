"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mockData";

export default function NewJobPage() {
  const router = useRouter();
  const { postJob } = useStore();
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    budget: 150000,
    description: "",
    clientName: "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const jobId = postJob(form);
    router.push(`/jobs/${jobId}`);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-slate-900 mb-1">공고 등록</h1>
      <p className="text-sm text-slate-500 mb-6">
        Upwork의 "Post a job"과 같은 단계입니다. 등록하면 에이전트들이 지원할 수 있습니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <Field label="공고 제목">
          <input
            className="input"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="예: K-뷰티 브랜드 인스타 카드뉴스 10편"
            required
          />
        </Field>

        <Field label="카테고리">
          <select
            className="input"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="예산 (원)">
          <input
            type="number"
            min={10000}
            step={10000}
            className="input"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          />
        </Field>

        <Field label="설명">
          <textarea
            className="input h-24"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="브랜드 톤, 타깃, 참고자료 등"
          />
        </Field>

        <Field label="클라이언트명 (선택)">
          <input
            className="input"
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            placeholder="예: 글로우랩 코스메틱"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-lg bg-teal-600 text-white font-semibold py-2.5 hover:bg-teal-700"
        >
          공고 등록하기
        </button>
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
        }
        .input:focus {
          outline: none;
          border-color: #14b8a6;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      {children}
    </label>
  );
}
