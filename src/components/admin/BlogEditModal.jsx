"use client";
import React, { useState } from "react";

export default function BlogEditModal({ blog, onClose, onUpdate }) {
  const [title, setTitle] = useState(blog.title || "");
  const [category, setCategory] = useState(blog.category || "");
  const [content, setContent] = useState(blog.content || "");
  const [image, setImage] = useState(null); // File upload
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`https://your-api.com/blogs/${blog._id}`, {
        method: "PUT",
        body: formData,
        headers: {
  
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        onUpdate?.(data); 
        onClose?.(); 
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Blog</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="border border-gray-300 p-2 rounded mb-4 w-full h-32"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-teal text-white px-4 py-2 rounded"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
