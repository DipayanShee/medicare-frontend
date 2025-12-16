import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DoctorLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");
    navigate("/doctor-login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition
     ${
       isActive
         ? "bg-blue-600 text-white shadow"
         : "text-slate-600 hover:bg-slate-100"
     }`;

  return (
    // 🔒 LOCK LAYOUT HEIGHT
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col h-screen">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-blue-600">
            MediCare<span className="text-slate-700">+</span>
          </h1>
        </div>

        {/* Doctor Profile */}
        <div className="p-6 flex flex-col items-center border-b">
          <img
            src="https://i.pravatar.cc/120"
            alt="Doctor"
            className="w-20 h-20 rounded-full border shadow-sm"
          />
          <p className="mt-3 font-semibold text-slate-700">
            Dr. {localStorage.getItem("doctorName") || "Doctor"}
          </p>
          <span className="text-xs text-slate-500">Doctor Panel</span>
        </div>

        {/* Navigation (scrolls if needed) */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          <NavLink to="/doctor-dashboard" className={menuClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/doctor-appointments" className={menuClass}>
            📅 Appointments
          </NavLink>

          <NavLink to="/doctor-payments" className={menuClass}>
            💳 Payments
          </NavLink>

          <NavLink to="/doctor-profile" className={menuClass}>
            👤 Profile
          </NavLink>
        </nav>

        {/* Logout — ALWAYS AT BOTTOM */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ================= PAGE CONTENT ================= */}
      {/* ✅ ONLY CONTENT SCROLLS */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}