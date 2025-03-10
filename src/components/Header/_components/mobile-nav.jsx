"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaXmark, FaWhatsapp, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import parts from "@/datas/catalogue";
import { BiUser } from "react-icons/bi";
import { title } from "process";

export const MobileNav = ({isMenuOpen2}) => {
  const [isMenuOpen, setIsMenuOpen] = useState({isMenuOpen2});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const searchBoxRef = useRef(null);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setExpandedCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    // Add other navigation items here
  ];

  return (
    <div className={`fixed inset-y-0 w-full px-4 left-0 overflow-y-auto bg-gray-100 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ transition: 'transform 0.3s ease-out' }}>
      <div className='py-2 my-2 flex justify-between gap-6 items-center'>
        <p className='font-bold text-lg'>Menu</p>
        <FaXmark className='h-5 w-5' onClick={toggleMenu} />
      </div>
      <div className="flex justify-between gap-4">
        <button className='w-full flex items-center gap-2 text-xs bg-[#b12b29] text-white px-2 py-2'>
          <BiUser className='w-5 h-5' /> Sign In / Register
        </button>
        <button className='w-full flex items-center gap-2 text-xs bg-[#b12b29] text-white px-2 py-2'>
          <FaWhatsapp className='w-5 h-5' /> Chat With Us
        </button>
      </div>
      <ul className="list-none border-b border-gray-300 py-2 mb-2">
        {navItems.map((item) => (
          <li key={item.href} className='py-1 my-2'>
            <Link href={item.href} className='block text-sm font-semibold text-gray-700'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='py-2 my-2'>
        <li className='py-1 my-2'>
          <p className='text-sm font-semibold text-gray-700'>Parts and Equipment</p>
          <ul className="list-none mt-2">

            {parts.map(part => part.subParts.map(subPart => (
              <li key={subPart.listing} className='py-1'>
                <div
                  className='cursor-pointer text-gray-700 flex justify-between items-center'
                  onClick={() => toggleCategory(subPart.listing)}
                >
                  <span className='text-sm'>{subPart.listing}</span>
                  <span className={`transform transition-transform ${expandedCategory === subPart.listing ? 'rotate-90' : ''}`}>
                    <FaChevronRight className='h-3 w-3' />
                  </span>
                </div>
                {expandedCategory === subPart.listing && (
                  <ul className="list-none mt-2 pl-4">
                    {subPart.parts.map((subcategory) => (
                      <li key={subcategory.listing} className=' my-2 text-sm text-gray-600' onClick={()=>router.push(`/shop/${title}/${subPart.listing}/${subcategory.listing}`)}>
                        {subcategory.listing}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )))}
          </ul>
        </li>
      </ul>
    </div>
  );
};


