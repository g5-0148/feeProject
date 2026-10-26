import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import { useZustandStore } from "./store/useZustandStore";

export default function CreatePost() {
  const { currentUser } = useApp();
  const { createPost } = useZustandStore();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [skillsStr, setSkillsStr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const skills = skillsStr
      .split(",")
      .map((s) => s.trim().replace(/^#/, ""))
      .filter(Boolean);

    const newPost = {
      postId: Date.now(),
      userId: currentUser.userId,
      caption: caption.trim(),
      image: image.trim(),
      skills,
      likes: 0,
      likedBy: [],
      savedBy: [],
      comments: [],
    };

    createPost(newPost);
    navigate("/");
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Create New Developer Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Caption / Update</label>
          <textarea
            required
            rows={4}
            placeholder="What are you building or learning today?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Image URL (Unsplash or direct link)</label>
          <input
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Skills / Tags (comma separated)</label>
          <input
            placeholder="React, JavaScript, UI/UX"
            value={skillsStr}
            onChange={(e) => setSkillsStr(e.target.value)}
          />
        </div>

        <button type="submit" className="btn" style={{ width: "100%", padding: "12px" }}>
          Publish Post →
        </button>
      </form>
    </div>
  );
}