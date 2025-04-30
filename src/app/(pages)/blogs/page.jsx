import LatestBlog from "@/components/LatestBlogs";
import TopAuthors from "@/components/TopAuthors";
import React from "react";

const Blogs = () => {
  return (
    <div className="md:flex items-start justify-around">
      <div className="">
        <TopAuthors/>
      </div>

      <div className="lg:flex-1">
        <h2 className="font-bold mx-5 mt-10 text-3xl underline underline-offset-4 lg:text-center decoration-teal">
          Latest
        </h2>
        <div>
          <LatestBlog />
        </div>
        <div className="w-3/4 h-1 bg-teal mx-auto my-5"></div>
      </div>
    </div>
  );
};

export default Blogs;
