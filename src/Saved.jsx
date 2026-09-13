import React from "react";
import Post from "./Post";

export default function Saved({ posts, users, currentUser, onLike, onSave, onComment, onNavigate }) {
  const saved = posts.filter((p) => p.savedBy?.includes(currentUser?.userId));
  const getUser = (id) => users.find((u) => u.userId === id);

  return (
    <div>
      <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Saved Posts</h2>
      {saved.length === 0 ? (
        <div className="card" style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
          No saved posts yet. Click the star icon on any post to bookmark it.
        </div>
      ) : (
        saved.map((post) => (
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