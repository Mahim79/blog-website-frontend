"use client";
import { useGetAllUsersAdminQuery } from "@/features/api/apiSlice";
import React from "react";
import UserCard from "./UserCard";

export default function AllUserDetails() {
  const { data, isLoading, error } = useGetAllUsersAdminQuery();
  const allUsers = data?.data;
  console.log(allUsers);

  return (
    <div className=" flex flex-col items-center">
      {allUsers?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
