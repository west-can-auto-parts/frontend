"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiLocationMarker, HiUser } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";

const OnScrollNav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const searchBoxRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api'
    : 'http://localhost:8080/api';

  function stringToSlug(str) {
    str = str.replace("&", "and");

    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reset the search bar on scroll
      setSearchQuery("");
      setShowResults(false);

      // Update navbar visibility based on scroll direction
      setShowNavbar(currentScrollY > prevScrollY && currentScrollY > 100);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);


  const handleSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults(null);
      setShowResults(false);
      return;
    }
    const slug = stringToSlug(query);

    try {
      const response = await fetch(`${apiUrl}/search?query=${slug}`);
      if (!response.ok) {
        console.error("Search API returned an error:", response.status);
        setSearchResults(null);
        setShowResults(false);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(null);
      setShowResults(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      handleSearch(query);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (listing, category) => {
    const categorySlug =
      category === "Replacement Parts" || category === "Fluids & Lubricants"
        ? "replacement-parts"
        : "shop-supplies";
        const slug = stringToSlug(listing)
    router.push(`/${categorySlug}/${slug}`);
    setShowResults(false);
  };

  const handleSubCategoryClick = (listing) => {
    router.push(`/shop/${listing}`);
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchQuery("");
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop by Category", href: "/shop" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
  ];

  return (
    <nav
      className={`md:block z-50 fixed top-0 left-0 w-full bg-white border-[1px solid] py-3 transition-transform duration-300 shadow-md ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://westcanauto.com/wp-content/uploads/2023/05/WestCanAP_logoNOUSI-300x156.png"
            alt="Logo"
            className="w-[75px] lg:w-[100px]"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <form className="relative" ref={searchBoxRef}>
            <input
              type="text"
              className="w-full bg-gray-100 h-10 pl-4 pr-10 rounded-md text-sm"
              placeholder="Enter Keyword or Part Number"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
            >
              <FaMagnifyingGlass className="w-5 h-5" />
            </button>
            {showResults && (searchResults?.ProductCategory?.length > 0 || searchResults?.SubCategory?.length > 0) && (
              <div
                className="absolute top-full mt-2 bg-white border border-gray-300 shadow-lg z-50 w-full max-h-48 overflow-y-auto"
              >
                {/* Render ProductCategory Results */}
                {searchResults.ProductCategory?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg px-2 py-1">Product Categories</h3>
                    {searchResults.ProductCategory.slice(0, 5).map((product) => (
                      <div
                        key={product.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleResultClick(product.name, product.categoryName)}
                      >
                        <p className="font-semibold">{product.name}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render SubCategory Results */}
                {searchResults.SubCategory?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg px-2 py-1">Sub Categories</h3>
                    {searchResults.SubCategory.slice(0, 5).map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubCategoryClick(subcategory.name)}
                      >
                        <p className="font-semibold">{subcategory.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button className="hidden md:block bg-[#b12b29] text-white px-3 py-2 rounded-md">
            <Link href="/store" className="flex items-center gap-2">
              <span>Our Stores</span>
              <HiLocationMarker className="h-4 w-4" />
            </Link>
          </button>
          <button className="bg-[#b12b29] text-white px-3 py-2 rounded-md">
            <Link href="/profile" className="flex items-center gap-2">
              <HiUser className="h-4 w-4 md:h-auto md:w-auto" />
              <span className="hidden md:inline">My Account</span>
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default OnScrollNav;
