import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Error loading doctor:", err);
        alert("Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      alert("You must login to book appointment");
      return;
    }

    setBookingLoading(true);
    try {
      await API.post(
        "/appointments",
        {
          patient: userId,
          doctor: doctor._id,
          date,
          time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment booked successfully!");
      setShowForm(false);
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-600">Loading doctor profile...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-red-600">Doctor not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left - avatar & basic info */}
            <div className="md:w-1/3 p-6 bg-gradient-to-b from-white to-blue-50 flex flex-col items-center text-center">
              <img
                src={doctor.avatar || `https://i.pravatar.cc/120?u=${doctor._id}`}
                alt={`Dr. ${doctor.name}`}
                className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <h2 className="mt-4 text-lg font-semibold text-slate-800">Dr. {doctor.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{doctor.specialization}</p>

              <div className="mt-4 w-full">
                <div className="flex justify-between text-sm text-slate-600">
                  <div>
                    <div className="text-xs">Experience</div>
                    <div className="font-medium">{doctor.experience ?? "-" } yrs</div>
                  </div>
                  <div>
                    <div className="text-xs">Consult Fee</div>
                    <div className="font-medium">₹{doctor.fees ?? "-"}</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowForm((s) => !s)}
                  className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {showForm ? "Cancel" : "Book Appointment"}
                </button>
              </div>
            </div>

            {/* Right - bio, details and booking form */}
            <div className="md:w-2/3 p-6">
              <div className="mb-4">
                <h3 className="text-slate-700 text-lg font-semibold">About</h3>
                <p className="mt-2 text-slate-600">{doctor.bio || "No bio available."}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500">Working Days</div>
                  <div className="mt-1 text-slate-700">{doctor.workingDays ?? "Mon - Fri"}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500">Clinic / Hospital</div>
                  <div className="mt-1 text-slate-700">{doctor.clinicName ?? "Not specified"}</div>
                </div>
              </div>

              {/* Booking form */}
              {showForm && (
                <div className="mt-4 p-4 border rounded-lg bg-white">
                  <h4 className="text-slate-700 font-medium mb-3">
                    Book Appointment with Dr. {doctor.name}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Select Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Select Time</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={handleBooking}
                      disabled={bookingLoading}
                      className={`px-4 py-2 rounded-lg text-white ${bookingLoading ? "bg-blue-300 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {bookingLoading ? "Booking..." : "Confirm Appointment"}
                    </button>

                    <button
                      onClick={() => {
                        setShowForm(false);
                        setDate("");
                        setTime("");
                      }}
                      className="px-3 py-2 rounded-lg border text-sm text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Contact / other info */}
              <div className="mt-6 text-sm text-slate-600">
                <div><strong>Contact:</strong> {doctor.phone ?? "Not provided"}</div>
                <div className="mt-1"><strong>Address:</strong> {doctor.address ?? "Not provided"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;