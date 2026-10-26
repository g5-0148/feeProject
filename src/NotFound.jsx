import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card" style={{ padding: "60px 20px", textAlign: "center", maxWidth: 600, margin: "40px auto" }}>
      <h1 style={{ fontSize: 64, fontWeight: 800, color: "var(--primary)", marginBottom: 8 }}>404</h1>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
        Oops! The page you are looking for doesn't exist or has been moved. Check your URL or return to the main dashboard.
      </p>
      <Link to="/" className="btn" style={{ display: "inline-block", padding: "10px 20px" }}>
        Go Back Home ( / )
      </Link>
    </div>
  );
}