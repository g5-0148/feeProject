import React, { useState } from "react";
import Avatar from "./Avatar";

const cleanUrl = (url) => {
  if (!url) return "";
  const match = url.match(/\((https?:\/\/[^\s)]+)\)/);
  return match ? match[1] : url.replace(/[\[\]]/g, "").trim();
};

export default function Post({ post, author, currentUser, onLike, onSave, onComment, onNavigate }) {
  const [text, setText] = useState("");
  const liked = (post.likedBy || []).includes(currentUser?.userId);
  const saved = (post.savedBy || []).includes(currentUser?.userId);
  const imageUrl = cleanUrl(post.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onComment(post.postId, text);
    setText("");
  };

  return (
    <article className="card" style={{ marginBottom: "20px", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px" }}>
        <button onClick={() => onNavigate("profile", post.userId)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={author?.name || post.userId} size="md" />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{author?.name || post.userId}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>@{author?.username || post.userId}</div>
          </div>
        </button>
      </div>

      {imageUrl && <img src={imageUrl} alt="Skill update" />}

      {/* Action Row */}
      <div className="post-actions">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button 
            className={`action-btn ${liked ? "liked" : ""}`} 
            onClick={() => onLike(post.postId)} 
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
          onClick={() => onSave(post.postId)} 
          title="Save"
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <div style={{ padding: "0 18px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
          {post.likes || 0} {post.likes === 1 ? "like" : "likes"}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.5 }}>
          <strong>@{author?.username || post.userId}</strong> {post.caption}
        </p>

        {post.skills?.length > 0 && (
          <div style={{ margin: "10px 0" }}>
            {post.skills.map((s) => (
              <span key={s} className="badge">#{s}</span>
            ))}
          </div>
        )}

        {post.comments?.length > 0 && (
          <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 10, paddingTop: 8 }}>
            {post.comments.map((c) => (
              <div key={c.commentId} style={{ fontSize: 13, margin: "4px 0" }}>
                <strong>{c.userName}</strong> {c.commentText}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="comment-form" style={{ marginTop: 10 }}>
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
  );
}