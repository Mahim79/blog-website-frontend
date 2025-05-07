'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyEmailMutation } from '@/features/api/apiSlice'; 

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      verifyEmail({ token })
        .unwrap()
        .then(() => {
          toast.success('Email verified successfully!');
          setStatus('Verification successful! You can now log in.');
        })
        .catch(() => {
          toast.error('Invalid or expired verification link.');
          setStatus('Verification failed.');
        });
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-2xl font-semibold mb-4">{status}</h1>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
