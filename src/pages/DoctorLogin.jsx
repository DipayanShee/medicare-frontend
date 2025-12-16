import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/doctor-auth/login", {
        email,
        password,
      });

      // Save auth data
      localStorage.setItem("doctorToken", res.data.token);
      localStorage.setItem("doctorId", res.data.doctorId);

      // fallback-safe name
      localStorage.setItem(
        "doctorName",
        res.data.doctor?.name || "Doctor"
      );

      alert("Doctor Login Successful");
      window.location.href = "/doctor-dashboard";
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-slate-700 mb-6">
          Doctor Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-slate-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Register + Patient Login */}
        <div className="text-center space-y-3 text-sm">
          <p className="text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/doctor-register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>

          <p className="text-slate-500">
            Are you a patient?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Patient Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default DoctorLogin;