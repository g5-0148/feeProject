import React from "react";
import Post from "./Post";

export default function Home({ posts, users, currentUser, onLike, onSave, onComment, onNavigate }) {
  const getUser = (id) => users.find((u) => u.userId === id);

  return (
    <div>
      <div className="card" style={{ padding: "18px 20px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Developer Feed</h2>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
          Discover the latest student projects, skill badges, and updates.
        </p>
      </div>

      {posts.map((post) => (
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
      ))}
    </div>
  );
}