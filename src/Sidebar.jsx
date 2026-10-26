import React from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useApp } from "./context/AppContext";

export default function Sidebar() {
  const { users, currentUser } = useApp();
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="sidebar" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="card" style={{ padding: "8px" }}>
        <Link to="/" className={`nav-item ${path === "/" ? "active" : ""}`}>
          <span>⌂</span><span>Home</span>
        </Link>
        <Link to="/explore" className={`nav-item ${path === "/explore" ? "active" : ""}`}>
          <span>⌕</span><span>Explore</span>
        </Link>
        <Link to="/js-hub" className={`nav-item ${path === "/js-hub" ? "active" : ""}`}>
          <span>⚡</span><span>JS Concepts Hub</span>
        </Link>
        <Link to="/create" className={`nav-item ${path === "/create" ? "active" : ""}`}>
          <span>＋</span><span>Create Post</span>
        </Link>
        <Link to="/saved" className={`nav-item ${path === "/saved" ? "active" : ""}`}>
          <span>★</span><span>Saved</span>
        </Link>
        {currentUser && (
          <Link to={`/profile/${currentUser.userId}`} className={`nav-item ${path.startsWith("/profile") ? "active" : ""}`}>
            <span>👤</span><span>Profile</span>
          </Link>
        )}
      </div>

      <div className="card" style={{ padding: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px", fontWeight: "700" }}>
          <span>OUR TEAM</span>
          <span className="badge">{users.length}</span>
        </div>
        {users.map((u) => (
          <Link key={u.userId} to={`/profile/${u.userId}`} className="team-item">
            <Avatar name={u.name} size="sm" />
            <div style={{ textAlign: "left", minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "600" }}>{u.name}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>@{u.username}</div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}