import { Input } from "postcss";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConfirmModal from "./CofirmModal";
import { useUserDetails } from "@/features/hooks/useUser";

export default function CommentCard({ comment, onDelete }) {
  const [editData, setEditData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { userDetails } = useUserDetails();

  function formatTimeAgo(dateString) {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const diff = now - then;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  return (
    <div className="flex gap-4 justify-between  p-4 border rounded-xl mb-3 shadow-sm bg-white">
      {/* Profile Picture */}
      <div className="flex ">
        <div className=" border-r-2">
          <img
            src={comment.user.profilePicture}
            alt={comment.user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-xl underline">{comment.user.username}</span>
        </div>

        {/* Main Content */}
        <div className="ml-4">
          {/* Comment Text */}
          {onEdit ? (
            <>
              <div className="flex">
                <input
                  type="text"
                  value={comment.content}
                  onChange={(e) => setEditData(e.target.value)}
                  placeholder="Write Comment"
                  className="w-10/12 p-2 border  bottom-0 focus:outline-teal "
                />
                <div
                  className={`w-2/12 border bg-slate-100 p-2 px-4  cursor-pointer ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-2xl text-teal text-center mx-auto" />
                  ) : (
                    <IoSend className="text-2xl text-teal text-center mx-auto" />
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="mt-1 text-gray-700">{comment.content}</p>
          )}

          {/*  Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      {confirmModal && (
        <ConfirmModal
          title={""}
          message={"You want delete this comment"}
          onConfirm={onDelete}
          onCancel={() => setConfirmModal(!confirmModal)}
        />
      )}
      {/* {console.log(comment?.user)} */}
      {(userDetails._id === comment?.user?._id ||
        userDetails.role === "admin") && (
        /* Action Buttons */
        <div className="flex flex-col gap-3 mt-2 text-gray-500">
          <button
            onClick={() => setOnEdit(!onEdit)}
            className="hover:text-blue-500"
          >
            <FiEdit2 className="inline-block mr-1" />
          </button>
          <button
            onClick={() => setConfirmModal(!confirmModal)}
            className="hover:text-red-500"
          >
            <FiTrash2 className="inline-block mr-1" />
          </button>
        </div>
      )}
    </div>
  );
}
