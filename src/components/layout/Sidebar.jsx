import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_SECTIONS } from "./navData";
import { ChevronDownIcon } from "./nav-icons";

const ITEM_CLASSES =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors";
const ACTIVE_CLASSES = "bg-blue-50 text-blue-700";
const INACTIVE_CLASSES = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
const INERT_CLASSES = "text-slate-600";

function NavRow({ item }) {
  if (item.to) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) => `${ITEM_CLASSES} ${isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
      >
        {item.icon && <item.icon size={17} />}
        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div className={`${ITEM_CLASSES} ${INERT_CLASSES} cursor-default`}>
      {item.icon && <item.icon size={17} />}
      <span className="truncate">{item.label}</span>
    </div>
  );
}

function NavGroup({ item }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`${ITEM_CLASSES} ${INACTIVE_CLASSES} justify-between`}
      >
        <span className="flex items-center gap-2.5">
          {item.icon && <item.icon size={17} />}
          <span className="truncate">{item.label}</span>
        </span>
        <ChevronDownIcon size={14} className={`shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>

      {open && (
        <div className="ml-[1.55rem] mt-0.5 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
          {item.children.map((child) =>
            child.to ? (
              <NavLink
                key={child.label}
                to={child.to}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES
                  }`
                }
              >
                {child.label}
              </NavLink>
            ) : (
              <div key={child.label} className="cursor-default rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-slate-600">
                {child.label}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

const CLINIC_NAME = "Digital Hub Clinic";

function Sidebar() {
  return (
    <aside className="flex h-screen w-[272px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18" />
          </svg>
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900">Digital Hub</span>
      </div>

      <div className="mx-4 mb-4 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          {CLINIC_NAME.charAt(0)}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-slate-800">{CLINIC_NAME}</span>
        <ChevronDownIcon size={14} className="shrink-0 text-slate-400" />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) =>
                item.children ? <NavGroup key={item.label} item={item} /> : <NavRow key={item.label} item={item} />,
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
