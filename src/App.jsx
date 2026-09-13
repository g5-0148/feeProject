import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Explore from "./Explore";
import CreatePost from "./CreatePost";
import Saved from "./Saved";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import { initialUsers } from "./users";
import { initialPosts } from "./posts";
import "./style.css";

const getValidData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [users, setUsers] = useState(() => getValidData("skillsphere_users", initialUsers));
  const [posts, setPosts] = useState(() => getValidData("skillsphere_posts", initialPosts));
  
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem("skillsphere_currentUser") || null);
  const [page, setPage] = useState(() => (localStorage.getItem("skillsphere_currentUser") ? "home" : "login"));
  const [viewingUserId, setViewingUserId] = useState(() => localStorage.getItem("skillsphere_currentUser") || null);
  const [theme, setTheme] = useState(() => localStorage.getItem("skillsphere_theme") || "dark");

  useEffect(() => {
    localStorage.setItem("skillsphere_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("skillsphere_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem("skillsphere_currentUser", currentUserId);
    } else {
      localStorage.removeItem("skillsphere_currentUser");
    }
  }, [currentUserId]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("skillsphere_theme", theme);
  }, [theme]);

  const currentUser = users.find((u) => u.userId === currentUserId) || null;

  const handleNavigate = (targetPage, profileId = null) => {
    if (profileId) setViewingUserId(profileId);
    else if (targetPage === "profile") setViewingUserId(currentUser?.userId);
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (val) => {
    const q = val.trim().toLowerCase();
    const userPool = users.length ? users : initialUsers;
    const user = userPool.find(
      (u) =>
        u.username?.toLowerCase() === q ||
        u.email?.toLowerCase() === q ||
        u.userId?.toLowerCase() === q
    );
    if (!user) return false;
    setCurrentUserId(user.userId);
    setViewingUserId(user.userId);
    setPage("home");
    return true;
  };

  const handleSignup = (newUser) => {
    const username = newUser.username.trim().toLowerCase();
    const userPool = users.length ? users : initialUsers;
    if (userPool.some((u) => u.username?.toLowerCase() === username || u.email?.toLowerCase() === newUser.email.toLowerCase())) {
      return false;
    }
    const user = { ...newUser, username, userId: username, followers: 0, following: 0, isFollowing: false };
    setUsers((prev) => [...prev, user]);
    setCurrentUserId(user.userId);
    setViewingUserId(user.userId);
    setPage("home");
    return true;
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    setViewingUserId(null);
    localStorage.removeItem("skillsphere_currentUser");
    setPage("login");
  };

  const handleLike = (postId) => {
    if (!currentUser) return;
    setPosts((prev) => prev.map((post) => {
      if (post.postId !== postId) return post;
      const liked = (post.likedBy || []).includes(currentUser.userId);
      return {
        ...post,
        likedBy: liked ? post.likedBy.filter((id) => id !== currentUser.userId) : [...(post.likedBy || []), currentUser.userId],
        likes: liked ? Math.max(0, (post.likes || 0) - 1) : (post.likes || 0) + 1
      };
    }));
  };

  const handleSave = (postId) => {
    if (!currentUser) return;
    setPosts((prev) => prev.map((post) => {
      if (post.postId !== postId) return post;
      const saved = (post.savedBy || []).includes(currentUser.userId);
      return {
        ...post,
        savedBy: saved ? post.savedBy.filter((id) => id !== currentUser.userId) : [...(post.savedBy || []), currentUser.userId]
      };
    }));
  };

  const handleComment = (postId, text) => {
    if (!currentUser || !text.trim()) return;
    const newComment = { commentId: Date.now(), userId: currentUser.userId, userName: currentUser.name, commentText: text.trim() };
    setPosts((prev) => prev.map((post) => post.postId === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post));
  };

  const handleCreatePost = ({ caption, image, skills }) => {
    if (!currentUser) return;
    const post = {
      postId: Date.now(),
      userId: currentUser.userId,
      caption,
      image,
      skills,
      likes: 0,
      likedBy: [],
      savedBy: [],
      comments: []
    };
    setPosts((prev) => [post, ...prev]);
    setPage("home");
  };

  const handleFollow = (userId) => {
    if (!currentUser || currentUser.userId === userId) return;
    setUsers((prev) => prev.map((u) => {
      if (u.userId !== userId) return u;
      const willFollow = !u.isFollowing;
      return { ...u, isFollowing: willFollow, followers: Math.max(0, (u.followers || 0) + (willFollow ? 1 : -1)) };
    }));
  };

  // Check signup first so logged-out users can navigate here
  if (page === "signup") {
    return <Signup onSignup={handleSignup} onNavigate={handleNavigate} />;
  }

  // Then check login
  if (!currentUserId || page === "login") {
    return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  return (
    <>
      <Navbar
        currentUser={currentUser}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <div className="app-layout">
        <Sidebar page={page} users={users} currentUser={currentUser} onNavigate={handleNavigate} />
        <main className="main-content">
          {page === "home" && <Home posts={posts} users={users} currentUser={currentUser} onLike={handleLike} onSave={handleSave} onComment={handleComment} onNavigate={handleNavigate} />}
          {page === "explore" && <Explore posts={posts} users={users} currentUser={currentUser} onLike={handleLike} onSave={handleSave} onComment={handleComment} onNavigate={handleNavigate} />}
          {page === "create" && <CreatePost onCreatePost={handleCreatePost} />}
          {page === "saved" && <Saved posts={posts} users={users} currentUser={currentUser} onLike={handleLike} onSave={handleSave} onComment={handleComment} onNavigate={handleNavigate} />}
          {page === "profile" && <Profile users={users} posts={posts} viewingUserId={viewingUserId || currentUser.userId} currentUser={currentUser} onFollow={handleFollow} onLike={handleLike} onSave={handleSave} onComment={handleComment} onNavigate={handleNavigate} />}
        </main>
      </div>
    </>
  );
}