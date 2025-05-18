import {
  usePostCommentMutation,
  useGetCommentsQuery,
  useSoftDeleteCommentMutation,
} from "@/features/api/apiSlice";
import { useState, forwardRef } from "react";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import CommentCard from "./CommentCard";
import Loader from "./Loader";

const CommentBox = forwardRef(({ blogId }, inputRef) => {
  const [comment, setComment] = useState("");
  const [postComment, { isLoading }] = usePostCommentMutation();
  const [softDeleteComment] = useSoftDeleteCommentMutation();
  const {
    data,
    isLoading: loadingComments,
    refetch,
  } = useGetCommentsQuery({ blogId });
  const comments = data?.data;
  console.log(comments);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await postComment({ comment, blogId }).unwrap();
      toast.success("Comment posted!");
      setComment("");
      refetch();
    } catch (err) {
      toast.error("Failed to post comment");
      console.error("Post comment error:", err);
    }
  };

  console.log(comment);
  return (
    <>
      <div className="w-full relative  overflow-auto h-12">
        <div className={`  w-full `}>
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Comment"
            className="w-10/12 p-2 border absolute  bottom-0 focus:outline-teal "
          />
          <div
            onClick={!isLoading ? handleClick : null}
            className={`w-2/12 border bg-slate-100 p-2 px-4 z-20 absolute right-0 bottom-0 cursor-pointer ${
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
      </div>
      {loadingComments ? (
        <Loader />
      ) : comments?.length > 0 ? (
        [...comments]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((comment) => (
            <CommentCard
              key={comment?._id}
              comment={comment}
              onDelete={async () => {
                try {
                  await softDeleteComment(comment._id).unwrap();
                  toast.success("Comment deleted");
                  refetch();
                } catch (err) {
                  console.error("Soft delete failed:", err);
                  toast.error("Failed to delete comment");
                }
              }}
            />
          ))
      ) : (
        <div className="text-center text-sm text-gray-500 mt-2">
          No comments yet.
        </div>
      )}
    </>
  );
});

export default CommentBox;
