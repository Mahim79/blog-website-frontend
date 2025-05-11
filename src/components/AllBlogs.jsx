"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { useGetBlogsQuery } from "@/features/api/apiSlice";
import { useSearchParams } from "next/navigation";
import Loader from "./Loader";

const AllBlogs = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [blogsData, setBlogsData] = useState([]);
  const [search, setSearch] = useState("");

  const {
    data: allBlogs,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBlogsQuery({ category }, { refetchOnMountOrArgChange: true });

  const blogs = allBlogs?.data;

  useEffect(() => {
    if (blogs) {
      setBlogsData(blogs);
    }
  }, [blogs]);

  // Filter blogs by title only
  const filteredBlogs = blogsData?.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())
  );

  let content;
  if (isLoading) {
    content = (
      <div className="my-5">
        <Loader />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="my-5 mx-auto">
        <h2 className="mx-5 mt-10 text-3xl text-center">
          {error?.message || "Something went wrong"}
        </h2>
      </div>
    );
  } else if (filteredBlogs?.length === 0) {
    content = (
      <div className="my-5">
        <h2 className="mx-5 mt-10 text-3xl text-center font-semibold">
          There are no blogs
        </h2>
      </div>
    );
  } else {
    content = filteredBlogs
      ?.filter((blog) => !blog.isDeleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((blog, i) => <BlogCard key={blog._id} blog={blog} />);
  }

  return (
    <div>
      <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
        All Blogs
      </h2>

      <div className="flex justify-end mr-5 mb-5">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-72 p-2 border border-gray-300 rounded shadow-sm focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-1 xl:grid-cols-2">{content}</div>
    </div>
  );
};

export default AllBlogs;
