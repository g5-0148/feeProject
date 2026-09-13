export const initialPosts = [
  {
    postId: 101,
    userId: "siya",
    caption: "Built a responsive portfolio dashboard using React and CSS Grid! Clean code and simple UI.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    skills: ["React", "JavaScript"],
    likes: 5,
    likedBy: [],
    savedBy: [],
    comments: [
      {
        commentId: 1,
        userId: "ruchika",
        userName: "Ruchika",
        commentText: "Great UI design! Very clean."
      }
    ]
  },
  {
    postId: 102,
    userId: "ruchika",
    caption: "Working on a new UI system today. Learning more about responsive layouts and tokenized themes!",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
    skills: ["UI/UX", "CSS", "Responsive Design"],
    likes: 8,
    likedBy: [],
    savedBy: [],
    comments: []
  },
  {
    postId: 103,
    userId: "prachi",
    caption: "Finally finished my database indexing practice project. Time to build a query visualizer!",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    skills: ["Python", "DBMS", "MySQL"],
    likes: 12,
    likedBy: [],
    savedBy: [],
    comments: []
  }
];