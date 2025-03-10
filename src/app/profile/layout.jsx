import React from 'react';
import ProfileNav from './_components/ProfileNav';
import { FaLock } from 'react-icons/fa6';
import Link from 'next/link';

// Define the layout component
const Layout = ({ children }) => {
  return (
    <main className='bg-gray-100 py-12'>
      <section className='w-10/12 mx-auto flex flex-wrap md:flex-nowrap gap-8'>
       
        <section className='w-full md:w-3/4'>
          {children}
        </section>
      </section>
    </main>
  );
};

export default Layout;
