"use client";

import Link from "next/link";
import AuthorDetails from "./AuthorDetails";

export default function BlogItem({ blog }) {
  //   console.log(author);
  console.log(blog);

  return (
    <li
      key={blog._id}
      className="p-4 border-b border-gray-300 hover:border-black hover:border md:flex md:gap-8 md:items-center"
    >
      <AuthorDetails author_id={blog.author} />

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
