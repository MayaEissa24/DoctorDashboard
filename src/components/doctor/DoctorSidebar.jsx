import { NavLink } from "react-router-dom";

export const DOCTOR_NAV_ITEMS = [
  { label: "Dashboard", path: "/doctor/dashboard" },
  { label: "Appointments", path: "/doctor/appointments" },
  { label: "Profile", path: "/doctor/profile" },
];

function DoctorSidebar() {
  return (
    <aside className="relative flex h-screen w-60 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#0f2c66] via-[#1544a0] to-[#1d4ed8] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18" />
          </svg>
        </span>
        <span className="text-lg font-bold tracking-tight">Digital Hub</span>
      </div>

      <nav className="relative flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {DOCTOR_NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-white text-blue-700" : "text-white/75 hover:bg-white/10 hover:text-white"
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
  );
}

export default DoctorSidebar;
