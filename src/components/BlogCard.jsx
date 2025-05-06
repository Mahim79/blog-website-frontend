"use client";
import { useGetUserQuery } from "@/features/api/apiSlice";
import { publishDate } from "@/utils/PublishDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

const BlogCard = ({ blog }) => {
  const { data: author } = useGetUserQuery(blog?.author);
  const [modelOpen, setModelOpen] = useState(false);
  console.log(modelOpen);
  const publishedAgo = publishDate(blog?.createdAt)

  console.log(author);
  

  return (
    <div onClick={() => setModelOpen(false)}>
      <div className="flex items-center relative justify-center gap-2 m-5 ">
        {/* cover image  */}
        <Link href={`/blogs/${blog._id}`} className="flex-1">
          <Image
            src={blog?.image}
            alt="cover"
            width={200}
            height={200}
            className="w-72 h-36 rounded-md"
          />
        </Link>

        <div className="flex-1">
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="badge">{blog.category}</span>
            <Link
              href={`/blogs/${blog._id}`}
              className="font-semibold hover:underline"
            >
              {blog.title}
            </Link>

            {/* author  */}
            <Link
              href={`/user/${blog?.author}`}
              className=" flex justify-center items-center gap-1"
            >
              <Image
                src={author?.profilePicture}
                alt="author"
                width={100}
                height={100}
                className="w-5 h-5 rounded-full bg-black overflow-hidden"
              />
              <p className="text-sm hover:underline">{author?.username} </p>
            </Link>
            <p className="flex items-center gap-2 text-sm">
              <IoIosTimer className="text-teal" /> {publishedAgo}
            </p>
          </div>
        </div>
        <FaEllipsisV
          className="text-teal place-self-start cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setModelOpen(!modelOpen);
          }}
        />
        {modelOpen && (
          <div className="flex flex-col border absolute top-5 right-5 rounded-md bg-slate-100">
            <button className="btn bg-slate-100 text-black hover:bg-slate-300">
              Edit
            </button>
            <button className="btn bg-slate-100 text-black hover:bg-slate-300">
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="mx-5 text-sm -mt-5 mb-5 text-justify line-clamp-2">
        {blog?.summary}
      </p>
    </div>
  );
};

export default BlogCard;
