import { useGetUserQuery } from "@/features/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestBlogCard = ({ blog }) => {
  //Particular user Api call 
  const { data: user } = useGetUserQuery(blog.userID);
  
  return (
    <div>
      <div className="w-72 h-[305px] sm:w-96 mx-auto m-5 relative rounded-lg overflow-hidden">
        <span className="bg-teal text-white px-2 rounded-xl">
          {blog.category}
        </span>
        <Link
          href={`blogs/${blog.blogId}`}
          className="font-semibold hover:underline block text-lg"
        >
          {blog.title}
        </Link>
        <Image
          src={blog?.image}
          width={200}
          height={200}
          alt="cover"
          className="w-full h-44 rounded-lg border-b"
        />

        <div className=" pt-1 w-full flex justify-center gap-1">
          <Link
            href={"/user"}
            className=" flex justify-center items-center gap-1"
          >
            <Image
              src={user?.image}
              alt="author"
              width={100}
              height={100}
              className="w-5 h-5 rounded-full bg-black overflow-hidden"
            />
            <p className="text-sm hover:underline">{user?.name} </p>
          </Link>
          <p>| 30 min ago</p>
        </div>
        <p className=" text-justify text-sm p-2 line-clamp-2">{blog.body}</p>
      </div>
    </div>
  );
};

export default LatestBlogCard;
