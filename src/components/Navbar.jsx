"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useUserDetails } from "@/features/hooks/useUser";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [slidebar, setSlidebar] = useState(false);

  const { userDetails, setUserDetails } = useUserDetails();

  const router = useRouter();

  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserDetails({});
    router.push("/login");
    toast.success("Logout successful! Redirecting to login page...");
  };
  // console.log(slidebar);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-slate-100 p-4 flex items-center justify-between ">
        <Image src={logo} alt="NoteBook" className="w-32" />

        {/* Menu Icon  */}
        <RxHamburgerMenu
          className="text-3xl md:hidden"
          onClick={() => setSlidebar(true)}
        />

        {/*  Menubar Slider for Mobile  */}
        {
          <header
            className={`min-h-full md:hidden z-50 bg-slate-100 fixed top-0 w-1/2 right-0 pt-20 px-8 transition-all ${
              !slidebar ? "translate-x-96" : "translate-x-0"
            } `}
          >
            {/* Menu close Icon  */}
            <IoCloseCircleOutline
              className="text-3xl absolute top-0 right-0 m-4 md:hidden"
              onClick={() => setSlidebar(false)}
            />

            <ul className="flex flex-col gap-10 items-start md:flex-row">
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/" && "btn "
                  }`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/blogs" && "btn "
                  }`}
                  href={"/blogs"}
                >
                  Blogs
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/contact" && "btn "
                  }`}
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/login" && "btn "
                  }`}
                  href={"/login"}
                >
                  Login
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/resister" && "btn "
                  }`}
                  href={"/resister"}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </header>
        }

        {/* Menubar For Desktop */}
        {
          <header className={`hidden md:block me-8`}>
            <ul className="flex gap-10 items-center justify-center">
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/" && "btn "
                  }`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/blogs" && "btn "
                  }`}
                  href={"/blogs"}
                >
                  Blogs
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                <Link
                  className={` py-2 px-3 font-semibold ${
                    pathname === "/contact" && "btn "
                  }`}
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>
              <li onClick={() => setSlidebar(false)}>
                {userDetails.username ? (
                  <Link
                    className={` py-2 px-3 font-semibold border border-bottom ${
                      pathname === "/login" && "btn "
                    }`}
                    href={
                      userDetails.role === "admin"
                        ? `/admin/${userDetails._id}`
                        : `/user/${userDetails._id}`
                    }
                  >
                    <Image
                      src={userDetails.profilePicture}
                      width={32}
                      height={32}
                      alt={`${userDetails.username}'s profile picture`}
                      className="inline-block rounded-full mr-2"
                    />
                    {userDetails.username}
                  </Link>
                ) : (
                  <Link
                    className={` py-2 px-3 font-semibold border border-slate-950  ${
                      pathname === "/login" && "btn "
                    }`}
                    href={"/login"}
                  >
                    Login
                  </Link>
                )}
              </li>
              <li onClick={() => setSlidebar(false)}>
                {userDetails.username ? (
                  <div
                    className={` py-2 px-3 font-semibold border border-slate-950 cursor-pointer `}
                    onClick={handleLogout}
                  >
                    logout
                  </div>
                ) : (
                  <Link
                    className={` py-2 px-3 font-semibold  border border-slate-950  ${
                      pathname === "/resister" && "btn "
                    }`}
                    href={"/resister"}
                  >
                    Sign Up
                  </Link>
                )}
              </li>
            </ul>
          </header>
        }
      </div>
    </div>
  );
};

export default Navbar;
