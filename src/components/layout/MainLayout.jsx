import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col overflow-y-auto bg-slate-50 p-6">
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="mt-8 pb-2 text-center text-xs text-slate-400">
            © 2026 Digital Hub, All Rights Reserved
          </footer>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
