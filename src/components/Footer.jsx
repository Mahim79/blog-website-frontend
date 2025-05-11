import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPinterest,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-100 p-4 w-full border-t">
      <div className="lg:flex items-start justify-evenly">
        <div className="sm:flex items-start">
          {/* about */}
          <div className="">
            <Image src={logo} alt="Logo" className="w-24 " />
            <p className="text-sm">
              Did you come here for something in particular or just general
              Riker
            </p>
          </div>
          {/* categories */}

          <div className="flex items-start justify-evenly mt-5 sm:m-0 w-full">
            <div className="flex flex-col items-start">
              <h2 className="font-bold">Blogs</h2>
              <Link href={""}>Travel</Link>
              <Link href={""}>Technology</Link>
              <Link href={""}>Lifestyle</Link>
              <Link href={""}>fashion</Link>
              <Link href={""}>Business</Link>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-bold">quick links</h2>
              <Link href={""}>FAQ</Link>
              <Link href={""}>Terms & conditions</Link>
              <Link href={""}>support</Link>
              <Link href={""}>privacy policy</Link>
            </div>
          </div>
        </div>

        {/* newsLetter */}
        <div className="mt-2 flex flex-col items-center">
          <h2 className="font-bold">Subscribe for newsletter</h2>
          <div>
            <input
              type="text"
              placeholder="Your Email"
              className="py-2 px-3 focus:outline-teal border rounded-sm"
            />
            <button className="btn mx-2">Subscribe</button>
          </div>
          <h2 className="font-bold self-center mt-2">Follow on</h2>
          <div className="flex items-center justify-center self-center gap-4">
            <AiFillFacebook className="text-teal cursor-pointer text-xl" />
            <AiFillInstagram className="text-teal cursor-pointer text-xl" />
            <AiFillPinterest className="text-teal cursor-pointer text-xl" />
            <AiFillTwitterSquare className="text-teal cursor-pointer text-xl" />
          </div>
        </div>

        <div></div>
        <div></div>
      </div>
      <div className="mt-5  border-t">
        <p className="text-center pt-2 text-sm">Designed by Group L</p>
      </div>
    </footer>
  );
};

export default Footer;
