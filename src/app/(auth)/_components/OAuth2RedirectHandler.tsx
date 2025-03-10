"use client";

import { createContext,useContext, useEffect, useState } from "react";
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
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

export function OAuth2RedirectHandler({ children }: OAuth2RedirectHandlerProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Mark as mounted after the component has mounted (ensure we're on the client side)
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Get token from the URL
      const token = new URLSearchParams(window.location.search).get("token");

      if (token) {
        console.log("Token found in URL:", token); // Debugging line
        
        // Store token in localStorage
        localStorage.setItem("jwt_token", token);
        
        try {
          const decodedToken = jwtDecode<any>(token); // Decode the token
          console.log("Decoded token:", decodedToken); // Debugging line
          
          // Optionally, store the username (you can store other user details as needed)
          localStorage.setItem("username", decodedToken.sub || decodedToken.username || "Guest");
          setUsername(decodedToken.sub || decodedToken.username || "Guest");

          // Optionally, redirect to the home page or any other page
          router.push("/"); // Redirect to home page
        } catch (error) {
          console.error("Error decoding token:", error); // Handle errors with decoding
        }
      } else {
        // Handle the case where the token is missing
        console.error("No token found in the URL");
      }
    }
  }, [isMounted, router]);

  if (!isMounted) {
    // Avoid rendering anything until mounted
    return null;
  }
  const logout = () => {
    localStorage.removeItem('username');
      localStorage.removeItem('jwt_token');
    setUsername(null); // Remove username from context and localStorage
  };

  return (
    <OAuth2Context.Provider value={{ username, setUsername,logout }}>
      {children}
    </OAuth2Context.Provider>
  );
}
