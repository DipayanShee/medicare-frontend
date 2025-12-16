import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";

/**
 * DoctorDashboard.jsx
 * - Tailwind classes (assumes Tailwind is configured in your project)
 * - Uses localStorage.getItem("doctorId") and "doctorToken" as in your original
 * - Keeps same endpoints: GET /appointments/doctor/:doctorId and PUT /appointments/:id/status
 */

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr; // fallback if backend uses a custom string
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatTime(dateStrOrTime) {
  // If backend returns separate time string use it, otherwise try Date parse
  if (!dateStrOrTime) return "-";
  const maybeDate = new Date(dateStrOrTime);
  if (!isNaN(maybeDate)) {
    return maybeDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return dateStrOrTime;
}

export default function DoctorDashboard() {
  const doctorId = localStorage.getItem("doctorId");
  const token = localStorage.getItem("doctorToken");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const loadAppointments = useCallback(async () => {
    if (!doctorId || !token) {
      setError("Missing doctorId or token in localStorage.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/appointments/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Expecting array in res.data; adapt if API returns { appointments: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.appointments ?? [];
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError("Failed to load appointments. Check console/network.");
    } finally {
      setLoading(false);
    }
  }, [doctorId, token]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // update status with optimistic UI
  const updateStatus = async (id, newStatus) => {
    if (!confirm(`Are you sure you want to mark this appointment as "${newStatus}"?`)) return;

    setUpdatingId(id);
    setError("");

    // Optimistic update: update UI immediately
    const previous = appointments;
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a)));

    try {
      await API.put(
        `/appointments/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optional: show a friendly message
      // (you can replace with toast lib later)
      // eslint-disable-next-line no-alert
      alert(`Appointment ${newStatus}`);
    } catch (err) {
      console.error("Failed to update appointment status:", err);
      setError("Failed to update appointment status. Reverting UI.");
      // revert UI
      setAppointments(previous);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Doctor Dashboard</h1>
        <div className="text-sm text-slate-500">
          {loading ? "Loading appointments..." : `${appointments.length} appointment(s)`}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {loading && (
          <div className="p-4 rounded bg-white shadow">
            <p className="text-sm text-slate-500">Loading...</p>
          </div>
        )}

        {!loading && appointments.length === 0 && (
          <div className="p-6 rounded bg-white shadow text-slate-600">No appointments yet.</div>
        )}

        {!loading &&
          appointments.map((appt) => {
            const isPending = appt.status === "Pending";
            return (
              <div
                key={appt._id}
                className="p-4 border rounded-xl shadow-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between"
                aria-live="polite"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={appt.patient?.avatar || `https://i.pravatar.cc/48?u=${appt.patient?.email}`}
                    alt={`${appt.patient?.name || "Patient"} avatar`}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <div className="font-medium text-slate-800">
                      {appt.patient?.name ?? "Unknown Patient"}
                    </div>
                    <div className="text-xs text-slate-500">{appt.patient?.email ?? ""}</div>
                    <div className="text-xs text-slate-500">
                      {formatDate(appt.date)} • {formatTime(appt.time ?? appt.date)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex items-center gap-4">
                  <div className="text-sm text-slate-600">
                    <div>
                      <strong>Status: </strong>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appt.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : appt.status === "Confirmed"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  </div>

                  {/* Approve / Reject shown only when pending */}
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStatus(appt._id, "Confirmed")}
                        disabled={updatingId === appt._id}
                        className={`px-3 py-2 rounded-md text-white text-sm ${
                          updatingId === appt._id ? "bg-blue-300 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        aria-label={`Approve appointment for ${appt.patient?.name}`}
                      >
                        {updatingId === appt._id ? "Updating..." : "Approve"}
                      </button>

                      <button
                        onClick={() => updateStatus(appt._id, "Cancelled")}
                        disabled={updatingId === appt._id}
                        className={`px-3 py-2 rounded-md text-sm border ${
                          updatingId === appt._id ? "border-gray-300 text-gray-400 cursor-wait" : "border-red-300 text-red-600 hover:bg-red-50"
                        }`}
                        aria-label={`Reject appointment for ${appt.patient?.name}`}
                      >
                        {updatingId === appt._id ? "Updating..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">✔ Status already updated.</div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}