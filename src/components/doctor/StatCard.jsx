import { Bar, BarChart, ResponsiveContainer } from "recharts";

function TrendBadge({ trend }) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
        isPositive
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          : isNegative
            ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
            : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
      }`}
    >
      {isPositive ? "+" : ""}
      {trend}%
    </span>
  );
}

function Sparkline({ data }) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="h-8 w-16 shrink-0 text-blue-500 dark:text-blue-400">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <Bar dataKey="value" fill="currentColor" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ label, value, icon, subtext, trend, trendLabel, sparklineData, compact = false }) {
  const hasTrend = typeof trend === "number";
  const hasSparkline = Array.isArray(sparklineData) && sparklineData.length > 0;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      {icon && (
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 ${
            compact ? "h-9 w-9" : "h-11 w-11"
          }`}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <div className="flex items-center gap-2">
          <p className={`font-bold text-slate-900 dark:text-slate-200 ${compact ? "text-lg" : "text-2xl"}`}>{value}</p>
          {hasTrend && <TrendBadge trend={trend} />}
        </div>
        {(trendLabel || subtext) && <p className="mt-0.5 text-xs text-slate-400">{trendLabel ?? subtext}</p>}
      </div>
      {hasSparkline && <Sparkline data={sparklineData} />}
    </div>
  );
}

export default StatCard;
