import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useApp } from "./context/AppContext";

export default function Navbar() {
  const { currentUser, theme, toggleTheme, logoutUser } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {currentUser && (
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
          <Link to="/" className="logo">
            SkillSphere
          </Link>
        </div>

        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === "light" ? "☾" : "☼"}
          </button>
          {currentUser && (
            <>
              <button className="nav-item" style={{ width: "auto", padding: "4px 8px" }} onClick={() => navigate(`/profile/${currentUser.userId}`)}>
                <Avatar name={currentUser.name} size="sm" />
                <span className="nav-username">{currentUser.name}</span>
              </button>
              <button className="btn" style={{ background: "transparent", color: "inherit", padding: "4px 8px" }} onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {menuOpen && currentUser && (
        <div className="mobile-menu card" style={{ padding: 12 }}>
          <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}><span>⌂</span><span>Home</span></Link>
          <Link to="/explore" className="nav-item" onClick={() => setMenuOpen(false)}><span>⌕</span><span>Explore</span></Link>
          <Link to="/js-hub" className="nav-item" onClick={() => setMenuOpen(false)}><span>⚡</span><span>JS Concepts Hub</span></Link>
          <Link to="/create" className="nav-item" onClick={() => setMenuOpen(false)}><span>＋</span><span>Create Post</span></Link>
          <Link to="/saved" className="nav-item" onClick={() => setMenuOpen(false)}><span>★</span><span>Saved</span></Link>
          <Link to={`/profile/${currentUser.userId}`} className="nav-item" onClick={() => setMenuOpen(false)}><span>👤</span><span>Profile</span></Link>
        </div>
      )}
    </nav>
  );
}