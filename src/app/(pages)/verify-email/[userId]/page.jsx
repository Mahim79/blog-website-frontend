"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVerifyEmailMutation } from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  //get user id from url
  const { userId } = useParams();
  // console.log(userId);

  const [verifyEmail, { isLoading, isError, isSuccess, error }] =
    useVerifyEmailMutation();

  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmail({
        userId,
        code,
      }).unwrap();
      // console.log(response);

      if (response.success) {
        toast.success("Email verified successfully!");

        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.data.message === "Email already verified.") {
        toast.error(`${error.data.message} Please Login`);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-2xl font-semibold mb-4">Verify You Email</h1>
      <ToastContainer position="top-right" autoClose={2000} />
      <form className="w-full max-w-sm">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="border border-gray-300 rounded px-4 py-2 mb-4"
        />
        <button
          type="button"
          disabled={!code || isLoading}
          onClick={handleSubmit}
          className={`bg-teal text-white p-4 m-4 py-2 rounded ${
            isLoading || !code ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Submitting.." : "Submit"}
        </button>
      </form>
    </div>
  );
}
