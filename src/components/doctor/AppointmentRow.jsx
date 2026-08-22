const STATUS_STYLES = {
  scheduled: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  confirmed: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  checked_in: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  checked_out: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  cancelled: "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400",
  rescheduled: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
};

const CANCELLABLE_STATUSES = ["scheduled", "confirmed", "checked_in", "rescheduled"];

export const APPOINTMENT_GRID_COLS = "grid-cols-[2.25rem_minmax(10rem,1fr)_9rem_7rem_5.5rem]";
const APPOINTMENT_GRID_COLS_NO_ACTIONS = "grid-cols-[2.25rem_minmax(10rem,1fr)_9rem_7rem]";

function AppointmentRow({ appointment, onCancel }) {
  const patient = appointment.patient;
  const canCancel = CANCELLABLE_STATUSES.includes(appointment.status);

  return (
    <div
      className={`grid ${onCancel ? APPOINTMENT_GRID_COLS : APPOINTMENT_GRID_COLS_NO_ACTIONS} items-center gap-4 border-b border-slate-100 py-4 last:border-b-0 dark:border-slate-700`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
        #{appointment.queueNumber ?? "-"}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{patient?.fullName ?? "Unknown patient"}</p>
        <p className="truncate text-xs text-slate-400">{patient?.phone || "No phone on file"}</p>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-700 dark:text-slate-200">{appointment.dateTimeLabel ?? appointment.timeLabel}</p>
        <p className="truncate text-xs text-slate-400">{appointment.visitType}</p>
      </div>

      <span
        className={`w-fit justify-self-start rounded-full px-2.5 py-1 text-xs font-semibold ${
          STATUS_STYLES[appointment.status] ?? "bg-slate-100 text-slate-500"
        }`}
      >
        {appointment.statusLabel ?? appointment.status}
      </span>

      {onCancel && (
        <button
          type="button"
          onClick={() => onCancel(appointment)}
          disabled={!canCancel}
          className="justify-self-start rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30 dark:disabled:border-slate-700 dark:disabled:text-slate-600"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default AppointmentRow;
