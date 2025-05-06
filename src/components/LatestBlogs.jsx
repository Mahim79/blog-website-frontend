"use client";
import React from "react";
import { useGetBlogsQuery } from "@/features/api/apiSlice";
import LatestBlogCard from "./LatestBlogCard";

const LatestBlog = () => {
  // Blogs api call
  const {
    data: popularBlogs,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetBlogsQuery(
    { popular: true },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const blogs = popularBlogs?.data;
  console.log(blogs);

  // Conditionally Rendered
  let content;
  if (isLoading) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10 text-3xl text-center">Loading Blogs....</h2>
      </div>
    );
  }
  if (isError) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10 text-3xl text-center">
          {error?.message || "Something went wrong"}
        </h2>
      </div>
    );
  }
  if (isSuccess && blogs?.length === 0) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10 text-3xl text-center font-semibold">
          There are no blog
        </h2>
      </div>
    );
  }
  if (blogs?.length > 0) {
    content = blogs?.map((blog) => (
      <LatestBlogCard key={blog._id} blog={blog.blog} />
    ));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  flex-wrap md:items-center  justify-center lg:justify-around gap-4 px-5  ">
      {content}
    </div>
  );
};

export default LatestBlog;
