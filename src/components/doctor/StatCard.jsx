function StatCard({ label, value, icon, subtext, compact = false }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-slate-200 bg-white shadow-sm ${
        compact ? "p-4" : "p-5"
      }`}
    >
      {icon && (
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ${
            compact ? "h-9 w-9" : "h-11 w-11"
          }`}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className={`font-bold text-slate-900 ${compact ? "text-lg" : "text-2xl"}`}>{value}</p>
        {subtext && <p className="mt-0.5 text-xs text-slate-400">{subtext}</p>}
      </div>
    </div>
  );
}

export default StatCard;
