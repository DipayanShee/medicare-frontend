import React from "react";
import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="doctor-name">Dr. {doctor.name}</div>

      <div className="doctor-meta">
        {doctor.specialization} • {doctor.experience} yrs experience
      </div>

      <div className="doctor-meta">Fees: ₹{doctor.fees}</div>

      <span className="badge">
        {doctor.hospital || "City Care Hospital"}
      </span>

      <div style={{ marginTop: 10 }}>
        {/* FIXED: use _id instead of id */}
        <Link to={`/doctors/${doctor._id}`}>
          <button className="btn-secondary">View Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;