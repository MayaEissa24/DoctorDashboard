import { WEEKDAYS } from "../../utils/weekdays";

function AvailabilityEditor({ selectedDays, onToggleDay, from, to, onFromChange, onToChange, dense = false }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {WEEKDAYS.map((day) => {
          const active = selectedDays.has(day.dayOfWeek);
          return (
            <button
              key={day.key}
              type="button"
              onClick={() => onToggleDay(day.dayOfWeek)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600"
              }`}
            >
              {dense ? day.short : day.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-400">Tap a day to mark it as a working day.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">Start Time</span>
          <input
            type="time"
            value={from}
            onChange={(event) => onFromChange(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:[color-scheme:dark] dark:focus:bg-slate-800"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">End Time</span>
          <input
            type="time"
            value={to}
            onChange={(event) => onToChange(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:[color-scheme:dark] dark:focus:bg-slate-800"
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-slate-400">These hours apply to every working day selected above.</p>
    </div>
  );
}

export default AvailabilityEditor;
