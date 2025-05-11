"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogItem({ blogs }) {
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs || []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = blogs?.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerSearch) ||
          blog.author?.username?.toLowerCase().includes(lowerSearch)
      );
      setFilteredBlogs(filtered);
    }
  }, [search, blogs]);

  return (
    <div className="">
      {/* Search Input */}
      <div className="flex justify-end mb-4 pr-6">
        <div className="w-40">
          <input
            type="text"
            placeholder="Search by title ..."
            className="w-full p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Blog List */}
      {filteredBlogs?.length > 0 ? (
        filteredBlogs.map((blog) => <BlogCard blog={blog} key={blog._id} />)
      ) : (
        <div className="text-gray-500 text-center">No blogs found.</div>
      )}
    </div>
  );
}
