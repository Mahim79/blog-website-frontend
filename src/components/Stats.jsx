import React from "react";

const Stats = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-32 h-32 bg-slate-100 m-2  rounded-lg flex flex-col items-center justify-center my-5">
        <h2 className="font-bold text-center">700</h2>
        <h2 className="font-bold text-center text-teal">Blogs</h2>
      </div>
      <div className="w-32 h-32 bg-slate-100 m-2  rounded-lg flex flex-col items-center justify-center my-5">
        <h2 className="font-bold text-center">280</h2>
        <h2 className="font-bold text-center text-teal">Users</h2>
      </div>
    </div>
  );
};

export default Stats;
