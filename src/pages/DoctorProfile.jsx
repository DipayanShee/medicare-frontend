import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await API.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Error loading doctor:", err);
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
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    }
  };

  if (!doctor) return <h2 style={{ textAlign: "center", marginTop: 30 }}>Loading...</h2>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <h1 className="profile-name">Dr. {doctor.name}</h1>
        <p className="profile-spec">{doctor.specialization}</p>

        <p className="profile-info">Experience: {doctor.experience} years</p>
        <p className="profile-info">Fees: ₹{doctor.fees}</p>

        <p className="profile-bio">{doctor.bio}</p>

        <button className="book-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Book Appointment"}
        </button>

        {showForm && (
          <div className="booking-form">
            <p className="form-title">Book Appointment with Dr. {doctor.name}</p>

            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="form-label">Select Time</label>
            <input
              type="time"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button className="confirm-btn" onClick={handleBooking}>
              Confirm Appointment
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default DoctorProfile;