import React, { useState } from "react";
import Avatar from "./Avatar";

const NAV = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "explore", label: "Explore", icon: "⌕" },
  { id: "create", label: "Create Post", icon: "＋" },
  { id: "saved", label: "Saved", icon: "★" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export default function Navbar({ currentUser, theme, onToggleTheme, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileNav = (pageId, userId = null) => {
    onNavigate(pageId, userId);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {currentUser && (
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
          <div className="logo" onClick={() => handleMobileNav("home")}>
            SkillSphere
          </div>
        </div>

        <div className="nav-right">
          <button className="theme-btn" onClick={onToggleTheme} title="Toggle Theme">
            {theme === "light" ? "☾" : "☼"}
          </button>
          {currentUser && (
            <>
              <button
                className="nav-item"
                style={{ width: "auto", padding: "4px 8px" }}
                onClick={() => handleMobileNav("profile", currentUser.userId)}
              >
                <Avatar name={currentUser.name} size="sm" />
                <span className="nav-username">{currentUser.name}</span>
              </button>
              <button
                className="btn"
                style={{ background: "transparent", color: "inherit", padding: "4px 8px" }}
                onClick={onLogout}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Slide-down drawer on mobile */}
      {menuOpen && currentUser && (
        <div className="mobile-menu card">
          {NAV.map((item) => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => handleMobileNav(item.id, item.id === "profile" ? currentUser.userId : null)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}