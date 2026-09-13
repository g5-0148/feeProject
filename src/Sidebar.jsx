import React from "react";
import Avatar from "./Avatar";

const NAV = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "explore", label: "Explore", icon: "⌕" },
  { id: "create", label: "Create Post", icon: "＋" },
  { id: "saved", label: "Saved", icon: "★" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ page, users, currentUser, onNavigate }) {
  return (
    <aside className="sidebar" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="card" style={{ padding: "8px" }}>
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id, item.id === "profile" ? currentUser.userId : null)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px", fontWeight: "700" }}>
          <span>OUR TEAM</span>
          <span className="badge">{users.length}</span>
        </div>
        {users.map((u) => (
          <button key={u.userId} className="team-item" onClick={() => onNavigate("profile", u.userId)}>
            <Avatar name={u.name} size="sm" />
            <div style={{ textAlign: "left", minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "600" }}>{u.name}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>@{u.username}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}