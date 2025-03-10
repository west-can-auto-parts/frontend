"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";
import { GoogleSignInButton, AppleSignInButton } from "./auth-buttons";
import { RegisterSchema } from "../../../schemas";
import axios from "axios"; // Use Axios for API calls
import { useRouter } from 'next/navigation';
import locations from '@/datas/store'; // Import locations data

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
      ? 'https://westcanuserbackend.onrender.com'
      : 'http://localhost:8080';

  // Extend schema to include additional fields
  const ExtendedRegisterSchema = RegisterSchema.extend({
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    nearestStore: z.string().optional(),
  });

  // Initialize form with useForm
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ExtendedRegisterSchema>>({
    resolver: zodResolver(ExtendedRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      nearestStore: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ExtendedRegisterSchema>) => {
    startTransition(() => {
      axios
        .post(`${apiUrl}/api/auth/sign-up`, values)
        .then((response) => {
          const data = response.data;
          setSuccessMessage(data);
          setErrorMessage(null);
          reset(); // Reset the form
          router.push("/sign-in");
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data || "Something went wrong. Please try again."
          );
          setSuccessMessage(null);
        });
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Your New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Display error or success messages */}
          {errorMessage && (
            <div className="alert alert-error text-red-600">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success text-green-600">
              {successMessage}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formRegister("name")}
              required
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...formRegister("email")}
              required
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formRegister("password")}
              required
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              {...formRegister("phoneNumber")}
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              id="address"
              type="text"
              {...formRegister("address")}
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-800 sm:text-sm"
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Nearest Store Dropdown Field */}
          <div>
            <label htmlFor="nearestStore" className="block text-sm font-medium text-gray-900">
              Nearest Store
            </label>
            <select
              id="nearestStore"
              {...formRegister("nearestStore")}
              className="block w-full rounded-md border-2 py-1.5 text-gray-900 focus:ring-2 focus:ring-red-800 sm:text-sm"
            >
              <option value="">Select a store</option>
              {locations.map((store) => (
                <option key={store.id} value={store.name}>
                  {store.name}
                </option>
              ))}
            </select>
            {errors.nearestStore && (
              <p className="text-red-600 text-sm">{errors.nearestStore.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 w-fit justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800"
            >
              Register {isPending ? "..." : <FaArrowRight className="h-3 w-3" />}
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
          Already a member?{" "}
          <a href="#" className="font-semibold leading-6 text-[#b91b29] hover:text-red-800">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};
