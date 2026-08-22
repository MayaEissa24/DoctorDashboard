import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useTheme } from "../../theme/useTheme";
import { useDismissableMenu } from "../../hooks/useDismissableMenu";
import { LogOutIcon, SunIcon } from "../layout/nav-icons";
import LogoutConfirmModal from "./LogoutConfirmModal";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
  return initials || "?";
}

function Avatar({ name, photoUrl, size = 36 }) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name || "Profile"}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="flex items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </span>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef(null);

  const name = user?.fullName || user?.name;

  function close() {
    setOpen(false);
  }

  useDismissableMenu(menuRef, open, close);

  function handleLogoutClick() {
    setOpen(false);
    setShowLogoutConfirm(true);
  }

  function confirmLogout() {
    setShowLogoutConfirm(false);
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <Avatar name={name} photoUrl={user?.photoUrl} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-700">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-200">{name}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>

          <Link
            to="/doctor/profile"
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Profile
          </Link>

          <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200">
            <span className="flex items-center gap-2">
              <SunIcon size={15} />
              Dark Mode
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                isDark ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  isDark ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <LogOutIcon size={15} />
            Logout
          </button>
        </div>
      )}

      <LogoutConfirmModal open={showLogoutConfirm} onConfirm={confirmLogout} onClose={() => setShowLogoutConfirm(false)} />
    </div>
  );
}

export default UserMenu;
