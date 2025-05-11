"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import BlogItem from "@/components/admin/BlogItem";
import BlogCard from "@/components/BlogCard";
const { useGetBlogsAdminQuery } = require("@/features/api/apiSlice");

export default function BlogPage() {
  // const [page, setPage] = useState(1);
  // const [limit] = useState(5);

  const { data, error, isLoading } = useGetBlogsAdminQuery();
  // console.log(data);
  const blogs =data?.data
  // const [blogs, setBlogs] = useState(null);
  // useEffect(() => {
  //   setBlogs(data?.data);
  // }, [data]);

  if (isLoading) return <Loader />;
  // console.log(blogs);
  if (error)
    return (
      <div className="text-red-600 text-center mt-4">
        Error: {error?.data?.message || error.error || "Unknown error"}
      </div>
    );

  if (!data) return <div className="text-center mt-4">No data found</div>;

  return (
    <div>
      <div className="bg-teal text-white p-4 text-center">
        <h1 className="text-2xl font-bold">ALL BLOGS</h1>
      </div>

      <div className="flex flex-col w-3/4 mx-auto mt-4 text-center bg-white shadow-lg rounded-lg">
        <ul className="flex flex-col gap-2">
          { <BlogItem blogs={blogs}/>}
        </ul>

        {/* <div className="flex justify-between mt-4 px-4">
          <button
            className="bg-teal text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </span>
          <button
            className="bg-teal text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === data.pagination.totalPages}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
