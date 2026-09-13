import React, { useState } from "react";
import Post from "./Post";

const SKILLS = ["All", "React", "Java", "DBMS", "Python", "UI/UX", "CSS", "JavaScript"];

export default function Explore({ posts, users, currentUser, onLike, onSave, onComment, onNavigate }) {
  const [activeSkill, setActiveSkill] = useState("All");
  const getUser = (id) => users.find((u) => u.userId === id);

  const filtered = activeSkill === "All"
    ? posts
    : posts.filter((p) => p.skills?.includes(activeSkill));

  return (
    <div>
      <div className="filters">
        {SKILLS.map((s) => (
          <button
            key={s}
            className={`chip ${activeSkill === s ? "active" : ""}`}
            onClick={() => setActiveSkill(s)}
          >
            {s === "All" ? "All Skills" : `#${s}`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
          No posts found for #{activeSkill}
        </div>
      ) : (
        filtered.map((post) => (
          <Post
            key={post.postId}
            post={post}
            author={getUser(post.userId)}
            currentUser={currentUser}
            onLike={onLike}
            onSave={onSave}
            onComment={onComment}
            onNavigate={onNavigate}
          />
        ))
      )}
    </div>
  );
}