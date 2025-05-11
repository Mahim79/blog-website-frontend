"use client";
import  { useEffect,useState } from "react";

export default function FormattedDate({createdAt}) {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    if (createdAt) {
      const date = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setFormattedDate(date);
    }
  }, [createdAt]);

  return <h4 className="text-sm font-semibold">{formattedDate}</h4>;
}
