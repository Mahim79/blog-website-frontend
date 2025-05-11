"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
   try{
     setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    toast.success("Message sent successfully");
   }catch(err){
    toast.error(err?.message)
   }

  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 w-4/5 md:w-[32rem] mx-auto lg:mx-5 rounded-md flex flex-col items-center  border justify-center gap-2 p-5">
      <div className="flex flex-col md:flex-row w-full gap-2">
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 w-full border rounded-md focus:outline-teal"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 w-full border rounded-md focus:outline-teal"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>

      <input
        type="text"
        placeholder="Subject"
        className="px-4 py-2 w-full border rounded-md focus:outline-teal"
        name="subject"
        value={formData.subject}
        onChange={(e) => handleChange(e)}
        required
      />
      <textarea
        placeholder="Message"
        rows="5"
        className="px-4 resize-none py-2 w-full border rounded-md focus:outline-teal"
        name="message"
        value={formData.message}
        onChange={(e) => handleChange(e)}
        required
      ></textarea>
      <button className="btn">
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default ContactForm;
