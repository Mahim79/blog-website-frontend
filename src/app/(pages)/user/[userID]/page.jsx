"use client";
import BlogCard from "@/components/BlogCard";
import CreateBlog from "@/components/CreateBlog";
import { useGetBlogsQuery, useGetUserQuery } from "@/features/api/apiSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const UserID = () => {
  const { userID } = useParams();
<<<<<<< HEAD
  const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(userID);
  const { data: blogs } = useGetBlogsQuery({ userID });
  const [createBlog, setCreateBlog] = useState(false);
=======
  
  const { data: user } = useGetUserQuery(userID);
  const {data:blogs} = useGetBlogsQuery({userID})
>>>>>>> admin-panel

  return isLoading ? (
    <h2 className="min-w-full min-h-[70vh] flex items-center justify-center">
      Loading.....
    </h2>
  ) : isError ? (
    <h2 className="min-w-full min-h-[70vh] flex items-center justify-center">
      User Not Found
    </h2>
  ) : (
    <div>
      <div>
        <Image
          src={user?.profilePicture}
          alt="Profile"
          width={200}
          height={200}
          className={`w-24 h-24 rounded-full mx-auto mt-10`}
        />
        <h2 className="text-center text-2xl font-bold my-2">{`${user?.firstName} ${user?.lastName}`}</h2>
        <div className="flex items-center justify-center gap-3">
          <a target="_blank" href={"https://www.facebook.com"}>
            <AiFillFacebook className="text-3xl text-blue-600 cursor-pointer" />
          </a>
          <a target="_blank" href={"https://www.instagram.com"}>
            <AiFillInstagram className="text-3xl text-rose-800 cursor-pointer" />
          </a>
          <a target="_blank" href={"https://www.linkedin.com"}>
            <AiFillLinkedin className="text-3xl text-sky-700 cursor-pointer" />
          </a>
        </div>
        <button
          className={`btn ${
            createBlog ? "bg-red-600" : "bg-teal"
          } block mx-auto my-5`}
          onClick={() => setCreateBlog(!createBlog)}
        >
          {createBlog ? "Discard" : "Create Blog"}
        </button>
      </div>
      {/* Create blog form  */}
      {createBlog && (
        <div>
          <CreateBlog author={user?._id} />
        </div>
      )}
      {/* all blogs */}
      {blogs && <div>
        <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
          {user?.lastName}'s Blogs
        </h2>
      </div>}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
        {blogs?.data?.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default UserID;
