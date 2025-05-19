import { useGetUserQuery } from "@/features/api/apiSlice";
import { publishDate } from "@/utils/PublishDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestBlogCard = ({ blog }) => {
  //Particular user Api call
  const { data: user } = useGetUserQuery(blog.author);

  const publishedAgo = publishDate(blog.createdAt);

  return (
    <div>
      <div className="w-72 h-[305px] sm:w-96 mx-auto m-5 relative rounded-lg overflow-hidden">
        <span className="badge">{blog.category}</span>

        {/* title  */}
        <Link
          href={`blogs/${blog._id}`}
          className="font-semibold hover:underline block text-lg"
        >
          {blog.title}
        </Link>
        <Link href={`blogs/${blog._id}`}>
          <Image
            src={blog?.image}
            width={200}
            height={200}
            alt="cover"
            priority={false}
            className="w-full h-44 rounded-lg border-b"
          />
        </Link>
        <div className=" pt-1 w-full flex justify-center gap-1">
          {/* go to user profile  */}
          <Link
            href={`/user/${blog.author}`}
            className=" flex justify-center items-center gap-1"
          >
            {/* profile Image  */}
            <Image
              src={user?.profilePicture || "/images/user.png"}
              alt="author"
              width={100}
              height={100}
              className="w-5 h-5 rounded-full bg-black overflow-hidden"
            />
            <p className="text-sm hover:underline">{user?.username} </p>
          </Link>
          <p>| {publishedAgo}</p>
        </div>

        {/* Description  */}
        <p className=" text-justify text-sm p-2 line-clamp-2">
          {blog?.summary}
        </p>
      </div>
    </div>
  );
};

export default LatestBlogCard;
