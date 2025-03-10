"use client";

import { useState, useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract the token from the URL
  const [validToken, setValidToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/auth'
    : 'http://localhost:8080/api/auth';

  useEffect(() => {
    if (typeof token === "string") {
      setValidToken(token);
    } else {
      setError("Invalid token.");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validToken) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token: validToken, newPassword }).toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setMessage("Password reset successfully!");
      setNewPassword("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 w-full rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#b91b29] text-white px-4 py-2 rounded w-full"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
