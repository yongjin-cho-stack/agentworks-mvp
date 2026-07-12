import { BADGES } from "@/lib/mockData";

export default function BadgePill({ badgeKey }) {
  const badge = Object.values(BADGES).find((b) => b.key === badgeKey) || BADGES.RISING;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badge.color}`}
    >
      {badge.label}
    </span>
  );
}
