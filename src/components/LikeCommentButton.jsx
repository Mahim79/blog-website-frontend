import {
  useAddAndRemoveLikeMutation,
  useGetLikeCountsQuery,
} from "@/features/api/apiSlice";
import { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useUserDetails } from "./../features/hooks/useUser";
import { useRouter } from "next/navigation";

export default function LikeCommentButton({ onCommentButtonClick, blogId }) {
  const [like, setLike] = useState(false);
  const router = useRouter();
  const [addAndRemoveLike, { isLoading }] = useAddAndRemoveLikeMutation();
  const { data, refetch } = useGetLikeCountsQuery({ blogId });
  console.log(data);

  const { userDetails } = useUserDetails();

  useEffect(() => {
    if (!data || !userDetails?._id) return;

    const isLiked = data.userIds.includes(userDetails._id);
    setLike(isLiked);
  }, [data, userDetails]);

  const handleLikeToggle = async () => {
    if (!userDetails?._id) {
      router.push("/login");
      return;
    }

    try {
      setLike((prev) => !prev);
      await addAndRemoveLike({ blogId }).unwrap();
      await refetch();
    } catch (error) {
      console.error("Error toggling like:", error);
      setLike((prev) => !prev);
    }
  };
  return (
    <div className="flex items-end gap-6">
      <div className="flex items-center ">
        {like ? (
          <AiFillLike
            onClick={!isLoading ? handleLikeToggle : null}
            className={`text-3xl m-3 cursor-pointer text-teal ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        ) : (
          <AiOutlineLike
            onClick={!isLoading ? handleLikeToggle : null}
            className={`text-3xl m-3 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        )}

        <span className="text-lg">{data?.totalLikes}</span>
      </div>

      <div
        className="flex items-center cursor-pointer"
        onClick={onCommentButtonClick}
      >
        <FaRegCommentAlt className="text-2xl m-3 " />
        <span className="text-lg hover:underline">5</span>
      </div>
    </div>
  );
}
