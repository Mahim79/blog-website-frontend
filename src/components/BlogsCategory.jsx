"use client";

import Link from "next/link";
import React, { useState } from "react";

const categories = [
  "All",
  "Travel",
  "Lifestyle",
  "Health",
  "Tech",
  "Adventure",
  "Art",
  "Wellness",
  "Finance",
  "Science",
];

const BlogsCategory = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="max-h-full">
      <h2 className="font-bold mx-5 text-xl underline underline-offset-4 decoration-teal">
        Categories
      </h2>
      <div className="px-5 pb-5 w-full md:h-screen rounded-md bg-slate-100 overflow-auto flex md:flex-col gap-4 items-center md:items-start justify-start">
        <ul className="flex items-start flex-wrap gap-2 ">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn ${
                category === activeCategory && "category-active"
              }`}
            >
              <Link
                href={`${
                  category === "All" ? "blogs" : `blogs?category=${category}`
                }`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogsCategory;
