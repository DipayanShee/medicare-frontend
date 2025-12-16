import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const doctorLoggedIn = !!localStorage.getItem("doctorToken");

  const userName = localStorage.getItem("userName") || "User";
  const doctorName = localStorage.getItem("doctorName") || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleDoctorLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");
    navigate("/doctor-login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MediCare+
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-slate-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/doctors" className="hover:text-blue-600">Doctors</Link>

          {isLoggedIn && (
            <Link to="/my-appointments" className="hover:text-blue-600">
              My Appointments
            </Link>
          )}

          {doctorLoggedIn && (
            <Link to="/doctor-dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT SECTION (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">

          {/* PATIENT LOGGED IN */}
          {isLoggedIn && (
            <>
              <span className="text-sm text-slate-600">Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}

          {/* DOCTOR LOGGED IN */}
          {doctorLoggedIn && (
            <>
              <span className="text-sm text-slate-600">Dr. {doctorName}</span>
              <button
                onClick={handleDoctorLogout}
                className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}

          {/* NOT LOGGED IN */}
          {!isLoggedIn && !doctorLoggedIn && (
            <>
              <Link to="/login">
                <button className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100">
                  Patient Login
                </button>
              </Link>

              <Link to="/doctor-login">
                <button className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100">
                  Doctor Login
                </button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/doctors">Doctors</Link>

          {isLoggedIn && (
            <Link onClick={() => setOpen(false)} to="/my-appointments">
              My Appointments
            </Link>
          )}

          {doctorLoggedIn && (
            <Link onClick={() => setOpen(false)} to="/doctor-dashboard">
              Dashboard
            </Link>
          )}

          <div className="pt-3 border-t space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full py-2 border rounded-lg"
              >
                Logout
              </button>
            ) : doctorLoggedIn ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleDoctorLogout();
                }}
                className="w-full py-2 border rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-2 border rounded-lg"
                  >
                    Patient Login
                  </button>
                </Link>

                <Link to="/doctor-login">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-2 border rounded-lg"
                  >
                    Doctor Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
