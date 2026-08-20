import { useCallback, useEffect, useState } from "react";
import { getDoctorDashboard } from "../../api/dashboard.api";
import StatCard from "../../components/doctor/StatCard";
import AppointmentRow from "../../components/doctor/AppointmentRow";
import { CalendarIcon, ClockIcon, TrendingUpIcon } from "../../components/layout/nav-icons";

function IconBase({ children, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const CheckCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.3 2.4 2.4 4.6-5.4" />
  </IconBase>
);

const XCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </IconBase>
);

const ListCheckIcon = (props) => (
  <IconBase {...props}>
    <path d="M4 6.5h7M4 12h7M4 17.5h4" />
    <path d="m14.5 6.5 1.7 1.7L19.5 5" />
    <path d="m14.5 17 1.7 1.7L19.5 15.5" />
  </IconBase>
);

const HourglassIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 3.5h12M6 20.5h12" />
    <path d="M7 3.5v3.2a5 5 0 0 0 2.2 4.15L12 12l2.8 1.85A5 5 0 0 1 17 18v2.5M17 3.5v3.2a5 5 0 0 1-2.2 4.15L12 12l-2.8 1.85A5 5 0 0 0 7 18v2.5" />
  </IconBase>
);

const PercentIcon = (props) => (
  <IconBase {...props}>
    <path d="M5 19 19 5" />
    <circle cx="7" cy="7" r="2.25" />
    <circle cx="17" cy="17" r="2.25" />
  </IconBase>
);

const UserCheckIcon = (props) => (
  <IconBase {...props}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="m16 12 2 2 3.5-3.5" />
  </IconBase>
);

const DollarIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 3v18" />
    <path d="M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3S9.51 10.5 12 10.5s4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3" />
  </IconBase>
);

function formatDelta(delta) {
  if (delta === null) return undefined;
  if (delta > 0) return `+${delta} vs yesterday`;
  if (delta < 0) return `${delta} vs yesterday`;
  return "Same as yesterday";
}

function formatPercentChange(percent) {
  if (percent === null || percent === undefined) return undefined;
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent}% vs last week`;
}

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
  const weekChangePercent = data?.stats?.appointments?.changePercent;
  const completedThisWeek = data?.stats?.appointments?.completedThisWeek ?? 0;
  const nextPatient = data?.nextPatient ?? null;
  const queue = data?.queue ?? [];

  const confirmedToday = data?.confirmedToday ?? 0;
  const cancelledToday = data?.cancelledToday ?? 0;
  const pendingToday = data?.pendingToday ?? 0;
  const checkedInToday = data?.checkedInToday ?? 0;
  const completedToday = data?.completedToday ?? 0;
  const revenueThisWeek = data?.stats?.revenue?.total ?? 0;
  const revenueChangePercent = data?.stats?.revenue?.changePercent;

  const sparkline = data?.stats?.appointments?.sparkline ?? [];
  const yesterdayCount = sparkline.length >= 2 ? sparkline[sparkline.length - 2] : null;
  const todayVsYesterday = yesterdayCount === null ? null : todayCount - yesterdayCount;

  function shareOfToday(count) {
    if (!todayCount) return null;
    return Math.round((count / todayCount) * 100);
  }

  const confirmedShare = shareOfToday(confirmedToday);
  const cancelledShare = shareOfToday(cancelledToday);
  const pendingShare = shareOfToday(pendingToday);
  const completionRateThisWeek = weekCount ? Math.round((completedThisWeek / weekCount) * 100) : null;
  const completionRateToday = todayCount ? Math.round((completedToday / todayCount) * 100) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Today's Appointments"
          value={todayCount}
          icon={<CalendarIcon size={20} />}
          subtext={formatDelta(todayVsYesterday)}
        />
        <StatCard
          label="This Week"
          value={weekCount}
          icon={<TrendingUpIcon size={20} />}
          subtext={formatPercentChange(weekChangePercent)}
        />
        <StatCard
          label="Next Appointment"
          value={nextPatient ? nextPatient.timeLabel : "None"}
          icon={<ClockIcon size={20} />}
          subtext={nextPatient ? nextPatient.patient?.fullName : "No upcoming appointment"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Confirmed Today"
          value={confirmedToday}
          icon={<CheckCircleIcon size={20} />}
          subtext={confirmedShare === null ? undefined : `${confirmedShare}% of today's appointments`}
        />
        <StatCard
          label="Cancelled Today"
          value={cancelledToday}
          icon={<XCircleIcon size={20} />}
          subtext={cancelledShare === null ? undefined : `${cancelledShare}% of today's appointments`}
        />
        <StatCard
          label="Completed This Week"
          value={completedThisWeek}
          icon={<ListCheckIcon size={20} />}
          subtext={completionRateThisWeek === null ? undefined : `${completionRateThisWeek}% completion rate`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Pending Confirmation"
          value={pendingToday}
          icon={<HourglassIcon size={17} />}
          subtext={pendingShare === null ? undefined : `${pendingShare}% of today's appointments`}
          compact
        />
        <StatCard
          label="Completion Rate"
          value={completionRateToday === null ? "—" : `${completionRateToday}%`}
          icon={<PercentIcon size={17} />}
          subtext={todayCount ? `${completedToday} of ${todayCount} completed today` : undefined}
          compact
        />
        <StatCard label="Checked-in Now" value={checkedInToday} icon={<UserCheckIcon size={17} />} compact />
        <StatCard
          label="Revenue This Week"
          value={`$${revenueThisWeek.toLocaleString()}`}
          icon={<DollarIcon size={17} />}
          subtext={formatPercentChange(revenueChangePercent)}
          compact
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
