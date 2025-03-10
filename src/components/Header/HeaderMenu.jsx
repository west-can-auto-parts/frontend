"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    FaBars,
    FaChevronDown,
    FaChevronUp,
    FaTimes,
    FaLocationArrow,
    FaChevronRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Shop All" },
    { href: "/blogs", label: "Blogs" },
    { href: "/suppliers", label: "Suppliers" },
    { href: "/our-advantage", label: "Our Advantage" },
];

const HeaderMenu = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMouseInsideSubCategory, setIsMouseInsideSubCategory] = useState(false);
    const [isMouseInsideProducts, setIsMouseInsideProducts] = useState(false);
    const dropdownRef = useRef(null);
    const isProduction = process.env.NODE_ENV === 'production';
    const apiBaseUrl = isProduction
      ? 'https://westcanuserbackend.onrender.com/api/product/shop-by-category'
      : 'http://localhost:8080/api/product/shop-by-category';

    // const apiBaseUrl = "http://localhost:8080/api/product/shop-by-category";

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
        const fetchCategories = async () => {
            try {
                const response = await fetch(apiBaseUrl);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();

        // Close dropdown if clicking outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnterCategory = (category) => {
        setActiveCategory(category);
    };

    const handleMouseLeaveCategory = () => {
        setActiveCategory(null);
    };

    const handleCategoryClick = (category) => {
        router.push(`/shop/${category}`);
    };

    const handleProductClick = ( product,category) => {
        const categorySlug = category === 'Replacement Parts' || category === 'Fluids & Lubricants'
        ? 'replacement-parts'
        : 'shop-supplies';
  
        const slug = stringToSlug(product); // Convert listing to a slug
        router.push(`/${categorySlug}/${slug}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        setActiveCategory(null);
    };

    useEffect(() => {
        // Close dropdown if clicking outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="hidden lg:block border-b-2 border-[#00000010] py-1 shadow-sm">
            <div className="w-10/12 mx-auto hidden lg:flex justify-between items-center gap-4">
                {/* Shop By Category Section */}
                <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setIsMouseInsideSubCategory(true)}
                    onMouseLeave={() => setIsMouseInsideSubCategory(false)}
                >
                    <div
                        className="text-sm py-2 flex items-center gap-3 font-semibold border-r-2 border-[#00000010] h-full hover:text-[#b91b29] transition pr-6 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        {isDropdownOpen ? (
                            <FaTimes className="h-5 w-5" />
                        ) : (
                            <FaBars className="h-5 w-5" />
                        )}
                        <span className="w-[150px]">Shop By Category</span>
                        {isDropdownOpen ? (
                            <FaChevronUp className="h-4 w-4" />
                        ) : (
                            <FaChevronDown className="h-4 w-4" />
                        )}
                    </div>

                    {/* Dropdown Content */}
                    {isDropdownOpen && (
                        <div
                            className="absolute z-10 top-full left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 flex"
                        >
                            <div className="w-[300px] bg-red-800 text-white p-4 max-h-[50vh] overflow-y-auto">
                                {/* Categories */}
                                {Object.keys(categories).map((category, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => handleMouseEnterCategory(category)}
                                        // onMouseLeave={handleMouseLeaveCategory}
                                        className="group text-sm px-4 py-2 font-semibold cursor-pointer text-gray-200 hover:text-white transition flex justify-between items-center"
                                    >
                                        <Link
                                            href={`/shop/${category}`}
                                            className="text-gray-200 hover:text-white transition"
                                        >
                                            {category}
                                        </Link>
                                        <FaChevronRight className="hidden group-hover:block h-4 w-4" />
                                    </div>
                                ))}
                            </div>

                            {/* Products for active category */}
                            {activeCategory && categories[activeCategory] && (
                                <div
                                    className="w-[500px] p-4"
                                    onMouseEnter={() => setIsMouseInsideProducts(true)}
                                    onMouseLeave={() => setIsMouseInsideProducts(false)}
                                >
                                    {Object.entries(categories[activeCategory]).map(([product, value], index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleProductClick(product, value)}
                                            className="cursor-pointer transition block px-4 py-2 text-sm text-gray-700 hover:bg-red-800 hover:text-white font-semibold"
                                        >
                                            {product}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Navigation Links */}
                <div className="flex justify-between w-full items-center">
                    <div className="flex text-sm gap-2 px-4 font-semibold">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-2"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/store" className="flex items-center gap-2">
                            Locate Us <FaLocationArrow className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HeaderMenu;
