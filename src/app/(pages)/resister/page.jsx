'use client';

import { useState } from 'react';
import FormInput from '../../../components/FormInput';
import { useRegisterUserMutation } from '../../../features/api/apiSlice';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerUser] = useRegisterUserMutation();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register Data', form);

    try {
      await registerUser(form).unwrap();
      console.log('Registration Successful');
    } catch (error) {
      console.error('Registration Failed:', error);
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
          className="w-full mt-4 btn hover:bg-deepTeal text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}
