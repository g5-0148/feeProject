import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useApp } from "./context/AppContext";
import { useZustandStore } from "./store/useZustandStore";

const cleanUrl = (url) => {
  if (!url) return "";
  const match = url.match(/\((https?:\/\/[^\s)]+)\)/);
  return match ? match[1] : url.replace(/[\[\]]/g, "").trim();
};

export default function Post({ post, author }) {
  const { currentUser } = useApp();
  const { toggleLike, toggleSave, addComment, deletePost } = useZustandStore();
  
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const liked = (post.likedBy || []).includes(currentUser?.userId);
  const saved = (post.savedBy || []).includes(currentUser?.userId);
  const imageUrl = cleanUrl(post.image);
  const isMyPost = currentUser?.userId === post.userId;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(post.postId, currentUser.userId, currentUser.name, text);
    setText("");
  };

  const authorName = author?.name || post.userId;
  const authorUsername = author?.username || post.userId;

  const handleCopyrightClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.postId);
    }
  };

  return (
    <>
      <article className="card" style={{ marginBottom: "24px", overflow: "hidden", position: "relative" }}>
        {showAlert && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#ef4444",
            color: "#ffffff",
            padding: "12px 18px",
            fontSize: "13px",
            fontWeight: 600,
            textAlign: "center",
            zIndex: 50,
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
          }}>
            🔒 Copyright Notice: This post cannot be copied without permission and proper credit to @{authorUsername}!
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
          <Link to={`/profile/${post.userId}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Avatar name={authorName} size="md" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "inherit" }}>{authorName}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>@{authorUsername}</div>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isMyPost && (
              <button
                onClick={handleDelete}
                title="Delete Post"
                style={{
                  fontSize: "12px",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                🗑 Delete
              </button>
            )}

            <button
              onClick={handleCopyrightClick}
              title="Copyright & Permissions"
              style={{
                fontSize: "11px",
                background: "var(--social-bg, #f1f5f9)",
                color: "#64748b",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              © Copyright
            </button>
          </div>
        </div>

        {imageUrl && <div style={{ padding: "0 20px" }}><img src={imageUrl} alt="Skill update" /></div>}

        <div className="post-actions">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              className={`action-btn ${liked ? "liked" : ""}`}
              onClick={() => toggleLike(post.postId, currentUser?.userId)}
              title="Like"
            >
              {liked ? "♥" : "♡"}
            </button>

            <button
              className="action-btn"
              onClick={() => document.getElementById(`comment-input-${post.postId}`)?.focus()}
              title="Write Comment"
              style={{ fontSize: "18px" }}
            >
              ✎
            </button>
          </div>

          <button
            className={`action-btn ${saved ? "saved" : ""}`}
            onClick={() => toggleSave(post.postId, currentUser?.userId)}
            title="Save"
          >
            {saved ? "★" : "☆"}
          </button>
        </div>

        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#10b981" }}>
            {post.likes || 0} {post.likes === 1 ? "like" : "likes"}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.6 }}>
            <strong style={{ marginRight: 6 }}>@{authorUsername}</strong> {post.caption}
          </p>

          {post.skills?.length > 0 && (
            <div style={{ margin: "12px 0 8px" }}>
              {post.skills.map((s) => (
                <span key={s} className="badge">#{s}</span>
              ))}
            </div>
          )}

          <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "12px", fontStyle: "italic", borderTop: "1px dashed #cbd5e1", paddingTop: "8px" }}>
            🔒 Protected by author copyright. Cannot be copied without permission and proper credit to @{authorUsername}.
          </div>

          {post.comments?.length > 0 && (
            <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 12, paddingTop: 10 }}>
              {post.comments.map((c) => (
                <div key={c.commentId} style={{ fontSize: 13, margin: "6px 0", background: "rgba(0,0,0,0.03)", padding: "8px 12px", borderRadius: "6px" }}>
                  <strong>{c.userName}:</strong> {c.commentText}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="comment-form" style={{ marginTop: 12 }}>
            <input
              id={`comment-input-${post.postId}`}
              placeholder="Add a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn" disabled={!text.trim()}>
              Post
            </button>
          </form>
        </div>
      </article>
    </>
  );
}