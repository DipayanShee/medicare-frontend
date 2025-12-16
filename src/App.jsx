import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import DoctorLayout from "./components/DoctorLayout";

// Public pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAppointments from "./pages/MyAppointments";

// Doctor auth
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";

// Doctor dashboard pages
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPayments from "./pages/DoctorPayments";
import DoctorMyProfile from "./pages/DoctorMyProfile";

import "./index.css";

function App() {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES (WITH NAVBAR) ========== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Route>

      {/* ========== DOCTOR AUTH (NO NAVBAR) ========== */}
      <Route path="/doctor-login" element={<DoctorLogin />} />
      <Route path="/doctor-register" element={<DoctorRegister />} />

      {/* ========== DOCTOR ROUTES (SIDEBAR ONLY) ========== */}
      <Route element={<DoctorLayout />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-payments" element={<DoctorPayments />} />
        <Route path="/doctor-profile" element={<DoctorMyProfile />} />
      </Route>
    </Routes>
  );
}

export default App;