"use client";

import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../AuthContext"; // Ensure you have this context in your project

const SignInForm = () => {
  const { setUsername } = useAuth();  // Access the setUsername function from context
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || undefined;
  const urlError = searchParams.get("error") === "OAuthAuthenticatorNotLinked" 
    ? "Email already in use with different Provider" 
    : "";

  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com'
    : 'http://localhost:8081';

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    setAlertMessage(null); // Clear previous alerts

    startTransition(async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/api/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data?.message === "Bad credentials") {
          setAlertMessage({ type: 'error', message: 'Invalid email or password.' });
        } else if (data?.jwt_token) {
          setAlertMessage({ type: 'success', message: `Welcome, ${data.username}!` });

          // Store authentication data
          localStorage.setItem('jwt_token', data.jwt_token);
          localStorage.setItem('username', data.username);

          setUsername(data.username); // Update context

          // Redirect user
          if (callBackUrl) {
            window.location.href = callBackUrl;
          } else {
            router.push('/admin');
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full">
        {alertMessage && (
          <div className={`mb-4 p-4 rounded text-sm ${alertMessage.type === 'success' ? 'bg-green-100 text-green-700' : alertMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {alertMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                autoComplete="email"
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#b91b29] hover:text-red-800">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 w-fit justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800"
            >
              Sign in {isPending ? "..." : <FaArrowRight className="h-3 w-3" />}
            </button>
          </div>
        </form>

        <div className="mt-8 flex w-full items-center justify-between">
          <div className="w-full h-[2px] bg-gray-200"></div>
          <span className="text-gray-500">Or</span>
          <div className="w-full h-[2px] bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

// ✅ Fix: Export default Next.js page component
const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
