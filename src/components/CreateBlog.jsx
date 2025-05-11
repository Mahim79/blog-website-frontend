"use client";
import {
  useCreateBlogMutation,
  useGetBlogCategoriesQuery,
} from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { categoryList as categories } from "@/features/utils/categoryList";
import { useUserDetails } from './../features/hooks/useUser';

const CreateBlog = ({ author }) => {
  const [createBlog, { data }] = useCreateBlogMutation();
  const imageRef = useRef();
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  // const { data: AllCategories } = useGetBlogCategoriesQuery();

  // const categories = AllCategories?.data;

  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", newBlog.image);
    data.append("upload_preset", "ic-blog-web");
    data.append("folder", "ic-blog-images");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/deol99szj/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      console.log("image URL:", result);
      return result.secure_url;
    } catch (err) {
      console.log("Image upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const imageURL = await imageUpload();
    if (!imageURL) {
      toast("Image upload failed.");
      setIsLoading(false);
      return;
    }

    try {
      await createBlog({ ...newBlog, author, image: imageURL });
      toast("New Blog Published");
      setNewBlog({
        title: "",
        content: "",
        category: "",
        image: "",
        tags: [],
      });
      imageRef.current.value = "";
      setTimeout(() => {
        router.push("/blogs");
      }, 2000);

      setIsLoading(false);
    } catch (err) {
      toast(err?.message || "Blog couldn't create");
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-teal p-5  md:w-[600px] md:mx-auto rounded-md m-5">
      <h2 className="text-2xl text-center font-bold text-slate-100">
        Create a new blog
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="block p-2 w-full rounded-md focus:outline-teal my-2"
          value={newBlog.title}
          onChange={(e) => handleChange(e)}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="block p-2 w-full rounded-md focus:outline-teal  my-2"
          value={newBlog.content}
          onChange={(e) => handleChange(e)}
          required
        ></textarea>
        <select
          className="block p-2 w-full rounded-md focus:outline-teal  my-2"
          value={newBlog.category}
          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
          required
        >
          <option value="" disabled>
            Category
          </option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          name="image"
          type="file"
          className="block p-2 w-full rounded-md focus:outline-teal  my-2"
          ref={imageRef}
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="block p-2 w-full rounded-md focus:outline-teal  my-2"
          value={newBlog.tags.join(", ")}
          onChange={(e) =>
            setNewBlog({
              ...newBlog,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            })
          }
          required
        />
        <button
          type="submit"
          className={`text-teal font-semibold block mx-auto py-2 px-8 rounded-md  ${
            isLoading ? "bg-slate-500" : "bg-slate-100"
          }`}
          disabled={isLoading}
        >
          Create
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CreateBlog;
