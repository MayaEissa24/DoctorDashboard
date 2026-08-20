import { useCallback, useEffect, useState } from "react";
import { getDoctorDashboard } from "../../api/dashboard.api";
import StatCard from "../../components/doctor/StatCard";
import AppointmentRow from "../../components/doctor/AppointmentRow";
import { CalendarIcon, ClockIcon, TrendingUpIcon } from "../../components/layout/nav-icons";

function DoctorDashboard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const { data: dashboard } = await getDoctorDashboard();
      setData(dashboard);
      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't load your dashboard. Please try again.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (status === "loading") {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading dashboard...</div>;
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        <p>{error}</p>
        <button
          type="button"
          onClick={load}
          className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Try Again
        </button>
      </div>
    );
  }

  const todayCount = data?.todayAppointments ?? 0;
  const weekCount = data?.stats?.appointments?.total ?? 0;
  const nextPatient = data?.nextPatient ?? null;
  const queue = data?.queue ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Today's Appointments" value={todayCount} icon={<CalendarIcon size={20} />} />
        <StatCard label="This Week" value={weekCount} icon={<TrendingUpIcon size={20} />} />
        <StatCard
          label="Next Appointment"
          value={nextPatient ? nextPatient.timeLabel : "None"}
          hint={nextPatient ? nextPatient.patient?.fullName : "No upcoming appointment"}
          icon={<ClockIcon size={20} />}
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-slate-900">Today's Appointments</h2>

        {queue.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-400">
            No appointments scheduled for today.
          </p>
        ) : (
          <div>
            {queue.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DoctorDashboard;
