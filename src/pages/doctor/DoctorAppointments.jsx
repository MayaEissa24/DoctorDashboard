import { useCallback, useEffect, useState } from "react";
import { cancelAppointment, getDoctorAppointments } from "../../api/appointment.api";
import AppointmentRow from "../../components/doctor/AppointmentRow";
import CancelAppointmentModal from "../../components/doctor/CancelAppointmentModal";

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "scheduled", label: "Scheduled" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rescheduled", label: "Rescheduled" },
];

function DoctorAppointments() {
  const [filters, setFilters] = useState({ date: "", status: "" });
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const [cancelTarget, setCancelTarget] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const load = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const { data } = await getDoctorAppointments(filters);
      setAppointments(data ?? []);
      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't load your appointments. Please try again.");
      setStatus("error");
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  function updateFilter(field) {
    return (event) => setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function openCancel(appointment) {
    setCancelError("");
    setCancelTarget(appointment);
  }

  function closeCancel() {
    if (isCancelling) return;
    setCancelTarget(null);
    setCancelError("");
  }

  async function confirmCancel() {
    if (!cancelTarget) return;
    setIsCancelling(true);
    setCancelError("");

    try {
      const { data: updated } = await cancelAppointment(cancelTarget.id);
      setAppointments((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setCancelTarget(null);
      setSuccessMessage("Appointment cancelled.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setCancelError(err.response?.data?.message || "Unable to cancel this appointment. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Date</span>
          <input
            type="date"
            value={filters.date}
            onChange={updateFilter("date")}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Status</span>
          <select
            value={filters.status}
            onChange={updateFilter("status")}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {(filters.date || filters.status) && (
          <button
            type="button"
            onClick={() => setFilters({ date: "", status: "" })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
          >
            Clear Filters
          </button>
        )}
      </div>

      {successMessage && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          {successMessage}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {status === "loading" && (
          <div className="flex h-40 items-center justify-center text-sm text-slate-400">Loading appointments...</div>
        )}

        {status === "error" && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            <p>{error}</p>
            <button
              type="button"
              onClick={load}
              className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && appointments.length === 0 && (
          <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-400">
            No appointments match your filters.
          </p>
        )}

        {status === "success" && appointments.length > 0 && (
          <div>
            {appointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} onCancel={openCancel} />
            ))}
          </div>
        )}
      </section>

      <CancelAppointmentModal
        appointment={cancelTarget}
        isSubmitting={isCancelling}
        error={cancelError}
        onConfirm={confirmCancel}
        onClose={closeCancel}
      />
    </div>
  );
}

export default DoctorAppointments;
