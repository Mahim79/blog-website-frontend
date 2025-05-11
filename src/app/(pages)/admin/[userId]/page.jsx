import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-teal text-white p-4 text-center">
        <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
      </div>

      <ul className="flex flex-col w-3/4 mx-auto mt-4 text-center  bg-white shadow-lg rounded-lg">
        <li className="p-4 border-b border-gray-300 hover:border-black hover:border">
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li className="p-4 border-b border-gray-300 hover:border-black hover:border">
          <Link href="/admin/blogs"> Manage Blogs</Link>
        </li>
        {/* <li className="p-4 border-b border-gray-300 hover:border-black hover:border">
          <a href="/admin/comments">Comments</a>
        </li> */}
        <li className="p-4 border-b border-gray-300 hover:border-black hover:border">
          <Link href="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
