"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface OAuth2RedirectHandlerProps {
  children?: React.ReactNode;
}

interface OAuth2ContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  logout: () => void;
}

const OAuth2Context = createContext<OAuth2ContextType | undefined>(undefined);

export const useOAuth2 = () => {
  const context = useContext(OAuth2Context);

  if (!context) {
    throw new Error("useOAuth2 must be used within an OAuth2RedirectHandler");
  }

  return context;
};

export function OAuth2RedirectHandler({
  children,
}: OAuth2RedirectHandlerProps) {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Only process OAuth callback when "token" exists
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    console.log("OAuth callback URL:", window.location.href);
    console.log("OAuth token:", token ? "FOUND" : "NOT FOUND");

    // No token = normal page load, don't throw an error
    if (!token) {
      const storedToken = localStorage.getItem("jwt_token");

      if (storedToken) {
        try {
          const decodedToken = jwtDecode<{
            sub?: string;
            username?: string;
          }>(storedToken);

          const user =
            decodedToken.sub ||
            decodedToken.username ||
            "Guest";

          setUsername(user);
        } catch (error) {
          console.error("Invalid stored JWT:", error);
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("username");
          setUsername(null);
        }
      }

      return;
    }

    // Token found in OAuth callback
    try {
      console.log("OAuth token received");

      localStorage.setItem("jwt_token", token);

      const decodedToken = jwtDecode<{
        sub?: string;
        username?: string;
      }>(token);

      console.log("Decoded token:", decodedToken);

      const user =
        decodedToken.sub ||
        decodedToken.username ||
        "Guest";

      localStorage.setItem("username", user);
      setUsername(user);

      // Remove token from browser URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      // Redirect after successful login
      router.push("/");
    } catch (error) {
      console.error("Error decoding token:", error);

      localStorage.removeItem("jwt_token");
      localStorage.removeItem("username");
      setUsername(null);
    }
  }, [isMounted, router]);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt_token");
    setUsername(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <OAuth2Context.Provider
      value={{
        username,
        setUsername,
        logout,
      }}
    >
      {children}
    </OAuth2Context.Provider>
  );
}