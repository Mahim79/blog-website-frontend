import Image from "next/image";
import styles from "./page.module.css";
import heroImage from "../../public/hero-bg.jpg"
import Link from "next/link";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div>
      <div className="relative bg-black">
      <Image
      alt="hero image"
      src={heroImage}
      className="w-full h-96 md:h-screen opacity-50"
      />
      <div className="absolute w-full md:w-1/2 px-5 flex items-start flex-col md:gap-5  top-1/3  left-1/3 transform -translate-x-1/3 -translate-y-1/3">

      <h1 className="text-2xl md:text-3xl font-bold text-teal bg-gradient-to-r from-teal to-green-500 bg-clip-text text-transparent">&quot;Discover Stories, Insights, and Ideas That Inspire&quot;</h1>
      <p className=" text-slate-100 leading-relaxed">You're welcome — your go-to space for fresh ideas, deep insights, and inspiring stories. Whether you're into tech, lifestyle, productivity, or personal growth, we bring thoughtful content that informs and engages. Start exploring and feed your curiosity with articles that truly matter. {/* eslint-disable-line react/no-unescaped-entities */}</p>
      <Link href={"/blogs"} className="btn">Check Out</Link>
      </div>
      </div>
      <Stats/>
    </div>
  );
}
