import React from "react";
import { useGetUserQuery } from "@/features/api/apiSlice";
import Link from "next/link";

export default function AuthorDetails({ author_id }) {
  // console.log(author_id);
  const { data: author } = useGetUserQuery(author_id);
  // console.log(author);
  return (
    <Link href={`/user/${author_id}`}>
      <div className="flex items-center gap-2 mb-2 ">
        <img
          src={author?.profilePicture}
          alt={author?.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="text-lg font-semibold hover:underline">
          {author?.username}
        </div>
      </div>
    </Link>
  );
}
