export default function Stars({ value, count }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-sm text-amber-500">
      <span aria-hidden>{"★".repeat(full)}{"☆".repeat(5 - full)}</span>
      <span className="text-slate-500">
        {value.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </span>
  );
}
