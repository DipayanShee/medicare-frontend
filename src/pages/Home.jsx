import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Book Doctor Appointments Online</h1>
        <p className="hero-subtitle">
          MediCare+ helps you quickly book appointments with specialist doctors,
          without standing in a long queue at the hospital.
        </p>
        <div className="hero-actions">
          <Link to="/doctors">
            <button className="btn-primary">Find Doctors</button>
          </Link>
          <Link to="/login">
            <button className="btn-secondary">Login as Patient</button>
          </Link>
        </div>
      </section>

      <section className="hero" style={{ marginTop: 12 }}>
        <h2 className="form-title">Why this project?</h2>
        <p className="hero-subtitle">
          This system is built for college mini-projects / major-projects to
          demonstrate how MERN can be used for real-life healthcare
          applications: registration, doctor search and appointment booking.
        </p>
        <ul style={{ marginLeft: 16, fontSize: 14, color: "#4b5563" }}>
          <li>✔ Patient registration & login (frontend mock)</li>
          <li>✔ Doctor listing & profile</li>
          <li>✔ Appointment booking interface</li>
          <li>✔ My Appointments dashboard</li>
        </ul>
      </section>
    </>
  );
}

export default Home;