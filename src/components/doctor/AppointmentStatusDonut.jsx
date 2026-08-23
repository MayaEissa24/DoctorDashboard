import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const SEGMENTS = [
  { key: "confirmed", label: "Confirmed", color: "#3b82f6" },
  { key: "checkedIn", label: "Checked In", color: "#f59e0b" },
  { key: "completed", label: "Completed", color: "#10b981" },
  { key: "pending", label: "Pending", color: "#94a3b8" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
];

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <p className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        <span className="h-2 w-2 rounded-full" style={{ background: entry.payload.color }} />
        {entry.name}: {entry.value}
      </p>
    </div>
  );
}

function AppointmentStatusDonut({ confirmed = 0, checkedIn = 0, completed = 0, pending = 0, cancelled = 0 }) {
  const counts = { confirmed, checkedIn, completed, pending, cancelled };
  const data = SEGMENTS.map((segment) => ({ ...segment, name: segment.label, value: counts[segment.key] }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 text-[15px] font-bold text-slate-900 dark:text-slate-200">Today's Status Breakdown</h2>

      {total === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-10 text-center text-sm text-slate-400 dark:bg-slate-900/50">
          No appointments scheduled for today.
        </p>
      ) : (
        <>
          <div className="relative h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} className={entry.value === 0 ? "opacity-20" : undefined} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total}</span>
              <span className="text-xs text-slate-400">Total Today</span>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-2">
            {data
              .filter((item) => item.value > 0)
              .map((item) => (
                <li key={item.key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                  {item.label}
                  <span className="ml-auto font-semibold text-slate-700 dark:text-slate-200">{item.value}</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default AppointmentStatusDonut;
