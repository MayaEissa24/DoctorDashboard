import { useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

const PAGE_TITLES = [
  { label: "Dashboard", path: "/doctor/dashboard" },
  { label: "Appointments", path: "/doctor/appointments" },
  { label: "Patients", path: "/doctor/patients" },
  { label: "Profile", path: "/doctor/profile" },
];

function MenuIcon(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

function DoctorHeader({ onOpenSidebar }) {
  const location = useLocation();

  const activeItem = PAGE_TITLES.find((item) => location.pathname.startsWith(item.path));

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 lg:hidden"
        >
          <MenuIcon />
        </button>
        <h1 className="text-base font-semibold text-slate-900 dark:text-slate-200">{activeItem?.label ?? "Doctor Portal"}</h1>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}

export default DoctorHeader;
