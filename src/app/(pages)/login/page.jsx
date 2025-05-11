"use client";

import { useState } from "react";
import { useLoginUserMutation } from "@/features/api/apiSlice";
import FormInput from "../../../components/FormInput";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserDetails } from "@/features/hooks/useUser";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();
  const { setUserDetails } = useUserDetails();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    if (!isEmailValid(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      }).unwrap(); // get raw response or throw error
      console.log(response);

      toast.success("Login successful! Redirecting...");
      localStorage.setItem("token", response.token);

      setUserDetails(response.user);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
          Login
        </h2>

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-4 btn hover:bg-deepTeal text-white font-semibold py-2 px-4 rounded-md transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
