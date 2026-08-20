import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/doctors/CompleteProfile";
import DoctorLayout from "./pages/doctor/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import { Patients, Settings } from "./pages/Placeholders";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/onboarding/profile" element={<CompleteProfile />} />
            </Route>

            <Route element={<DoctorLayout />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
            </Route>

            <Route element={<MainLayout />}>
              <Route path="/patients" element={<Patients />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Legacy paths kept working so the auth/onboarding flow's hardcoded
                "/dashboard" redirect target still resolves without modification. */}
            <Route path="/dashboard" element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="/appointments" element={<Navigate to="/doctor/appointments" replace />} />
            <Route path="/doctors/me" element={<Navigate to="/doctor/profile" replace />} />
          </Route>

          <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
