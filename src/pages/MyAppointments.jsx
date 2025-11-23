import React, { useEffect, useState } from "react";
import API from "../api/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/appointments/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);


  const cancelAppointment = async (id) => {
    try {
      await API.put(
        `/appointments/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "Cancelled" } : a
        )
      );

      alert("Appointment cancelled");
    } catch (err) {
      alert("Error cancelling appointment");
    }
  };


  return (
    <div className="app-main">
      <h1 className="hero-title">My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div className="table-card" key={appt._id} style={{ marginBottom: 18 }}>

            <h2 className="profile-name" style={{ fontSize: 22 }}>
              Dr. {appt.doctor?.name}
            </h2>

            <p className="profile-meta">{appt.doctor?.specialization}</p>

            <p className="profile-info">📅 {appt.date}</p>
            <p className="profile-info">⏰ {appt.time}</p>

            <p className="profile-info">
              Status:{" "}
              <span
                className={
                  appt.status === "Cancelled"
                    ? "status-pill status-cancelled"
                    : "status-pill status-pending"
                }
              >
                {appt.status}
              </span>
            </p>

            {appt.status !== "Cancelled" && (
              <button
                className="btn-primary"
                style={{ marginTop: 10 }}
                onClick={() => cancelAppointment(appt._id)}
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;