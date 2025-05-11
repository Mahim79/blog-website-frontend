"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/features/api/apiSlice";
import FormInput from "../../../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password, confirmPassword } =
      form;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({
        firstName,
        lastName,
        username,
        email,
        password,
      }).unwrap();
      // console.log(response);

      if (response.success) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        router.push(`/verify-email/${response?.user?._id}`);
        return;
      }
      if (!response.success) {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-14">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
          Register
        </h2>

        <FormInput
          label="First Name"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
        />
        <FormInput
          label="Username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 btn hover:bg-deepTeal text-white font-semibold py-2 px-4 rounded-md transition"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
