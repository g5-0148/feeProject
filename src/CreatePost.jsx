import React, { useState } from "react";

export default function CreatePost({ onCreatePost }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;
    const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);
    onCreatePost({
      caption: caption.trim(),
      image: image.trim(),
      skills: skillList.length ? skillList : ["Tech"]
    });
  };

  return (
    <div className="card" style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Share an Update</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Caption</label>
          <textarea
            rows="3"
            required
            placeholder="What project or skill are you working on?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Skills / Tags (comma separated)</label>
          <input
            placeholder="React, Java, UI/UX"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", marginTop: 8 }}>
          Publish Post
        </button>
      </form>
    </div>
  );
}