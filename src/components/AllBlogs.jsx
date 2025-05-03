"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { useGetBlogsQuery } from "@/features/api/apiSlice";
import { useSearchParams } from "next/navigation";

const AllBlogs = () => {
  const searceParams = useSearchParams();
  const category = searceParams.get("category");

  const {
    data: blogs,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBlogsQuery(
    { category },
    {
      refetchOnMountOrArgChange: true,
    }
  );

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
      <div className="my-5 mx-auto">
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
    content = blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />);
  }
  return (
    <div>
      <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
        All Blogs
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3">{content}</div>
    </div>
  );
};

export default AllBlogs;
