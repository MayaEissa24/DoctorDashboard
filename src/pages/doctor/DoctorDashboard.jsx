import { useQuery } from "@tanstack/react-query";
import { getDoctorDashboard } from "../../api/dashboard.api";
import StatCard from "../../components/doctor/StatCard";
import AppointmentRow from "../../components/doctor/AppointmentRow";
import AppointmentStatsChart from "../../components/doctor/AppointmentStatsChart";
import { CalendarIcon, ClockIcon, SwapIcon } from "../../components/layout/nav-icons";

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

const SUMMARY_ICONS = {
  total: CalendarIcon,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
  rescheduled: SwapIcon,
};

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
  const {
    data,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["doctor-dashboard"],
    queryFn: async () => {
      const { data: dashboard } = await getDoctorDashboard();
      return dashboard;
    },
  });

  if (status === "pending") {
    return <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading dashboard...</div>;
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
        <p>{error?.response?.data?.message || "We couldn't load your dashboard. Please try again."}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-800 dark:hover:bg-red-950/30"
        >
          Try Again
        </button>
      </div>
    );
  }

  const todayCount = data?.todayAppointments ?? 0;
  const nextPatient = data?.nextPatient ?? null;
  const queue = data?.queue ?? [];

  const confirmedToday = data?.confirmedToday ?? 0;
  const cancelledToday = data?.cancelledToday ?? 0;
  const pendingToday = data?.pendingToday ?? 0;
  const checkedInToday = data?.checkedInToday ?? 0;
  const completedToday = data?.completedToday ?? 0;
  const revenueThisWeek = data?.stats?.revenue?.total ?? 0;
  const revenueChangePercent = data?.stats?.revenue?.changePercent;

  const appointmentSummary = data?.appointmentStats?.summary ?? [];
  const monthlyBreakdown = data?.appointmentStats?.monthly ?? [];

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
  const completionRateToday = todayCount ? Math.round((completedToday / todayCount) * 100) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's Appointments"
          value={todayCount}
          icon={<CalendarIcon size={20} />}
          subtext={formatDelta(todayVsYesterday)}
        />
        <StatCard
          label="Next Appointment"
          value={nextPatient ? nextPatient.timeLabel : "None"}
          icon={<ClockIcon size={20} />}
          subtext={nextPatient ? nextPatient.patient?.fullName : "No upcoming appointment"}
        />
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
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      {appointmentSummary.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {appointmentSummary.map((item) => {
            const Icon = SUMMARY_ICONS[item.key] ?? CalendarIcon;
            return (
              <StatCard
                key={item.key}
                label={item.label}
                value={item.value}
                icon={<Icon size={20} />}
                trend={item.changePercent}
                trendLabel="in last 7 days"
                sparklineData={item.sparkline}
              />
            );
          })}
        </div>
      )}

      <AppointmentStatsChart monthly={monthlyBreakdown} />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-[15px] font-bold text-slate-900 dark:text-slate-200">Today's Appointments</h2>

        {queue.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-400 dark:bg-slate-900/50">
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
