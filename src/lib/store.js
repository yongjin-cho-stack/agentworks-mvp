"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  initialAgents,
  initialJobs,
  initialWallet,
  BADGES,
  nextId,
} from "./mockData";

const StoreContext = createContext(null);

const APPLY_MESSAGES = [
  "포트폴리오 확인 부탁드립니다. 브랜드 톤에 맞춰 빠르게 작업 가능합니다.",
  "유사 카테고리 작업 경험 다수 있습니다. 초안 24시간 내 전달 가능해요.",
  "요구사항 검토했습니다. 예산 내에서 퀄리티 최대한 맞춰보겠습니다.",
  "이전 작업 평점 참고 부탁드리고, 일정 여유 있어 바로 시작 가능합니다.",
];

function computeBadge(agent) {
  if (agent.completedJobs >= 15 && agent.jss >= 90) return BADGES.TOP_RATED_PLUS.key;
  if (agent.completedJobs >= 5 && agent.jss >= 90) return BADGES.TOP_RATED.key;
  return BADGES.RISING.key;
}

export function mockDeliverable(job, agent) {
  const cards = Math.max(3, Math.min(10, Math.round(job.budget / 20000)));
  return {
    type: agent.category,
    summary: `${agent.name}가 "${job.title}" 납품물을 생성했습니다.`,
    items: Array.from({ length: cards }).map((_, i) => ({
      index: i + 1,
      emoji: agent.emoji,
      caption: `${job.category} 시안 ${i + 1} — ${job.clientName} 브랜드 톤 반영`,
    })),
  };
}

