"use client";
import BlogEditModal from "@/components/admin/BlogEditModal";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { useState } from "react";
const { useGetBlogQuery } = require("@/features/api/apiSlice");

export default function page() {
  const { blogId } = useParams();
  //   console.log(blogId);
  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useGetBlogQuery(blogId);
  //   console.log(data);
  if (isLoading) return <Loader />;
  if (error)
    return (
      <div>Error: {error?.data?.message || error.error || "Unknown error"}</div>
    );
  if (!data) return <div>No data found</div>;
  const { title, category, createdAt, content, image, author, tags } =
    data?.data;
  //   console.log(image);

  const handleUpdate = (updatedBlogData) => {
    // handle update logic here (e.g., dispatch API mutation)
    console.log("Updated blog:", updatedBlogData);
    setIsEditing(false);
  };

  return (
    <div>
      <div className=" p-4 text-center">
        <h1 className="text-2xl bg-teal text-white font-bold p-4">
          Blog Details
        </h1>
        <button
          className="bg-teal text-white px-4 py-2 rounded m-4"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel Edit" : "Edit"}
        </button>
        {isEditing && (
          <BlogEditModal
            blog={data.data}
            onClose={() => setIsEditing(false)}
            onUpdate={handleUpdate}
          />
        )}

        <h2 className="text-lg font-semibold">{title}</h2>
        <h3 className="text-sm font-semibold">{category}</h3>
        <h4 className="text-sm font-semibold">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>
        <img src={image} alt={title} className="w-full h-72 object-cover" />
        <div className="text-sm font-semibold p-4">{tags.join(", ")}</div>

        <p>{content}</p>
      </div>
    </div>
  );
}
