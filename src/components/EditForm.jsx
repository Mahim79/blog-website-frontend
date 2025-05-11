"use client";
import {
  useEditBlogMutation,
  useGetBlogCategoriesQuery,
  useGetBlogQuery,
} from "@/features/api/apiSlice";
import { closeEdit } from "@/features/edit/editSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditForm = () => {
  const dispatch = useDispatch();
  const blogID = useSelector((state) => state.edit.blogID);
  const { data: blogDetails } = useGetBlogQuery(blogID);
  const blog = blogDetails?.data;
  const { data: allCategories, isLoading } = useGetBlogCategoriesQuery();
  const [editedBlog, setEditedBlog] = useState({
    title: blog?.title,
    content: blog?.content,
    image: blog?.image,
    category: blog?.category,
  });
  const [editBlog] = useEditBlogMutation();
  const categories = allCategories?.data;

  console.log(editedBlog);

  const imageUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
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
      setEditedBlog({ ...editedBlog, image: result.secure_url });
    } catch (err) {
      console.log("Image upload failed", err);
    }
  };

  const handleChange = (e) => {
    setEditedBlog({
      ...editedBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      await editBlog(editedBlog);
    dispatch(closeEdit());
    toast.success("Update successfull");
    }catch(err){
      toast.error(err?.message || "Couldn't update")
    }
  };

  // useEffect for change editedBlog state
  useEffect(() => {
    if (blog) {
      setEditedBlog({
        title: blog.title,
        content: blog.content,
        image: blog.image,
        category: blog.category,
      });
    }
  }, [blog]);

  return (
    <div className="bg-teal p-5 z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-11/12 md:w-[600px] md:mx-auto rounded-md m-5">
      <h2 className="text-2xl text-center font-bold text-slate-100">
        Update your blog
      </h2>
      {blog ? (
        <form>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="block p-2 w-full rounded-md focus:outline-teal my-2"
            value={editedBlog?.title}
            onChange={(e) => handleChange(e)}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="block p-2 w-full rounded-md focus:outline-teal  my-2"
            value={editedBlog.content}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
          <select
            name="category"
            className="block p-2 w-full rounded-md focus:outline-teal  my-2"
            required
            onChange={(e) => handleChange(e)}
          >
            <option value={editedBlog.category}>{editedBlog.category}</option>
            {categories?.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <input
            name="image"
            type="file"
            className="block p-2 w-full rounded-md focus:outline-teal  my-2"
            onChange={(e) => imageUpload(e.target.files[0])}
          />

          <Image
            src={editedBlog?.image}
            width={200}
            height={200}
            alt="image"
            className="w-20 h-20 mx-auto my-5 rounded-sm"
          />

          {/* update and cancel button  */}
          <div className="flex  items-center justify-center gap-2">
            <button
              type="submit"
              className={`text-teal font-semibold block  py-2 px-8 rounded-md  ${
                isLoading ? "bg-slate-500" : "bg-slate-100"
              }`}
              disabled={isLoading}
              onClick={(e) => handleUpdate(e)}
            >
              Update
            </button>
            <button
              className={`text-teal font-semibold block  py-2 px-8 rounded-md
             bg-slate-100
          `}
              disabled={isLoading}
              onClick={() => dispatch(closeEdit())}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <h2 className="h-96 text-3xl text-slate-100 text-center flex justify-center items-center">
          Loading.........
        </h2>
      )}
      
    </div>
  );
};

export default EditForm;
