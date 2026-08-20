import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { DOCTOR_NAV_ITEMS } from "./DoctorSidebar";

function DoctorHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeItem = DOCTOR_NAV_ITEMS.find((item) => location.pathname.startsWith(item.path));

  function handleLogout() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <h1 className="text-base font-semibold text-slate-900">{activeItem?.label ?? "Doctor Portal"}</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">{user?.fullName || user?.name}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default DoctorHeader;