export function StoreProvider({ children }) {
  const [agents, setAgents] = useState(initialAgents);
  const [jobs, setJobs] = useState(initialJobs);
  const [contracts, setContracts] = useState([]);
  const [wallet, setWallet] = useState(initialWallet);
  const [log, setLog] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null); // null | "participant" | "client"
  const [myAgentId, setMyAgentId] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastTrainedDate, setLastTrainedDate] = useState(null);

  function pushLog(message) {
    setLog((prev) => [{ id: nextId("log"), message, at: new Date() }, ...prev].slice(0, 30));
  }

  function postJob({ title, category, description, budget, clientName }) {
    const job = {
      id: nextId("job"),
      title,
      category,
      description,
      budget: Number(budget),
      clientName: clientName || "내 브랜드",
      status: "open",
      proposals: [],
      contractId: null,
    };
    setJobs((prev) => [job, ...prev]);
    pushLog(`공고 등록: "${title}"`);
    return job.id;
  }

  function simulateApplications(jobId) {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const pool = agents.filter((a) => a.category === job.category);
        const candidates = (pool.length ? pool : agents).slice(0, 3);
        const newProposals = candidates.map((agent, i) => ({
          id: nextId("prop"),
          agentId: agent.id,
          price: Math.max(
            10000,
            Math.round((job.budget * (0.85 + i * 0.1)) / 1000) * 1000
          ),
          message: APPLY_MESSAGES[(i + candidates.length) % APPLY_MESSAGES.length],
          connectsUsed: agent.connectsCost,
          status: "pending",
        }));
        pushLog(`"${job.title}"에 에이전트 ${newProposals.length}곳 지원`);
        return { ...job, proposals: [...job.proposals, ...newProposals] };
      })
    );
  }

  function submitApplication(jobId, agentId, { price, note }) {
    const job = jobs.find((j) => j.id === jobId);
    const agent = agents.find((a) => a.id === agentId);
    if (!job || !agent) return null;
    const proposalId = nextId("prop");
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              proposals: [
                ...j.proposals,
                {
                  id: proposalId,
                  agentId,
                  price,
                  message: note || "제 에이전트로 직접 지원합니다.",
                  connectsUsed: agent.connectsCost,
                  status: "pending",
                  isMine: true,
                },
              ],
            }
          : j
      )
    );
    pushLog(`"${job.title}"에 ${agent.name}(내 에이전트)로 지원`);
    return proposalId;
  }

  function trainAgent(xpGain) {
    const todayStr = new Date().toDateString();
    setLastTrainedDate((prevDate) => {
      setStreak((prevStreak) => {
        if (prevDate === todayStr) return prevStreak || 1;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (prevDate === yesterday.toDateString()) return prevStreak + 1;
        return 1;
      });
      return todayStr;
    });
    setXp((prev) => prev + xpGain);
    pushLog(`내 에이전트 훈련 완료 · +${xpGain} XP`);
  }

  function hireAgent(jobId, proposalId) {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return null;
    const proposal = job.proposals.find((p) => p.id === proposalId);
    if (!proposal) return null;
    const agent = agents.find((a) => a.id === proposal.agentId);

    const contract = {
      id: nextId("contract"),
      jobId,
      agentId: agent.id,
      price: proposal.price,
      status: "active", // active -> submitted -> released
      createdAt: new Date(),
      submittedAt: null,
      deliverable: null,
      review: null,
    };

    setContracts((prev) => [...prev, contract]);
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: "in_progress",
              contractId: contract.id,
              proposals: j.proposals.map((p) =>
                p.id === proposalId
                  ? { ...p, status: "hired" }
                  : { ...p, status: "rejected" }
              ),
            }
          : j
      )
    );
    setWallet((w) => ({
      clientBalance: w.clientBalance - proposal.price,
      escrow: w.escrow + proposal.price,
    }));
    pushLog(`"${job.title}" — ${agent.name} 고용, ₩${proposal.price.toLocaleString()} 에스크로 예치`);
    return contract.id;
  }

  function submitWork(contractId) {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const job = jobs.find((j) => j.id === c.jobId);
        const agent = agents.find((a) => a.id === c.agentId);
        const submittedAt = new Date();
        const autoReleaseAt = new Date(submittedAt.getTime() + 14 * 24 * 3600 * 1000);
        pushLog(`"${job.title}" 납품물 제출됨 — ${agent.name}`);
        return {
          ...c,
          status: "submitted",
          submittedAt,
          autoReleaseAt,
          deliverable: mockDeliverable(job, agent),
        };
      })
    );
    setJobs((prev) =>
      prev.map((j) => (j.contractId === contractId ? { ...j, status: "submitted" } : j))
    );
  }

  function releasePayment(contractId, { rating, comment }) {
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) return;
    const job = jobs.find((j) => j.id === contract.jobId);

    setAgents((prev) =>
      prev.map((a) => {
        if (a.id !== contract.agentId) return a;
        const newCompleted = a.completedJobs + 1;
        const newReviewCount = a.reviewCount + 1;
        const newRating =
          Math.round(((a.rating * a.reviewCount + rating) / newReviewCount) * 10) / 10;
        const success = rating >= 4 ? 100 : rating >= 3 ? 70 : 30;
        const newJss = Math.round((a.jss * a.reviewCount + success) / newReviewCount);
        const updated = {
          ...a,
          completedJobs: newCompleted,
          reviewCount: newReviewCount,
          rating: newRating,
          jss: newJss,
          reviews: [{ rating, comment, author: job.clientName }, ...a.reviews],
        };
        updated.badge = computeBadge(updated);
        return updated;
      })
    );

    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId ? { ...c, status: "released", review: { rating, comment } } : c
      )
    );
    setJobs((prev) =>
      prev.map((j) => (j.contractId === contractId ? { ...j, status: "completed" } : j))
    );
    setWallet((w) => ({ ...w, escrow: w.escrow - contract.price }));
    pushLog(`"${job.title}" 정산 완료 · 평점 ${rating}점 등록`);
  }

  const value = useMemo(
    () => ({
      agents,
      jobs,
      contracts,
      wallet,
      log,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      userRole,
      setUserRole,
      myAgentId,
      setMyAgentId,
      xp,
      streak,
      lastTrainedDate,
      postJob,
      simulateApplications,
      submitApplication,
      hireAgent,
      submitWork,
      releasePayment,
      trainAgent,
    }),
    [
      agents,
      jobs,
      contracts,
      wallet,
      log,
      selectedCategory,
      searchQuery,
      userRole,
      myAgentId,
      xp,
      streak,
      lastTrainedDate,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
