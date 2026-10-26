import React, { createContext, useContext, useState, useEffect } from "react";
import { initialUsers } from "../users";
import { store, toggleLike, toggleSave, addComment, createPost } from "../store";

const AppContext = createContext();

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

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => getValidData("skillsphere_users", initialUsers));
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem("skillsphere_currentUser") || null);
  const [theme, setTheme] = useState(() => localStorage.getItem("skillsphere_theme") || "dark");

  // Async Login Simulation States
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStepMessage, setAuthStepMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("skillsphere_users", JSON.stringify(users));
  }, [users]);

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

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  // Simulated Async Login with progressive status messages
  const loginUser = (identity, onSuccess) => {
    const q = identity.trim().toLowerCase();
    const user = users.find(
      (u) => u.username?.toLowerCase() === q || u.email?.toLowerCase() === q || u.userId?.toLowerCase() === q
    );
    if (!user) return false;

    setIsAuthenticating(true);
    setAuthStepMessage("Verifying user credentials...");

    setTimeout(() => {
      setAuthStepMessage("Loading secure token & local storage...");
      setTimeout(() => {
        setAuthStepMessage("Fetching developer feed & profile...");
        setTimeout(() => {
          setCurrentUserId(user.userId);
          setIsAuthenticating(false);
          setAuthStepMessage("");
          if (onSuccess) onSuccess();
        }, 900);
      }, 800);
    }, 700);

    return true;
  };

  const signupUser = (newUser, onSuccess) => {
    const username = newUser.username.trim().toLowerCase();
    if (users.some((u) => u.username?.toLowerCase() === username || u.email?.toLowerCase() === newUser.email.toLowerCase())) {
      return false;
    }

    setIsAuthenticating(true);
    setAuthStepMessage("Creating your secure account...");

    setTimeout(() => {
      setAuthStepMessage("Setting up developer workspace...");
      setTimeout(() => {
        const user = { ...newUser, username, userId: username, followers: 0, following: 0, isFollowing: false };
        setUsers((prev) => [...prev, user]);
        setCurrentUserId(user.userId);
        setIsAuthenticating(false);
        setAuthStepMessage("");
        if (onSuccess) onSuccess();
      }, 900);
    }, 800);

    return true;
  };

  const logoutUser = () => {
    setCurrentUserId(null);
    localStorage.removeItem("skillsphere_currentUser");
  };

  // Redux action dispatchers
  const handleLike = (postId) => {
    if (!currentUser) return;
    store.dispatch(toggleLike({ postId, userId: currentUser.userId }));
  };

  const handleSave = (postId) => {
    if (!currentUser) return;
    store.dispatch(toggleSave({ postId, userId: currentUser.userId }));
  };

  const handleComment = (postId, text) => {
    if (!currentUser || !text.trim()) return;
    store.dispatch(addComment({ postId, userId: currentUser.userId, userName: currentUser.name, commentText: text }));
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
      comments: [],
    };
    store.dispatch(createPost(post));
  };

  const handleFollow = (userId) => {
    if (!currentUser || currentUser.userId === userId) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.userId !== userId) return u;
        const willFollow = !u.isFollowing;
        return { ...u, isFollowing: willFollow, followers: Math.max(0, (u.followers || 0) + (willFollow ? 1 : -1)) };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        theme,
        isAuthenticating,
        authStepMessage,
        toggleTheme,
        loginUser,
        signupUser,
        logoutUser,
        handleLike,
        handleSave,
        handleComment,
        handleCreatePost,
        handleFollow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}