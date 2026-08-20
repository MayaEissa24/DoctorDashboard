const STATUS_STYLES = {
  scheduled: "bg-slate-100 text-slate-600",
  confirmed: "bg-blue-50 text-blue-600",
  checked_in: "bg-amber-50 text-amber-600",
  checked_out: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-500",
  rescheduled: "bg-purple-50 text-purple-600",
};

const CANCELLABLE_STATUSES = ["scheduled", "confirmed", "checked_in", "rescheduled"];

function AppointmentRow({ appointment, onCancel }) {
  const patient = appointment.patient;
  const canCancel = CANCELLABLE_STATUSES.includes(appointment.status);

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
        #{appointment.queueNumber ?? "-"}
      </span>

      <div className="min-w-[10rem] flex-1">
        <p className="text-sm font-semibold text-slate-800">{patient?.fullName ?? "Unknown patient"}</p>
        <p className="text-xs text-slate-400">{patient?.phone || "No phone on file"}</p>
      </div>

      <div className="min-w-[9rem]">
        <p className="text-sm text-slate-700">{appointment.dateTimeLabel ?? appointment.timeLabel}</p>
        <p className="text-xs text-slate-400">{appointment.visitType}</p>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
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
          className="ml-auto rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default AppointmentRow;
