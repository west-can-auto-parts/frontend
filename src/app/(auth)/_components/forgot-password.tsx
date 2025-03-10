"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com'
    : 'http://localhost:8080';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage({
          type: 'success',
          message: 'If an account exists with this email, you will receive password reset instructions.'
        });
        // Optionally redirect after a delay
        setTimeout(() => router.push('/sign-in'), 3000);
      } else {
        setAlertMessage({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: 'Network error. Please try again later.'
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {alertMessage && (
          <div
            className={`mb-4 p-4 rounded text-sm ${
              alertMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {alertMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
            >
              Send reset instructions
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link href="/sign-in" className="font-semibold leading-6 text-[#b91b29] hover:text-red-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}