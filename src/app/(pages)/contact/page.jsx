import ContactForm from "@/components/ContactForm";
import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillMail,
  AiFillPinterest,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  return (
    <div className="my-5 h-screen flex flex-col items-center justify-center -mt-20">
      <h1 className="text-center text-2xl py-5 font-semibold">Contact Us</h1>
      <div className=" flex flex-col lg:flex-row items-start gap-2 justify-center w-full">
        <ContactForm />
        <div className="bg-slate-100 w-4/5  md:w-[32rem] mx-auto lg:mx-0 rounded-md flex flex-col items-start  border justify-center gap-2 p-5">
          <p>
            Dynamically underwhelm integrated outsourcing via timely models.
            Rapidiously reconceptualize visionary imperatives without
          </p>
          <div>
            <p className="flex items-center gap-2 my-2">
              <span>
                <AiFillMail className="text-teal cursor-pointer text-xl" />
              </span>
              <span>blog.notebook@gmail.com</span>
            </p>
            <p className="flex items-center gap-2 my-2">
              <span>
                <FaPhoneAlt className="text-teal cursor-pointer text-xl" />
              </span>
              <span>+886554 654654</span>
            </p>
            <p className="flex items-center gap-2 my-2">
              <span>
                <CiLocationOn className="text-teal cursor-pointer text-xl" />
              </span>
              <span>9567 Turner Trace Apt. BC C3G8A4</span>
            </p>
          </div>
          <div className="flex flex-col items-start self-center">
            <h2 className="font-bold self-center mt-2">Follow on</h2>
            <div className="flex items-center justify-center self-center gap-4">
              <AiFillFacebook className="text-teal cursor-pointer text-xl" />
              <AiFillInstagram className="text-teal cursor-pointer text-xl" />
              <AiFillPinterest className="text-teal cursor-pointer text-xl" />
              <AiFillTwitterSquare className="text-teal cursor-pointer text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
