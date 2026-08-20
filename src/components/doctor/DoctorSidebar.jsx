import { NavLink } from "react-router-dom";

export const DOCTOR_NAV_ITEMS = [
  { label: "Dashboard", path: "/doctor/dashboard" },
  { label: "Appointments", path: "/doctor/appointments" },
  { label: "Profile", path: "/doctor/profile" },
];

function DoctorSidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-5 py-5 text-lg font-bold tracking-tight text-slate-900">Digital Hub</div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {DOCTOR_NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
