"use client";
import {
  useDeleteBlogAdminMutation,
  useDeleteBlogMutation,
  useGetUserQuery,
} from "@/features/api/apiSlice";
import { publishDate } from "@/utils/PublishDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { useDispatch } from "react-redux";
import { openEdit } from "@/features/edit/editSlice";
import { toast } from "react-toastify";
import { useUserDetails } from "@/features/hooks/useUser";
import BlogEditModal from "./admin/BlogEditModal";
import { useRouter } from "next/navigation";
import ConfirmModal from "./CofirmModal";

const BlogCard = ({ blog }) => {
  const [localBlog, setLocalBlog] = useState(blog);
  const { data: author } = useGetUserQuery(localBlog?.author);

  const [modelOpen, setModelOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const publishedAgo = publishDate(localBlog?.createdAt);
  const [deleteBlog] = useDeleteBlogMutation();
  const [deleteBlogAdmin] = useDeleteBlogAdminMutation();
  const [yes, setYes] = useState(false);

  const { userDetails } = useUserDetails();
  const router = useRouter();

  // console.log(author, blog.isDeleted);

  const handleDelete = async (localBlog) => {
    try {
      await deleteBlog(localBlog._id);
      toast.success(`"${localBlog?.title}" is deleted`);
    } catch (err) {
      toast.error(err?.message || "Couldn't delete");
    }
  };
  const handleEdit = () => {
    setEditModal(!editModal);
  };
  const onClose = () => {
    setEditModal(!editModal);
  };
  const onUpdate = async (newBlogDetails) => {
    console.log(newBlogDetails);
    setLocalBlog(newBlogDetails);
  };

  const handleAdminDelete = async (blogId) => {
    try {
      const response = await deleteBlogAdmin(blogId);
      if (response.ok) {
        toast.success(`"${localBlog?.title}" is deleted`);
      }
    } catch (err) {
      toast.error(err?.message || "Couldn't delete");
    }
  };
  return (
    <div onClick={() => setModelOpen(false)}>
      {editModal && (
        <BlogEditModal blog={localBlog} onClose={onClose} onUpdate={onUpdate} />
      )}

      <div className="flex items-center  relative justify-center gap-1 m-2 ">
        {/* cover image  */}
        <Link href={`/blogs/${localBlog?._id}`} className="flex-1">
          <div className="object-fit-cover w-72 h-36 rounded-md overflow-hidden">
            <Image
              src={localBlog?.image}
              alt="cover"
              width={200}
              height={200}
              className="w-72 h-36 rounded-md object-cover"
            />
          </div>
        </Link>

        <div className="flex-1">
          <div className="flex flex-col items-start justify-center gap-1">
            <Link
              href={`/blogs/${localBlog?._id}`}
              className="font-semibold hover:underline"
            >
              {localBlog?.title}
            </Link>
            {localBlog.isDeleted && (
              <span className="text-red-400">Blog is Deleted </span>
            )}

            <span className="badge">{localBlog?.category}</span>
            {/* author  */}
            <Link
              href={`/user/${localBlog?.author}`}
              className=" flex justify-center items-center gap-1"
            >
              {author?.profilePicture && (
                <Image
                  src={author?.profilePicture}
                  alt="author"
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded-full object-cover bg-gray-200 overflow-hidden"
                />
              )}
              <p className="text-sm hover:underline">{author?.username} </p>
            </Link>
            <p className="flex items-center gap-2 text-sm">
              <IoIosTimer className="text-teal" /> {publishedAgo}
            </p>
          </div>
        </div>
        {yes && (
          <ConfirmModal
            title="Are you sure?"
            message={`Do you really want to delete "${localBlog.title}"?`}
            onConfirm={() => {
              userDetails.role === "admin"
                ? handleAdminDelete(localBlog._id)
                : handleDelete(localBlog);
              setYes(false);
            }}
            onCancel={() => setYes(false)}
          />
        )}
        {(userDetails?._id === localBlog?.author ||
          userDetails?.role === "admin") && (
          <FaEllipsisV
            className="text-teal place-self-start cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setModelOpen(!modelOpen);
            }}
          />
        )}

        {/* Delete and Edit features */}
        {modelOpen && (
          <div className="flex flex-col border absolute top-5 right-5 rounded-md bg-slate-100">
            <button
              onClick={() => handleEdit()}
              className="btn bg-slate-100 text-black hover:bg-slate-300"
            >
              Edit
            </button>
            <button
              onClick={() => setYes(true)}
              className="btn bg-slate-100 text-black hover:bg-slate-300"
            >
              {userDetails.role === "admin" ? "Hide" : "Delete"}
            </button>
            {userDetails.role === "admin" && (
              <button
                onClick={() => setYes(true)}
                className="btn bg-slate-100 text-black hover:bg-slate-300"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <p className="mx-5 text-sm -mt-5 mb-5 text-justify line-clamp-2">
        {localBlog?.summary}
      </p>
    </div>
  );
};

export default BlogCard;
