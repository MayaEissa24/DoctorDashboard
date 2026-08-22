function CancelAppointmentModal({ appointment, isSubmitting, error, onConfirm, onClose }) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-200">Cancel appointment?</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This will cancel the appointment with{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{appointment.patient?.fullName ?? "this patient"}</span> on{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {appointment.dateTimeLabel ?? appointment.timeLabel}
          </span>
          . This action cannot be undone.
        </p>

        {error && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">{error}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Keep Appointment
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Cancelling..." : "Yes, Cancel It"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelAppointmentModal;
