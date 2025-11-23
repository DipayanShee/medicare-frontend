import React, { useState } from "react";
import API from "../api/api";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/doctor-auth/login", {
        email,
        password,
      });

      localStorage.setItem("doctorToken", res.data.token);
      localStorage.setItem("doctorId", res.data.doctorId);

      alert("Doctor Login Successful");
      window.location.href = "/doctor-dashboard";
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Doctor Login</h1>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email"
            placeholder="doctor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn-primary" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default DoctorLogin;