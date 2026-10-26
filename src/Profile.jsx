import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import Post from "./Post";
import { useApp } from "./context/AppContext";
import { useZustandStore } from "./store/useZustandStore";

export default function Profile() {
  const { userId } = useParams();
  const posts = useZustandStore((state) => state.posts);
  const { users, currentUser, handleFollow } = useApp();

  const profileUser = users.find((u) => u.userId === userId) || currentUser;
  const userPosts = posts.filter((p) => p.userId === profileUser?.userId);
  const isMe = currentUser?.userId === profileUser?.userId;

  if (!profileUser) {
    return <div className="card" style={{ padding: 30, textAlign: "center" }}>User not found.</div>;
  }

  return (
    <div>
      <div className="card" style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
        <Avatar name={profileUser.name} size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "20px" }}>{profileUser.name}</h2>
              <div style={{ color: "#64748b", fontSize: "13px" }}>@{profileUser.username}</div>
            </div>
            {!isMe && (
              <button
                className="btn"
                style={{ background: profileUser.isFollowing ? "#c8d3cc" : "#10b981", color: profileUser.isFollowing ? "#1e2922" : "#fff" }}
                onClick={() => handleFollow(profileUser.userId)}
              >
                {profileUser.isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          <p style={{ margin: "8px 0", fontSize: "14px" }}>{profileUser.bio}</p>
          <div style={{ fontSize: "12px", color: "#64748b" }}>{profileUser.college}</div>

          <div style={{ display: "flex", gap: "16px", margin: "10px 0", fontSize: "13px" }}>
            <span><strong>{userPosts.length}</strong> posts</span>
            <span><strong>{profileUser.followers || 0}</strong> followers</span>
            <span><strong>{profileUser.following || 0}</strong> following</span>
          </div>

          <div>
            {profileUser.skills?.map((s) => (
              <span key={s} className="badge">#{s}</span>
            ))}
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Posts by {profileUser.name}</h3>
      {userPosts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", color: "#64748b" }}>No posts yet.</div>
      ) : (
        userPosts.map((post) => (
          <Post key={post.postId} post={post} author={profileUser} />
        ))
      )}
    </div>
  );
}