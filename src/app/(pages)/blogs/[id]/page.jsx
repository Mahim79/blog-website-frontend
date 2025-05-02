"use client";
import CommentBox from "@/components/CommentBox";
import RelatedBlogs from "@/components/RelatedBlogs";
import { useGetBlogQuery, useGetUserQuery } from "@/features/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

const BlogDetails = () => {
  const [like, setLike] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const { id } = useParams();
  const { data: blog } = useGetBlogQuery(id);
  const { data: author } = useGetUserQuery(blog?.userID);

  return (
    <div>
      <div className="mx-auto w-[320px]  sm:w-4/5 p-5">
        <h2 className="text-3xl font-bold mb-5">{blog?.title}</h2>
        <Image
          src={blog?.image}
          width={400}
          height={400}
          alt={"Cover"}
          className="w-full h-44 sm:h-72 md:h-screen rounded-md "
        />

        <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
          {/* Like, comment button */}
          <div className="flex items-end gap-6">
            <div className="flex items-center ">
              {like ? (
                <AiFillLike
                  onClick={() => setLike(!like)}
                  className="text-3xl m-3 cursor-pointer text-teal"
                />
              ) : (
                <AiOutlineLike
                  onClick={() => setLike(!like)}
                  className="text-3xl m-3 cursor-pointer"
                />
              )}
              <span className="text-lg">15</span>
            </div>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => setCommentBox(!commentBox)}
            >
              <FaRegCommentAlt className="text-2xl m-3 " />
              <span className="text-lg hover:underline">5</span>
            </div>
          </div>

          {/* Author  */}
          <Link
            href={`/user/${blog?.userID}`}
            className="flex items-center gap-2 self-center"
          >
            <Image
              src={author?.image}
              width={50}
              height={50}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <Link href={`/user/${blog?.userID}`} className="hover:underline">
              {author?.name}
            </Link>
          </Link>

          {/* Publish Time  */}
          <div className="flex items-center gap-2 self-center">
            <IoIosTimer className="text-teal" />
            <p>Publish Time</p>
          </div>
        </div>

        {/* comment box */}
        <div>{commentBox && <CommentBox />}</div>

        <div className="">{blog?.body}</div>
      </div>
      <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
        Related Blogs
      </h2>
      <RelatedBlogs blog={blog} />
    </div>
  );
};

export default BlogDetails;
