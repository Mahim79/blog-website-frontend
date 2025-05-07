import React from "react";
import BlogCard from "./BlogCard";
import { useRelatedBlogsQuery } from "@/features/api/apiSlice";

const RelatedBlogs = ({ blog }) => {
  const { data: blogs } = useRelatedBlogsQuery(blog?.category);
  console.log(blogs);
  // const filteredBlogs = blogs?.filter(b => b.id !== blog.id)

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
      {blogs?.data?.map((blog) => (
        <BlogCard key={blog?._id} blog={blog} />
      ))}
    </div>
  );
};
 
export default RelatedBlogs;
