"use client"
import { useGetUserQuery } from "@/features/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosTimer } from "react-icons/io";

const BlogCard = ({ blog }) => {
  const { data: author } = useGetUserQuery(blog.userID);
  return (
    <div>
      <div className="flex items-center justify-center gap-2 m-5 ">
        {/* cover image  */}
        <div className="flex-1">
          <Image
            src={blog?.image}
            alt="cover"
            width={200}
            height={200}
            className="w-72 h-36 rounded-md"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="badge">{blog.category}</span>
            <Link href={blog.blogId} className="font-semibold hover:underline">{blog.title}</Link>
            <Link
              href={"/user"}
              className=" flex justify-center items-center gap-1"
            >
              <Image
                src={author?.image}
                alt="author"
                width={100}
                height={100}
                className="w-5 h-5 rounded-full bg-black overflow-hidden"
              />
              <p className="text-sm hover:underline">{author?.name} </p>
            </Link>
            <p className="flex items-center gap-2 text-sm">
              <IoIosTimer className="text-teal" /> 30 min ago
            </p>
          </div>
        </div>
      </div>
      <p className="mx-5 text-sm -mt-5 mb-5 text-justify truncate-2-lines">
        {blog.body}
      </p>
    </div>
  );
};

export default BlogCard;
