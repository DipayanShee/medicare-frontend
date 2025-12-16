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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Doctor Registration
        </h1>
        <p className="text-center text-slate-500 text-sm mt-1 mb-6">
          Create your doctor account to accept appointments.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Specialization</label>
            <input
              name="specialization"
              type="text"
              required
              value={form.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Experience (years)</label>
            <input
              name="experience"
              type="number"
              required
              value={form.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fees */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Fees</label>
            <input
              name="fees"
              type="number"
              required
              value={form.fees}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Hospital</label>
            <input
              name="hospital"
              type="text"
              required
              value={form.hospital}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Bio</label>
            <textarea
              name="bio"
              rows="3"
              required
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default DoctorRegister;