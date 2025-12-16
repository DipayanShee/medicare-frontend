import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

function formatTime(timeStr) {
  return new Date(timeStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DoctorDashboard() {
  const doctorId = localStorage.getItem("doctorId");
  const token = localStorage.getItem("doctorToken");
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const loadAppointments = useCallback(async () => {
    if (!doctorId || !token) return navigate("/doctor-login");

    setLoading(true);
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
  }, [doctorId, token, navigate]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const updateStatus = async (id, status) => {
    if (!confirm(`Mark appointment as ${status}?`)) return;

    setUpdatingId(id);
    const prev = appointments;

    setAppointments((p) =>
      p.map((a) => (a._id === id ? { ...a, status } : a))
    );

    try {
      await API.put(
        `/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      setAppointments(prev);
    } finally {
      setUpdatingId(null);
    }
  };

  const todayAppointments = appointments.filter(
    (a) => new Date(a.date).toDateString() === new Date().toDateString()
  );

  return (
    <>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-slate-500">Total Appointments</p>
          <h2 className="text-2xl font-bold">{appointments.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-slate-500">Today Patients</p>
          <h2 className="text-2xl font-bold">
            {todayAppointments.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-slate-500">Confirmed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {appointments.filter(a => a.status === "Confirmed").length}
          </h2>
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Today Appointments
        </h2>

        {loading && <p>Loading...</p>}

        {!loading &&
          appointments.map((a) => (
            <div
              key={a._id}
              className="flex justify-between items-center border-b py-4 last:border-none"
            >
              <div>
                <p className="font-medium">
                  {a.patient?.name || "Patient"}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(a.date)} • {formatTime(a.time)}
                </p>
              </div>

              {a.status === "Pending" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(a._id, "Confirmed")}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "Cancelled")}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-sm">{a.status}</span>
              )}
            </div>
          ))}
      </div>
    </>
  );
}