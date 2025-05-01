'use client';

import { useState } from 'react';
import FormInput from '../../../components/FormInput';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login Data', form);
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
          Login
        </button>
      </form>
    </section>
  );
}
