import AllBlogs from "@/components/AllBlogs";
import BlogsCategory from "@/components/BlogsCategory";
import LatestBlog from "@/components/LatestBlogs";
import Loader from "@/components/Loader";
import TopAuthors from "@/components/TopAuthors";
import React, { Suspense } from "react";

const Blogs = () => {
  
  return (
    <div className="md:flex items-start justify-around">
      <div
        className="md:sticky bg-slate-100  lg:-top-[350px] md:-top-[420px]"
        style={{ flex: 1 }}
      >
        <div>
          <TopAuthors />
          <BlogsCategory />
        </div>
      </div>

      <div className="lg:flex-1" style={{ flex: 4 }}>
        <h2 className="font-bold mx-5  md:mt-10 text-xl underline underline-offset-4 text-center decoration-teal">
          Latest
        </h2>
        <div>
          <LatestBlog />
        </div>
        <div className="w-3/4 h-1 bg-teal mx-auto my-5"></div>
        <Suspense fallback={<Loader />}>
          <AllBlogs />
        </Suspense>
      </div>
    </div>
  );
};

export default Blogs;
