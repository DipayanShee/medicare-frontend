import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DoctorMyProfile() {
  const doctorId = localStorage.getItem("doctorId");
  const token = localStorage.getItem("doctorToken");
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId || !token) {
      navigate("/doctor-login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get(`/doctors/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [doctorId, token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-600">
        Loading profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-600">
        Doctor not found.
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <img
              src={`https://i.pravatar.cc/150?u=${doctor._id}`}
              alt="Doctor"
              className="w-28 h-28 rounded-full mx-auto border"
            />

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              Dr. {doctor.name}
            </h2>
            <p className="text-sm text-slate-500">
              {doctor.specialization}
            </p>

            <div className="mt-4 bg-blue-50 rounded-lg py-2 text-blue-700 font-medium">
              ₹{doctor.fees} / Consultation
            </div>
          </div>

          {/* Right Card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Full Name" value={`Dr. ${doctor.name}`} />
              <Info label="Email" value={doctor.email} />
              <Info
                label="Specialization"
                value={doctor.specialization}
              />
              <Info
                label="Experience"
                value={`${doctor.experience} years`}
              />
              <Info
                label="Clinic"
                value={doctor.clinicName || "N/A"}
              />
              <Info
                label="Consultation Fee"
                value={`₹${doctor.fees}`}
              />
            </div>

            <div className="mt-6">
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => alert("Edit profile coming soon")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable component */
function Info({ label, value }) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-700">{value}</p>
    </div>
  );
}