'use client';

import { useState } from 'react';
import FormInput from '../../../components/FormInput';
import { useRegisterUserMutation } from '../../../features/api/apiSlice';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();


    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (!isEmailValid(form.email)) {
      toast.error('Invalid email format');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();

    
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }

      toast.success('Registration Successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Registration Failed:', error);
      toast.error('Registration failed. Try again.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
          Register
        </h2>

        <FormInput
          label="Name"
          name="name"
          type="text"
          value={form.name}
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
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
