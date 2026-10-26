import React from "react";
import Post from "./Post";
import { useApp } from "./context/AppContext";
import { useZustandStore } from "./store/useZustandStore";

export default function Saved() {
  const posts = useZustandStore((state) => state.posts);
  const { users, currentUser } = useApp();
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
          <Post key={post.postId} post={post} author={getUser(post.userId)} />
        ))
      )}
    </div>
  );
}