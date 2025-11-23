import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // patient login
  const doctorLoggedIn = !!localStorage.getItem("doctorToken"); // doctor login

  // Names
  const userName = localStorage.getItem("userName") || "User";
  const doctorName = localStorage.getItem("doctorName") || "Doctor";

  // Logout functions
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
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LEFT LOGO */}
        <div className="nav-left">
          <div className="logo">MediCare+</div>
        </div>

        {/* CENTER LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>

          {isLoggedIn && <Link to="/my-appointments">My Appointments</Link>}
          {doctorLoggedIn && <Link to="/doctor-dashboard">Dashboard</Link>}
        </div>

        {/* RIGHT BUTTONS */}
        <div className="nav-auth">

          {/* PATIENT LOGGED IN */}
          {isLoggedIn && (
            <>
              <span style={{ fontSize: 13, color: "#4b5563" }}>
                Hi, {userName}
              </span>
              <button className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          {/* DOCTOR LOGGED IN */}
          {doctorLoggedIn && (
            <>
              <span style={{ fontSize: 13, color: "#4b5563" }}>
                Dr. {doctorName}
              </span>
              <button className="btn-secondary" onClick={handleDoctorLogout}>
                Logout
              </button>
            </>
          )}

          {/* NO ONE LOGGED IN */}
          {!isLoggedIn && !doctorLoggedIn && (
            <>
              <Link to="/login">
                <button className="btn-secondary">Login</button>
              </Link>

              <Link to="/register">
                <button className="btn-primary">Register</button>
              </Link>

              {/* Doctor Login */}
              <Link to="/doctor-login">
                <button className="btn-secondary" style={{ marginLeft: 10 }}>
                  Doctor Login
                </button>
              </Link>

              {/* ⭐ Doctor Register */}
              <Link to="/doctor-register">
                <button className="btn-secondary" style={{ marginLeft: 10 }}>
                  Doctor Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;