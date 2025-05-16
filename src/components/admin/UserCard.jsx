import React from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";

export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all mb-4">
      <div className="w-16 h-16 relative rounded-full overflow-hidden border border-teal-600">
        <Image
          src={user.profilePicture || "/default-avatar.png"} // fallback image
          alt={`${user.name}'s profile`}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{user.username}</h2>
        <h4 className="text-sm text-gray-600">{user.email}</h4>
      </div>
      <FaEllipsisV
        
      />

    </div>
  );
}
