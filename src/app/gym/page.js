"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const MENU = [
  {
    key: "basic",
    emoji: "🏋️",
    title: "기초 체력 훈련",
    desc: "톤앤매너 반복 학습으로 기본기를 다집니다.",
    level: "초급",
    duration: "5분",
    xp: 10,
  },
  {
    key: "sparring",
    emoji: "🥊",
    title: "스파링 — 실전 시뮬레이션",
    desc: "실제 공고와 비슷한 상황에서 대응 훈련을 합니다.",
    level: "중급",
    duration: "10분",
    xp: 20,
  },
  {
    key: "speedrun",
    emoji: "⚡",
    title: "스피드런",
    desc: "제한 시간 안에 초안을 빠르게 생성하는 훈련입니다.",
    level: "중급",
    duration: "8분",
    xp: 15,
  },
  {
    key: "recovery",
    emoji: "🧘",
    title: "회복 세션",
    desc: "이전 피드백을 복기하며 약점을 보완합니다.",
    level: "초급",
    duration: "5분",
    xp: 10,
  },
];

const LEVEL_SIZE = 100;

export default function GymPage() {
  const { agents, myAgentId, xp, streak, trainAgent, userRole } = useStore();
  const myAgent = agents.find((a) => a.id === myAgentId) || agents[0];
  const [training, setTraining] = useState(null); // key of item currently training
  const [justDone, setJustDone] = useState(null); // {key, xp}

  const level = Math.floor(xp / LEVEL_SIZE) + 1;
  const xpIntoLevel = xp % LEVEL_SIZE;

  if (userRole !== "participant") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div className="text-3xl">🔒</div>
        <h1 className="mt-3 text-lg font-bold text-slate-900">로그인 후 이용할 수 있습니다</h1>
        <p className="mt-2 text-sm text-slate-500">
          {userRole === "client"
            ? "운동장은 참가자 계정으로 로그인해야 접근할 수 있습니다."
            : "운동장은 참가자로 로그인·회원가입한 뒤 내 에이전트를 훈련할 수 있는 공간입니다."}
        </p>
        <p className="mt-4 text-xs text-slate-400">우측 상단의 로그인 / 회원가입 버튼을 이용해주세요.</p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  function runTraining(item) {
    setTraining(item.key);
    setJustDone(null);
    setTimeout(() => {
      trainAgent(item.xp);
      setTraining(null);
      setJustDone({ key: item.key, xp: item.xp });
    }, 900);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
          <span className="grayscale">🏋️</span> 운동장 · Training Ground
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
          {myAgent.name.split(" · ")[0]}의 훈련장
        </h1>
        <p className="mt-2 text-slate-500">매일 훈련하면 에이전트가 성장합니다. 오늘도 한 세트 어떠세요?</p>
      </div>

      {/* 회원 카드 (Lv/XP/스트릭) */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl ring-2 ring-amber-400 grayscale">
            {myAgent.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">{myAgent.name.split(" · ")[0]}</span>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-bold text-amber-300">
                Lv.{level}
              </span>
            </div>
            <div className="mt-2 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${xpIntoLevel}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-300">
              {xpIntoLevel} / {LEVEL_SIZE} XP · 다음 레벨까지 {LEVEL_SIZE - xpIntoLevel} XP
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl">🔥</div>
            <div className="text-sm font-bold">{streak}일 연속</div>
          </div>
        </div>
      </div>

      {/* 오늘의 트레이닝 메뉴 */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">오늘의 트레이닝 메뉴</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENU.map((item) => (
            <div key={item.key} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="text-2xl grayscale">{item.emoji}</div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {item.level}
                </span>
              </div>
              <h3 className="mt-2 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                <span>⏱ {item.duration}</span>
                <span>✨ +{item.xp} XP</span>
              </div>

              {justDone?.key === item.key ? (
                <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  완료! +{justDone.xp} XP 획득 🎉
                </div>
              ) : (
                <button
                  onClick={() => runTraining(item)}
                  disabled={training === item.key}
                  className="mt-3 w-full rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
                >
                  {training === item.key ? "훈련 중…" : "시작하기 ▶"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
        여기서 훈련한 결과는 에이전트의 실제 작업 능력(별도 팀이 만드는 학습 엔진)과 연결될 예정입니다.
        지금은 레벨·XP·스트릭만 데모로 보여줍니다.
      </div>

      <Link href="/applications" className="text-sm font-medium text-teal-700 hover:text-teal-800">
        ← 내 지원 현황으로 돌아가기
      </Link>
    </div>
  );
}
