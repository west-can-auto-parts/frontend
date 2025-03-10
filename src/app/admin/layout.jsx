'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from './_components/SideNav';

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      logoutAndRedirect();
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      if (payload?.role !== 'Admin') {
        logoutAndRedirect();
      } else {
        setIsLoading(false); // Only allow rendering when authenticated
      }
    } catch (error) {
      logoutAndRedirect();
    }
  }, []); // Dependency array is empty

  const logoutAndRedirect = () => {
    localStorage.removeItem('jwt_token'); // Ensure correct key
    router.replace('/signin'); // Use `replace` to prevent going back
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="mx-auto flex flex-wrap md:flex-nowrap gap-4 min-h-[100vh]">
      <aside className="w-[300px]">
        <SideNav />
      </aside>
      <section className="w-full p-4">{children}</section>
    </main>
  );
};

export default Layout;
