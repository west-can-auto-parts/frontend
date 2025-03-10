"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { useOAuth2 } from "@/app/(auth)/_components/OAuth2RedirectHandler";
import locations from "@/datas/store"; // Import locations

interface User {
  name: string;
  email: string;
  image?: string;
  address?: string;
  phoneNumber?: string;
  nearestStore?: string;
  password?: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const router = useRouter();
  const { logout: authLogout } = useAuth(); // Renaming the logout from AuthContext
  const { logout: oauthLogout } = useOAuth2();
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://westcanuserbackend.onrender.com/api"
    : "http://localhost:8080/api";

  // Logout function
  const handleLogout = () => {
    authLogout(); // Clear user-related state
    oauthLogout(); // Clear OAuth-related state
    router.push("/"); // Redirect to the home page
  };

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          console.error("No token found");
          handleLogout();
          return;
        }

        const userResponse = await fetch(`${apiUrl}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status === 401) {
          console.error("Token is invalid or expired");
          handleLogout();
          return;
        }

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData: User = await userResponse.json();
        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        handleLogout(); // Logout on unexpected errors
      }
    };

    fetchData();
  }, []);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Save updated user data
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token || !editedUser) {
        throw new Error("Missing token or user data");
      }

      const response = await fetch(`${apiUrl}/user/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditedUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <section className="flex flex-wrap md:flex-nowrap gap-8">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center gap-4">
        <div className="p-12 flex flex-col items-center justify-center">
          <img
            src={user?.image || "https://www.gravatar.com/avatar?d=mp&s=88"}
            alt="Profile Picture"
            className="w-20 h-20 object-cover rounded-full mb-4"
          />
          <div className="mb-6 text-center">
            <input
              type="text"
              name="name"
              value={editedUser?.name || ""}
              disabled={!isEditing}
              onChange={handleChange}
              className={`font-bold text-xl text-center ${
                isEditing
                  ? "border border-gray-300 px-2"
                  : "border-none bg-transparent focus:outline-none"
              }`}
            />
            <p className="text-sm text-gray-500">{user?.email || "useremail@site.com"}</p>
          </div>
          <div className="text-sm md:text-md p-2 md:p-4">
            {isEditing ? (
              <button onClick={handleSave} className="bg-green-500 text-white font-bold px-4 py-2">
                Save
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-gray-100 text-[#b12b29] font-bold px-4 py-2"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-100 text-[#b12b29] font-bold px-4 py-2 ml-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white gap-4">
        <div className="p-8">
          <p className="font-bold mb-1">Address :</p>
          <input
            type="text"
            name="address"
            value={editedUser?.address || ""}
            disabled={!isEditing}
            onChange={handleChange}
            className={`text-sm mb-3 w-full ${
              isEditing
                ? "border border-gray-300 px-2"
                : "border-none bg-transparent focus:outline-none"
            }`}
          />
          <p className="font-bold mb-1">Phone :</p>
          <input
            type="text"
            name="phoneNumber"
            value={editedUser?.phoneNumber || ""}
            disabled={!isEditing}
            onChange={handleChange}
            className={`text-sm mb-3 w-full ${
              isEditing
                ? "border border-gray-300 px-2"
                : "border-none bg-transparent focus:outline-none"
            }`}
          />
          <p className="font-bold mb-1">Nearest Store :</p>
          <select
            name="nearestStore"
            value={editedUser?.nearestStore || ""}
            disabled={!isEditing}
            onChange={handleChange}
            className={`text-sm mb-3 w-full ${
              isEditing
                ? "border border-gray-300 px-2"
                : "border-none bg-transparent focus:outline-none"
            }`}
          >
            <option value="" disabled>
              Select Store
            </option>
            {locations.map((store, index) => (
              <option key={index} value={store.name}>
                {store.name}
              </option>
            ))}
          </select>
          <p className="font-bold mb-1">Password :</p>
          <input
            type="password"
            name="password"
            value={editedUser?.password || ""}
            disabled={!isEditing}
            onChange={handleChange}
            className={`text-sm mb-3 w-full ${
              isEditing
                ? "border border-gray-300 px-2"
                : "border-none bg-transparent focus:outline-none"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
