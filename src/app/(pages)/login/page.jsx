'use client';

import { useState, useEffect } from 'react';
import { useLoginUserQuery } from '@/features/api/apiSlice';
import FormInput from '../../../components/FormInput';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [triggerLogin, setTriggerLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useLoginUserQuery(
    { email: form.email, password: form.password },
    { skip: !triggerLogin }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error('Email and password are required');
      return;
    }

    if (!isEmailValid(form.email)) {
      toast.error('Invalid email format');
      return;
    }

    setTriggerLogin(true);
  };

  useEffect(() => {
    if (mounted) {
      if (data && data.length > 0) {
        toast.success('Login successful! Redirecting...');
        localStorage.setItem('token', data[0].token);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }

      if (
        triggerLogin &&
        !isLoading &&
        !error &&
        (!data || data.length === 0)
      ) {
        toast.error('Invalid email or password');
      }
    }
  }, [data, isLoading, error, triggerLogin, router, mounted]);

  if (!mounted) return null;

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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
