import { Outlet, useLocation } from "react-router-dom";
import BrandPanel from "./BrandPanel";

function AuthLayout() {
  const { pathname } = useLocation();
  const isRegister = pathname.startsWith("/register");
  const isWide = !["/login", "/register"].includes(pathname);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-white text-slate-900"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <div
        className="hidden transition-[left] duration-700 ease-in-out md:absolute md:top-0 md:block md:h-full md:w-1/2"
        style={{ left: isRegister ? "50%" : "0%" }}
      >
        <BrandPanel />
      </div>

      <div
        className="h-full w-full overflow-y-auto md:absolute md:top-0 md:h-full md:w-1/2 transition-[left] duration-700 ease-in-out"
        style={{ left: isRegister ? "0%" : "50%" }}
      >
        <div className="flex min-h-full items-center justify-center px-6 py-12 sm:px-10">
          <div key={pathname} className={`w-full animate-auth-in ${isWide ? "max-w-2xl" : "max-w-md"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
