"use client";
import BlogCard from "@/components/BlogCard";
import { useGetBlogsQuery, useGetUserQuery } from "@/features/api/apiSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillaedin,
} from "react-icons/ai";

const UserID = () => {
  const { userID } = useParams();
  
  const { data: user } = useGetUserQuery(userID);
  const {data:blogs} = useGetBlogsQuery({userID})

  return (
    <div>
      <div>
        <Image
          src={user?.image}
          width={200}
          height={200}
          className={`w-24 h-24 rounded-full mx-auto mt-10`}
        />
        <h2 className="text-center text-2xl font-bold my-2">{user?.name}</h2>
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
      </div>
      <div>
        <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
          {user?.name}'s Blogs
        </h2>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
        {blogs?.map(blog=> <BlogCard blog={blog}/>)}
      </div>
    </div>
  );
};

export default UserID;
