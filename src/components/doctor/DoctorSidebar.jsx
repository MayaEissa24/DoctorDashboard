import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDismissableMenu } from "../../hooks/useDismissableMenu";

const DOCTOR_NAV_ITEMS = [
  { label: "Dashboard", path: "/doctor/dashboard" },
  { label: "Appointments", path: "/doctor/appointments" },
  { label: "Patients", path: "/doctor/patients" },
];

function DoctorSidebar({ isOpen, onClose, onOpen }) {
  const sidebarRef = useRef(null);

  useDismissableMenu(sidebarRef, isOpen, onClose);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open sidebar"
          className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1544a0] text-white shadow-md transition-colors hover:bg-[#0f2c66] lg:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-60 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#0f2c66] via-[#1544a0] to-[#1d4ed8] text-white transition-transform duration-300 dark:border-r dark:border-slate-800 dark:bg-none dark:bg-slate-900 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative px-5 py-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25 lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <span className="text-2xl font-bold tracking-tight">
            Digital Hub
          </span>
        </div>

        <nav className="relative flex-1 px-3">
          <ul className="flex flex-col gap-1">
            {DOCTOR_NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white text-blue-700"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DoctorSidebar;
