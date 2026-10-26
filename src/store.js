import { configureStore, createSlice } from '@reduxjs/toolkit';
import { initialPosts } from './posts';

const getValidPosts = () => {
  try {
    const item = localStorage.getItem("skillsphere_redux_posts");
    if (!item) return initialPosts;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPosts;
  } catch {
    return initialPosts;
  }
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: getValidPosts(),
  },
  reducers: {
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(p => p.postId === postId);
      if (post) {
        const liked = (post.likedBy || []).includes(userId);
        post.likedBy = liked 
          ? post.likedBy.filter(id => id !== userId) 
          : [...(post.likedBy || []), userId];
        post.likes = liked ? Math.max(0, (post.likes || 0) - 1) : (post.likes || 0) + 1;
        localStorage.setItem("skillsphere_redux_posts", JSON.stringify(state.posts));
      }
    },
    toggleSave: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(p => p.postId === postId);
      if (post) {
        const saved = (post.savedBy || []).includes(userId);
        post.savedBy = saved 
          ? post.savedBy.filter(id => id !== userId) 
          : [...(post.savedBy || []), userId];
        localStorage.setItem("skillsphere_redux_posts", JSON.stringify(state.posts));
      }
    },
    addComment: (state, action) => {
      const { postId, userId, userName, commentText } = action.payload;
      const post = state.posts.find(p => p.postId === postId);
      if (post && commentText.trim()) {
        const newComment = { commentId: Date.now(), userId, userName, commentText: commentText.trim() };
        post.comments = [...(post.comments || []), newComment];
        localStorage.setItem("skillsphere_redux_posts", JSON.stringify(state.posts));
      }
    },
    createPost: (state, action) => {
      const newPost = action.payload;
      state.posts = [newPost, ...state.posts];
      localStorage.setItem("skillsphere_redux_posts", JSON.stringify(state.posts));
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(p => p.postId !== postId);
      localStorage.setItem("skillsphere_redux_posts", JSON.stringify(state.posts));
    }
  }
});

export const { toggleLike, toggleSave, addComment, createPost, deletePost } = postsSlice.actions;

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});