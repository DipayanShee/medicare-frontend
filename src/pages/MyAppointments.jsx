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
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center md:text-left">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <div className="text-center text-slate-600 py-10 bg-white shadow rounded-xl">
            No appointments found.
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white p-6 shadow rounded-xl border border-slate-100"
              >
                {/* Doctor Info */}
                <h2 className="text-xl font-semibold text-slate-800">
                  Dr. {appt.doctor?.name}
                </h2>
                <p className="text-slate-500 mb-3">
                  {appt.doctor?.specialization}
                </p>

                {/* Appointment Details */}
                <div className="space-y-1 text-slate-600 text-sm">
                  <p>📅 {appt.date}</p>
                  <p>⏰ {appt.time}</p>

                  <p>
                    Status:{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${
                        appt.status === "Cancelled"
                          ? "bg-red-50 text-red-700"
                          : appt.status === "Confirmed"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                {/* Cancel Button */}
                {appt.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelAppointment(appt._id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;