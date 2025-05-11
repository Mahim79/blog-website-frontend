"use client";
import { useEffect, useState } from "react";
import Loader from "./../Loader";
import { useEditBlogMutation } from "@/features/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImage from "@/features/utils/uploadImage";
import { categoryList } from "./../../features/utils/categoryList";
import { useUserDetails } from "./../../features/hooks/useUser";
import { useRouter } from "next/navigation";

// Separate image upload logic

export default function BlogEditModal({ blog, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    image: "",
  });

  const { userDetails } = useUserDetails();
  const router = useRouter();
  const [updateBlog, { isLoading: isUpdating }] = useEditBlogMutation();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        category: blog.category || "",
        content: blog.content || "",
        tags: blog.tags?.join(", ") || "",
        image: blog.image || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;
      if (formData.image instanceof File) {
        imageUrl = await uploadImage(formData.image);
      }

      const updatedBlog = {
        ...blog,
        title: formData.title,
        category: formData.category,
        content: formData.content,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        image: imageUrl,
      };
      console.log(updatedBlog);

      const response = await updateBlog({
        id: blog._id,
        data: updatedBlog,
      }).unwrap();
      console.log(response);
      if (!response) {
       toast.error("Update Fail")
      }
       toast.success("Blog updated!");
        onUpdate(response.blog);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "An unexpected error occurred.");
    }
  };

  if (isUpdating) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Blog</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded mb-4 w-full"
            required
          />

          <select
            value={formData.category}
            name="category"
            onChange={handleChange}
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
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="border border-gray-300 p-2 rounded mb-4 w-full h-32"
            required
          />
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
            }
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.tags}
            onChange={handleChange}
            name="tags"
            placeholder="Tags (comma separated)"
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
              disabled={isUpdating}
              className="bg-teal text-white px-4 py-2 rounded"
            >
              {isUpdating ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
