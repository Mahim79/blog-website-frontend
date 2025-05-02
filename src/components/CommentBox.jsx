import React from "react";
import { IoSend } from "react-icons/io5";

const CommentBox = () => {
  return (
    <div className="w-full relative border overflow-auto h-44">
      <div className={`  w-full `}>
        <input
          type="text"
          placeholder="Write Comment"
          className="w-10/12 p-2 border absolute  bottom-0 focus:outline-teal "
        />
        <div className="w-2/12 border bg-slate-100 p-2 px-4 z-20 absolute right-0 bottom-0 cursor-pointer">
          <IoSend className=" text-2xl text-teal text-center mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
