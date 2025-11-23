import React, { useState } from "react";
import API from "../api/api";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
    hospital: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/doctor-auth/register", form);
      alert("Doctor registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Doctor Registration</h1>
      <p className="form-subtitle">Create your doctor account to accept appointments.</p>

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>
          <input
            name="specialization"
            type="text"
            required
            value={form.specialization}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Experience (years)</label>
          <input
            name="experience"
            type="number"
            required
            value={form.experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fees</label>
          <input
            name="fees"
            type="number"
            required
            value={form.fees}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hospital</label>
          <input
            name="hospital"
            type="text"
            required
            value={form.hospital}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            rows="3"
            required
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
            value={form.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="btn-primary" style={{ width: "100%", marginTop: 10 }}>
          Register
        </button>

      </form>
    </div>
  );
}

export default DoctorRegister;