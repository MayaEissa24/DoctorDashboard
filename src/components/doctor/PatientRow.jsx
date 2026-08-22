function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "?";
}

export const PATIENT_GRID_COLS = "grid-cols-[2.5rem_minmax(10rem,1fr)_9rem_9rem]";

function PatientRow({ patient }) {
  return (
    <div className={`grid ${PATIENT_GRID_COLS} items-center gap-4 border-b border-slate-100 py-4 last:border-b-0 dark:border-slate-700`}>
      {patient.photoUrl ? (
        <img src={patient.photoUrl} alt={patient.fullName} className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {getInitials(patient.fullName)}
        </span>
      )}

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{patient.fullName}</p>
        <p className="truncate text-xs text-slate-400">{patient.email || "No email on file"}</p>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-700 dark:text-slate-200">{patient.phone || "No phone on file"}</p>
        <p className="truncate text-xs text-slate-400">
          {patient.gender && patient.gender !== "unspecified"
            ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
            : "Gender N/A"}
          {patient.age ? ` • ${patient.age} yrs` : ""}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{patient.lastAppointmentLabel ?? "No visits yet"}</p>
      </div>
    </div>
  );
}

export default PatientRow;
