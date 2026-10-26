import { create } from 'zustand';
import { initialPosts } from '../posts';

const getValidPosts = () => {
  try {
    const item = localStorage.getItem("skillsphere_zustand_posts");
    if (!item) return initialPosts;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPosts;
  } catch {
    return initialPosts;
  }
};

export const useZustandStore = create((set, get) => ({
  posts: getValidPosts(),
  activeFilter: "All",
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  toggleLike: (postId, userId) => {
    const updated = get().posts.map((post) => {
      if (post.postId === postId) {
        const liked = (post.likedBy || []).includes(userId);
        const likedBy = liked 
          ? post.likedBy.filter(id => id !== userId) 
          : [...(post.likedBy || []), userId];
        const likes = liked ? Math.max(0, (post.likes || 0) - 1) : (post.likes || 0) + 1;
        return { ...post, likedBy, likes };
      }
      return post;
    });
    localStorage.setItem("skillsphere_zustand_posts", JSON.stringify(updated));
    set({ posts: updated });
  },

  toggleSave: (postId, userId) => {
    const updated = get().posts.map((post) => {
      if (post.postId === postId) {
        const saved = (post.savedBy || []).includes(userId);
        const savedBy = saved 
          ? post.savedBy.filter(id => id !== userId) 
          : [...(post.savedBy || []), userId];
        return { ...post, savedBy };
      }
      return post;
    });
    localStorage.setItem("skillsphere_zustand_posts", JSON.stringify(updated));
    set({ posts: updated });
  },

  addComment: (postId, userId, userName, commentText) => {
    if (!commentText.trim()) return;
    const updated = get().posts.map((post) => {
      if (post.postId === postId) {
        const newComment = { commentId: Date.now(), userId, userName, commentText: commentText.trim() };
        return { ...post, comments: [...(post.comments || []), newComment] };
      }
      return post;
    });
    localStorage.setItem("skillsphere_zustand_posts", JSON.stringify(updated));
    set({ posts: updated });
  },

  createPost: (newPostData) => {
    const updated = [newPostData, ...get().posts];
    localStorage.setItem("skillsphere_zustand_posts", JSON.stringify(updated));
    set({ posts: updated });
  },

  deletePost: (postId) => {
    const updated = get().posts.filter((p) => p.postId !== postId);
    localStorage.setItem("skillsphere_zustand_posts", JSON.stringify(updated));
    set({ posts: updated });
  }
}));