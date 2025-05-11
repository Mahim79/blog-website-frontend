"use client";

import EditForm from "@/components/EditForm";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function ClientBlogLayout({ children }) {
  const isOpen = useSelector((state) => state.edit.isOpen);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {isOpen && <EditForm />}
      {children}
    </>
  );
}
