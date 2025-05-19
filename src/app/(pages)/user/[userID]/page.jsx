"use client";
import BlogCard from "@/components/BlogCard";
import CreateBlog from "@/components/CreateBlog";
import EditForm from "@/components/EditForm";
import Loader from "@/components/Loader";
import UserEditModal from "@/components/UserEditModal";
import {
  useGetBlogByAuthorQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useSuspendUserMutation,
  useDeleteUserMutation,
} from "@/features/api/apiSlice";
import { useUserDetails } from "@/features/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ConfirmModal from "@/components/CofirmModal";

const UserID = () => {
  const { userID } = useParams();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetUserQuery(userID);
  const { data: blogs } = useGetBlogByAuthorQuery(userID);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createBlog, setCreateBlog] = useState(false);
  const isOpen = useSelector((state) => state.edit.isOpen);
  const { userDetails, setUserDetails } = useUserDetails();
  const [modalOpen, setModelOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [yes, setYes] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  // console.log(userDetails);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setModelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = async (updatedUser) => {
    try {
      await updateUser({
        id: userID,
        data: updatedUser,
      }).unwrap();

      toast.success("User updated successfully");

      await refetch();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update user");
    }
  };

  const handleConfirm = async (modalAction) => {
    try {
      if (modalAction === "suspend") {
        await suspendUser({ id: userID }).unwrap();
        await refetch();
        toast.success("User suspended");
      }
      if (modalAction === "delete") {
        await deleteUser(userID).unwrap();
        if (user.role === "admin") {
          toast.success("User deleted");
        } else {
          toast.success("Account Delete Success");
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
      if (modalAction === "logout") {
        localStorage.removeItem("token");
        toast.info("User logged out");
        setUserDetails({});
        router.push("/login");
      }
    } catch (error) {
      console.error(`${modalAction} failed:`, error);
      toast.error(`Failed to ${modalAction} user`);
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2 className="min-w-full min-h-[70vh] flex items-center justify-center">
      User Not Found
    </h2>
  ) : (
    <div>
      {editModalOpen && (
        <UserEditModal
          user={user}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <div className="flex flex-col items-center">
        <Image
          src={user?.profilePicture}
          alt="Profile"
          width={200}
          height={200}
          className={`w-24 h-24 rounded-full mx-auto mt-10`}
        />
        {yes && (
          <ConfirmModal
            title={user?.username}
            message={`Are you sure you want to ${modalAction}?`}
            onConfirm={() => {
              handleConfirm(modalAction);
              setYes(false);
            }}
            onCancel={() => setYes(false)}
          />
        )}
        <div className="flex">
          <h2 className="text-center text-2xl font-bold my-2">{`${user?.firstName} ${user?.lastName}`}</h2>
          <div className="relative" ref={dropdownRef}>
            {user?.status === "approve" &&
              (userDetails?._id === userID ||
                userDetails?.role === "admin") && (
                <FaEllipsisV
                  className="text-teal place-self-start cursor-pointer m-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModelOpen(!modalOpen);
                  }}
                />
              )}

            {modalOpen && (
              <div className="flex flex-col border absolute top-8 right-8 rounded-md bg-slate-100">
                <button
                  onClick={() => setEditModalOpen(!editModalOpen)}
                  className="btn bg-slate-100 text-black hover:bg-slate-300"
                >
                  Edit
                </button>
                {userDetails.role === "admin" && (
                  <button
                    onClick={() => {
                      setModalAction("suspend");
                      setYes(true);
                    }}
                    className="btn bg-slate-100 text-black hover:bg-slate-300"
                  >
                    suspend
                  </button>
                )}

                {userDetails.role === "admin" && (
                  <button
                    onClick={() => {
                      setModalAction("delete");
                      setYes(true);
                    }}
                    className="btn bg-slate-100 text-black hover:bg-slate-300"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => {
                    setModalAction("logout");
                    setYes(true);
                  }}
                  className="btn bg-slate-100 text-black hover:bg-slate-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <h3 className="text-xl">username: {user?.username}</h3>
        <p>{user?.bio}</p>
        {user?.status === "suspend" && (
          <p className="text-red-600">
            account has been suspend please contact admin
          </p>
        )}

        <div className="flex items-center justify-center gap-3">
          <Link target="_blank" href={"https://www.facebook.com"}>
            <AiFillFacebook className="text-3xl text-blue-600 cursor-pointer" />
          </Link>
          <Link target="_blank" href={"https://www.instagram.com"}>
            <AiFillInstagram className="text-3xl text-rose-800 cursor-pointer" />
          </Link>
          <Link target="_blank" href={"https://www.linkedin.com"}>
            <AiFillLinkedin className="text-3xl text-sky-700 cursor-pointer" />
          </Link>
        </div>
        {userDetails?._id === userID && user?.status === "approve" && (
          <button
            className={`btn ${
              createBlog ? "bg-red-600" : "bg-teal"
            } block mx-auto my-5`}
            onClick={() => setCreateBlog(!createBlog)}
          >
            {createBlog ? "Discard" : "Create Blog"}
          </button>
        )}
      </div>

      {/* Create blog form  */}
      {createBlog && (
        <div>
          <CreateBlog author={user?._id} />
        </div>
      )}
      {/* all blogs */}
      {blogs && (
        <div>
          <h2 className="font-bold m-5 md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
            {userDetails?._id === user?._id ? "Your" : `${user?.username}'s`}{" "}
            Blogs
          </h2>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
        {blogs?.data?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      {isOpen && <EditForm />}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default UserID;
