"use client";
import React from "react";
import Image from "next/image";
import googleLogo from "@/assets/google.png";
import appleLogo from "@/assets/apple.png";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../../../route";

export function GoogleSignInButton() {
  const onClick = () => {
    // Redirect to the backend OAuth2 login endpoint
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
      ? 'https://westcanuserbackend.onrender.com'
      : 'http://localhost:8080';
    const backendOAuthUrl =`${apiUrl}/oauth2/authorization/google`;
    window.location.href = backendOAuthUrl; // Use window.location for full page redirect
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center font-semibold justify-center h-12 px-6 mt-4 transition-colors duration-300 bg-white border-[1px] border-gray-200 shadow-md text-sm text-black rounded-lg focus:shadow-outline hover:bg-gray-100"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export function AppleSignInButton() {
  const onClick = () => {
    signIn("apple", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT, // Apple sign-in redirect (customize as needed)
    });
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center font-semibold justify-center h-12 px-6 mt-4 transition-colors duration-300 bg-white border-[1px] border-gray-200 shadow-md text-sm text-black rounded-lg focus:shadow-outline hover:bg-gray-100"
    >
      <Image src={appleLogo} alt="Apple Logo" width={20} height={20} />
      <span className="ml-4">Continue with Apple</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const onClick = () => {
    signIn("credentials", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT, // Add callback URL if necessary
    });
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}
