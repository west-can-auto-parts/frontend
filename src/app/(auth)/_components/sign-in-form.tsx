"use client";


import { GoogleSignInButton } from './auth-buttons';
import { AppleSignInButton } from './auth-buttons';
import { FaArrowRight } from 'react-icons/fa';
import React, { startTransition, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../AuthContext';  // Import the useAuth hook

export const SignInForm = () => {
  const { setUsername } = useAuth();  // Access the setUsername function from context
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || undefined;
  const urlError = searchParams.get("error") === "OAuthAuthenticatorNotLinked" ? "Email already in use with different Provider" : "";

  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
      ? 'https://westcanuserbackend.onrender.com'
      : 'http://localhost:8080';

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validating input data (basic check for email and password)
    if (!values.email || !values.password) {
      setAlertMessage({ type: 'error', message: 'Email and password are required.' });
      return;
    }

    startTransition(async () => {
      try {
        // Sending the login request to the backend
        const response = await fetch(`${apiUrl}/api/auth/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        // Handle response based on the backend data structure
        if (data?.message === "Bad credentials") {
          setAlertMessage({ type: 'error', message: 'Invalid email or password.' });
        } else if (data?.jwt_token) {
          setAlertMessage({ type: 'success', message: `Welcome, ${data.username}!` });
          // Store the user's name and token in localStorage
          localStorage.setItem('jwt_token', data.jwt_token);
          localStorage.setItem('username', data.username); // Store the username in localStorage

          // Update the username in the context
          setUsername(data.username);

          // Redirect to home page or callback URL
          if (callBackUrl) {
            window.location.href = callBackUrl;
          } else {
            router.push('/'); // Redirect to home
          }
        } else {
          setAlertMessage({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
      } catch (error) {
        setAlertMessage({ type: 'error', message: 'Network error. Please try again later.' });
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full">
          {alertMessage && (
            <div
              className={`mb-4 p-4 rounded text-sm ${alertMessage.type === 'success' ? 'bg-green-100 text-green-700' : alertMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}
            >
              {alertMessage.message}
            </div>
          )}

          <form onSubmit={onSubmit} method="POST" className="space-y-6">
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
                  autoComplete="email"
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm border-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/forgot-password" className="font-semibold text-[#b91b29] hover:text-red-800">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex items-center gap-2 w-fit justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Sign in <FaArrowRight className="h-3 w-3" />
              </button>
            </div>
          </form>

          <div className="mt-8 flex w-full items-center justify-between">
            <div className="w-full h-[2px] bg-gray-200"></div>
            <span className="text-gray-500">Or</span>
            <div className="w-full h-[2px] bg-gray-200"></div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2">
            <GoogleSignInButton />
            <AppleSignInButton />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href="/sign-up" className="font-semibold leading-6 text-[#b91b29] hover:text-red-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};