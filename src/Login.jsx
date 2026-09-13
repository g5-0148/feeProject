import React, { useState } from "react";

export default function Login({ onLogin, onNavigate }) {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(identity)) {
      setErr("User not found. Try siya_dev, ruchika_ui, or prachi_coder.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Left Side: Dynamic Theme Banner */}
        <div className="auth-banner">
          <div className="auth-banner-overlay">
            <div className="logo" style={{ fontSize: 24, marginBottom: 8 }}>SkillSphere</div>
            <p style={{ fontSize: 14, opacity: 0.9 }}>
              Connect with fellow student developers, share project milestones, and showcase your technical skills.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Welcome Back</h1>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
            Student Tech & Skill Community
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
                Username, Email, or ID
              </label>
              <input
                required
                placeholder="Enter Username"
                value={identity}
                onChange={(e) => { setIdentity(e.target.value); setErr(""); }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {err && (
              <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 12 }}>
                {err}
              </div>
            )}

            <button type="submit" className="btn" style={{ width: "100%", marginTop: 6, padding: "10px 14px" }}>
              Log In →
            </button>
          </form>

          <div style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 20 }}>
            New here?{" "}
            <button
              onClick={() => onNavigate("signup")}
              style={{ color: "#1b5e20", fontWeight: 700 }}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}