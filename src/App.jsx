import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Explore from "./Explore";
import CreatePost from "./CreatePost";
import Saved from "./Saved";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import JsConceptsHub from "./JsConceptsHub";
import NotFound from "./NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider, useApp } from "./context/AppContext";
import "./style.css";

function AppContent() {
  const { currentUser, isAuthenticating, authStepMessage } = useApp();

  // Show simulated async slow-loading screen upon authentication
  if (isAuthenticating) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--bg, #0d1410)" }}>
        <div className="card" style={{ padding: "40px", textAlign: "center", maxWidth: 400, width: "100%" }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "var(--primary)" }}>SkillSphere ⚡</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: "var(--text)" }}>{authStepMessage}</div>
          <div style={{ width: "100%", height: 6, background: "#cbd5e1", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: "60%", height: "100%", background: "#1b5e20", animation: "pulse 1.5s infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <Signup />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Layout><Explore /></Layout></ProtectedRoute>} />
      <Route path="/js-hub" element={<ProtectedRoute><Layout><JsConceptsHub /></Layout></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><Layout><CreatePost /></Layout></ProtectedRoute>} />
      <Route path="/saved" element={<ProtectedRoute><Layout><Saved /></Layout></ProtectedRoute>} />
      <Route path="/profile/:userId" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      
      {/* 404 Route */}
      <Route path="*" element={<ProtectedRoute><Layout><NotFound /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}