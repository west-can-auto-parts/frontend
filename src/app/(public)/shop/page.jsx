"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";


import { MobileNav } from './_components/mobile-nav'
import { SideNav } from './_components/shop-side-nav'
import {MainContentView} from './_components/main-content'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubPart, setSelectedSubPart] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const router = useRouter();

  const toggleCategory = useCallback(
    (category) => {
      setSelectedCategory((prevCategory) =>
        prevCategory === category ? null : category
      );
    },
    []
  );

  const handleSubPartChange = useCallback((subPart) => {
    setSelectedSubPart(subPart.parts);
  }, []);

  const handleNavigation = useCallback(
    (partTitle, subPartListing, itemListing) => {
      router.push(`NEXTAUTH_URL/${partTitle}/${subPartListing}/${itemListing}`);
    },
    [router]
  );

  const handleSearchClick = () => {
    if (title && selectedCategory && selectedPart) {
      router.push(`/shop/${title}/${selectedCategory}/${selectedPart}`);
    }
  };

  return (
    <section>
      <div className="w-10/12 mx-auto pt-6">
        <p className="text-2xl mx-auto"></p>
      </div>
      <div className="w-10/12 mx-auto flex flex-wrap md:flex-nowrap items-start gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 bg-white p-4">
          <MobileNav />
          <SideNav />
        </div>
        {/* Main Content */}
        <MainContentView />
      </div>
    </section>
  );
};

export default Page;
