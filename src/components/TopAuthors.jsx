"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetUsersQuery } from "@/features/api/apiSlice";

// User's Api call
const TopAuthors = () => {
  const {
    data: allUsers,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetUsersQuery();

  const authors = allUsers?.data

  console.log(authors);
  

  // Conditionally Rendered
  let content;
  if (isLoading) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10">Loading Authors....</h2>
      </div>
    );
  }
  if (isError) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10">
          {error?.message || "Something went wrong"}
        </h2>
      </div>
    );
  }
  if (isSuccess && authors?.length === 0) {
    content = (
      <div className="my-5">
        <h2 className=" mx-5 mt-10">There are no author</h2>
      </div>
    );
  }
  // Data push in content
  if (authors?.length > 0) {
    content = (
      <div className="my-5">
        <h2 className="font-bold mx-5 md:mt-10 text-xl underline underline-offset-4 lg:text-center decoration-teal">
          Top Authors
        </h2>
        <div className="px-4 py-2 w-full max-h-96 mt-5 rounded-md bg-slate-100 overflow-auto flex md:flex-col gap-4 items-center md:items-start justify-start">
          {authors?.map((author) => (
            <Link href={`/user/${author?.author?._id}`}
              key={author.id}
              className="flex mb-2 md:flex-row gap-2 flex-col justify-center w-max items-center"
            >
              <Image
                src={author?.author?.profilePicture}
                alt="profile"
                width={100}
                height={100}
                className="w-5 h-5 rounded-full bg-black overflow-hidden"
              />
              <Link
                href={`/user/${author?.author?._id}`}
                className="text-sm text-nowrap font-semibold hover:underline"
              >
                {author?.author?.username}
              </Link>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default TopAuthors;
