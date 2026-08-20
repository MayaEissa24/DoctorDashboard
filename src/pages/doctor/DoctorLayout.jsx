import { Outlet } from "react-router-dom";
import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import DoctorHeader from "../../components/doctor/DoctorHeader";

function DoctorLayout() {
  return (
    <div className="flex h-screen">
      <DoctorSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DoctorHeader />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
