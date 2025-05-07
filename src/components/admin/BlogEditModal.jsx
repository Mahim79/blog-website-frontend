"use client";
import { useState } from "react";
import Loader from "./../Loader";
import { useUpdateBlogMutation } from "@/features/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImage from "@/features/utils/uploadImage";
import { categoryList } from "./../../features/utils/categoryList";

// Separate image upload logic

export default function BlogEditModal({ blog, onClose, onUpdate }) {
  const [title, setTitle] = useState(blog.title || "");

  const [content, setContent] = useState(blog.content || "");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState(blog.tags || []);
  const [isDeleted, setIsDeleted] = useState(blog.isDeleted || false);
  const [loading, setLoading] = useState(false);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [category, setCategory] = useState(blog.category || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = blog.image;

    try {
      if (image) {
        imageUrl = await uploadImage(image);
        toast.success("Image uploaded successfully");
      }

      const updated = await updateBlog({
        id: blog._id,
        title,
        category,
        content,
        image: imageUrl,
        tags,
        isDeleted,
      }).unwrap();

      toast.success("Blog updated successfully!");
      onClose?.();
      onUpdate?.(updated);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || isUpdating) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <ToastContainer />
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

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded mb-4 w-full"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

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
          <input
            type="text"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((t) => t.trim()))
            }
            placeholder="Tags (comma separated)"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
              className="mr-2"
            />
            Soft Delete
          </label>
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
              disabled={loading || isUpdating}
              className="bg-teal text-white px-4 py-2 rounded"
            >
              {loading || isUpdating ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
