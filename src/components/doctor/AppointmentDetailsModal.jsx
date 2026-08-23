function AppointmentDetailsModal({ appointment, onClose }) {
  if (!appointment) return null;
  const patient = appointment.patient;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Appointment Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-slate-400">Patient</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{patient?.fullName ?? "Unknown patient"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Phone</p>
            <p className="text-slate-700 dark:text-slate-300">{patient?.phone || "No phone on file"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Date & Time</p>
            <p className="text-slate-700 dark:text-slate-300">{appointment.dateTimeLabel ?? appointment.timeLabel}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Visit Type</p>
            <p className="text-slate-700 dark:text-slate-300">{appointment.visitType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Status</p>
            <p className="text-slate-700 dark:text-slate-300">{appointment.statusLabel ?? appointment.status}</p>
          </div>
          {appointment.notes && (
            <div>
              <p className="text-xs text-slate-400">Notes</p>
              <p className="text-slate-700 dark:text-slate-300">{appointment.notes}</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AppointmentDetailsModal;
