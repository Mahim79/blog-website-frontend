"use client";

import Link from "next/link";
import { useGetUserQuery } from "@/features/api/apiSlice";

export default function BlogItem({ blog }) {
  const { data: author } = useGetUserQuery(blog.author);
  //   console.log(author);
  console.log(blog);

  return (
    <li
      key={blog._id}
      className="p-4 border-b border-gray-300 hover:border-black hover:border md:flex md:gap-8 md:items-center"
    >
      {author && (
        <Link href={`/user/${author._id}`}>
          <div className="flex items-center gap-2 mb-2 min-w-44">
            <img
              src={author.profilePicture}
              alt={author.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="text-lg font-semibold hover:underline">
              {author.username}
            </div>
          </div>
        </Link>
      )}
      <Link href={`/admin/blogs/${blog._id}`}>
        <div className="block">
          <div className="hover:underline">{blog.title}</div>
        </div>
        <div className="text-gray-500 text-sm">{blog.category}</div>
        <div className="text-gray-500 text-sm">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </Link>
      {blog.isDeleted && <div className="text-red-500">[Deleted]</div>}
    </li>
  );
}
