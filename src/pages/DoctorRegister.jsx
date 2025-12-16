import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function DoctorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/doctor-auth/register", form);
      alert("Doctor registered successfully! Please login.");
      navigate("/doctor-login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-slate-700 mb-6">
          Doctor Registration
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <input
            name="experience"
            placeholder="Experience (years)"
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <input
            name="fees"
            placeholder="Consultation Fee"
            value={form.fees}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-slate-50"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-medium transition
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Links */}
        <div className="text-center space-y-3 text-sm">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link
              to="/doctor-login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>

          <p className="text-slate-500">
            Are you a patient?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline"
            >
              Patient Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default DoctorRegister;