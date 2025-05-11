import React from "react";
import { useGetUserQuery } from "@/features/api/apiSlice";
import Link from "next/link";
import Image from "next/image";

export default function AuthorDetails({ author_id }) {
  console.log(author_id);
  const { data: author, isLoading, error } = useGetUserQuery(author_id);

  if (isLoading) return <div>Loading author...</div>;
  if (error || !author) return <div>Author not found</div>;

  const { profilePicture, firstName, username } = author;

  return (
    <Link href={`/user/${author_id}`}>
      <div className="flex items-center gap-2 mb-2 ">
        <Image
          src={profilePicture}
          alt={firstName || "Author"}
          width={100}
          height={100}
          className="w-10 h-10 rounded-full"
        />
        <div className="text-lg font-semibold hover:underline">
          {username || "Unknown"}
        </div>
      </div>
    </Link>
  );
}
