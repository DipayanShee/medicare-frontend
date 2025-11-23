import React, { useEffect, useState } from "react";
import API from "../api/api";

function DoctorDashboard() {
  const doctorId = localStorage.getItem("doctorId");
  const token = localStorage.getItem("doctorToken");

  const [appointments, setAppointments] = useState([]);

  // Load all appointments for doctor
  const loadAppointments = async () => {
    try {
      const res = await API.get(`/appointments/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  // Update status (Approve / Reject)
  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Appointment ${status}`);
      loadAppointments(); // reload after updating
    } catch (err) {
      alert("Failed to update appointment status");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map((appt) => (
          <div
            key={appt._id}
            className="p-4 border rounded-xl shadow mb-4 bg-white"
          >
            <p><strong>Patient:</strong> {appt.patient?.name}</p>
            <p><strong>Email:</strong> {appt.patient?.email}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Status:</strong> {appt.status}</p>

            {/* Buttons only if pending */}
            {appt.status === "Pending" && (
              <div style={{ marginTop: 10 }}>
                <button
                  className="btn-primary"
                  onClick={() => updateStatus(appt._id, "Confirmed")}
                  style={{ marginRight: "10px" }}
                >
                  Approve
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => updateStatus(appt._id, "Cancelled")}
                >
                  Reject
                </button>
              </div>
            )}

            {/* If already approved / rejected */}
            {appt.status !== "Pending" && (
              <p style={{ color: "#4b5563", marginTop: 10 }}>
                ✔ Status already updated.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDashboard;