import React from "react";
import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-slate-100 hover:shadow-lg transition cursor-pointer">
      
      {/* Doctor Name */}
      <div className="text-xl font-semibold text-slate-800">
        Dr. {doctor.name}
      </div>

      {/* Specialization */}
      <div className="text-sm text-slate-500 mt-1">
        {doctor.specialization} • {doctor.experience} yrs experience
      </div>

      {/* Fees */}
      <div className="mt-2 text-sm text-slate-600">
        Fees: <span className="font-medium text-slate-700">₹{doctor.fees}</span>
      </div>

      {/* Hospital */}
      <span className="inline-block mt-3 px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-medium">
        {doctor.hospital || "City Care Hospital"}
      </span>

      {/* View Profile Button */}
      <div className="mt-5">
        <Link to={`/doctors/${doctor._id}`}>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;