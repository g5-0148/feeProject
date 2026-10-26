import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "./context/AppContext";

export default function Login() {
  const { loginUser } = useApp();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginUser(identity)) {
      setErr("User not found. Try siya, ruchika, or prachi.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="auth-wrapper auth-login">
      {/* Left Column: Image Banner (Login) */}
      <div className="auth-banner">
        <div className="auth-banner-overlay">
          <div className="logo" style={{ fontSize: 24, marginBottom: 8, color: "inherit" }}>SkillSphere</div>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            Welcome back! Log in to access your student developer dashboard.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="auth-form-side">
        <h1 style={{ color: "var(--primary)", fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>
          SkillSphere
        </h1>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginBottom: 24 }}>
          Student Tech & Skill Community
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username, Email, or ID</label>
            <input
              required
              placeholder="e.g. siya"
              value={identity}
              onChange={(e) => { setIdentity(e.target.value); setErr(""); }}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && <div style={{ color: "var(--like)", fontSize: 12, marginBottom: 12 }}>{err}</div>}
          <button type="submit" className="btn" style={{ width: "100%", marginTop: 6 }}>
            Log In →
          </button>
        </form>

        <div style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 20 }}>
          New here?{" "}
          <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}