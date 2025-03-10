"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export const ContactWidget = () => {
  const router = useRouter()
  return (
    <div className='fixed top-1/2 right-0 -translate-y-1/2 transform -rotate-90 bg-[#b91b29] text-white py-2 px-4 rounded-md' style={{right:"-40px"}}>
      <button onClick={()=>router.push('/contact-us')}>Contact Us</button>
    </div>
  );
};
