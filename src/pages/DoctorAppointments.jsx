import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function DoctorAppointments() {
  const doctorId = localStorage.getItem("doctorId");
  const token = localStorage.getItem("doctorToken");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get(`/appointments/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, token]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      {loading && <p>Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p className="text-slate-500">No appointments found.</p>
      )}

      {!loading &&
        appointments.map((a) => (
          <div
            key={a._id}
            className="flex justify-between items-center border-b py-3 last:border-none"
          >
            <div>
              <p className="font-medium">
                {a.patient?.name || "Patient"}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(a.date).toLocaleDateString()} • {a.time}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                a.status === "Confirmed"
                  ? "bg-green-100 text-green-600"
                  : a.status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
    </div>
  );
}