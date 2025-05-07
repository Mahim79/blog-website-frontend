"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthorDetails from "@/components/admin/AuthorDetails";
import BlogEditModal from "@/components/admin/BlogEditModal";
import FormattedDate from "@/components/FormattedDate";
import Loader from "@/components/Loader";
import { useGetBlogAdminQuery } from "@/features/api/apiSlice";

export default function Page() {
  const { blogId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, isLoading } = useGetBlogAdminQuery(blogId);
  const blog = data?.data || null;
  const onUpdate = (updated) => {
    window.location.reload();
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error?.data?.message || error.error || "Unknown error"}
      </div>
    );
  if (!blog) return <div className="text-center mt-10">No data found</div>;

  const {
    title,
    category,
    createdAt,
    content,
    image,
    author,
    tags,
    isDeleted,
  } = blog;
  console.log(title);

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-4 text-center bg-white shadow-lg rounded-lg relative">
      <ToastContainer />
      <div className="p-4">
        <h1 className="text-2xl bg-teal text-white font-bold p-4">
          Blog Details
        </h1>
        <button
          className="bg-teal text-white px-4 py-2 rounded m-4"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel Edit" : "Edit"}
        </button>

        {isEditing && (
          <BlogEditModal
            blog={blog}
            onUpdate={onUpdate}
            onClose={() => setIsEditing(false)}
          />
        )}

        <h2 className="text-lg font-semibold">{title}</h2>
        {isDeleted && (
          <div className="text-red-500 text-sm font-semibold">
            This blog is deleted
          </div>
        )}
        <h3 className="text-sm font-semibold uppercase">{category}</h3>
        <FormattedDate createdAt={createdAt} />

        <div className="absolute top-16 mt-4 mb-4">
          <AuthorDetails author_id={author} />
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover rounded"
        />
        <div className="text-sm font-semibold p-4">{tags?.join(", ")}</div>

        <p className="p-4">{content}</p>
      </div>
    </div>
  );
}
