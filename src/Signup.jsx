import React, { useState } from "react";

export default function Signup({ onSignup, onNavigate }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [bio, setBio] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setErr("Please provide a valid username and email.");
      return;
    }

    const success = onSignup({
      name: name.trim() || username.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      college: college.trim() || "Student",
      bio: bio.trim() || "Exploring new tech and building cool projects.",
    });

    if (!success) {
      setErr("Username or email already in use. Please pick another.");
    }
  };

  return (
    <div className="auth-wrapper auth-reverse">
      {/* Left Column: Form */}
      <div className="auth-form-side">
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Join SkillSphere</h1>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
          Create your developer profile and connect with peers
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
              Full Name
            </label>
            <input
              required
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
              Username
            </label>
            <input
              required
              placeholder="Enter Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErr(""); }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErr(""); }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
              College / Major
            </label>
            <input
              placeholder="e.g. CSE Student"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
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

          <button type="submit" className="btn" style={{ width: "100%", marginTop: 4, padding: "10px 14px" }}>
            Create Account →
          </button>
        </form>

        <div style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 18 }}>
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("login")}
            style={{ color: "#1b5e20", fontWeight: 700 }}
          >
            Log in
          </button>
        </div>
      </div>

      {/* Right Column: Image Banner */}
      <div className="auth-banner">
        <div className="auth-banner-overlay">
          <div className="logo" style={{ fontSize: 24, marginBottom: 8 }}>SkillSphere</div>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            Showcase your projects, share tech insights, and discover what fellow students are building.
          </p>
        </div>
      </div>
    </div>
  );
}