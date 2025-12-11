"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export const RelatedSubCategory = ({ subCategories = [], onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add useEffect to handle initial category selection
  React.useEffect(() => {
    if (subCategories.length > 0 && !selectedCategory) {
      handleCategoryClick(subCategories[1]);
    }
  }, [subCategories]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category.name);
    setIsLoading(true);
    
    // Fetch products for the selected category
    const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
      ? "https://clientsidebackend.onrender.com/api/product"
      : "http://localhost:8080/api/product";

    try {
      const response = await fetch(`${apiUrl}/products-category/subCategoryName?subCategoryName=${stringToSlug(category.name)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
      const products = await response.json();
      
      // Call the parent's onCategorySelect with both category and its products
      if (onCategorySelect) {
        onCategorySelect({
          ...category,
          products: products
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  };

  function stringToSlug(str) {
    str = str.replace("&", "and");
    str = str.replace(/,/g, "~");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  return (
    <div className="border-b-2 px-6 py-6 bg-red-800 text-white border-b-white shadow-sm">
      <h3 className="text-sm font-semibold mb-4">All Categories</h3>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <ul
          className="list-none pb-3 space-y-2 h-[250px] overflow-y-auto
                     scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-red-800"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db #7f1d1d",
          }}
        >
          {subCategories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer p-1 rounded text-sm ${
                category.name === selectedCategory
                  ? "font-bold text-white"
                  : "hover:bg-white hover:text-red-800"
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && handleCategoryClick(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="relative">
          <button
            onClick={() => !isLoading && setIsDropdownOpen(prev => !prev)}
            className={`bg-white p-2 w-full text-left rounded-md flex justify-between items-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="text-sm font-semibold text-red-800">
              {selectedCategory || "Select a Category"}
            </span>
            <FaChevronDown
              className={`h-3 w-3 text-red-800 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-50 bg-red-800 w-full mt-1 rounded-md shadow-lg border border-white max-h-60 overflow-y-auto">
              {subCategories.map((category) => (
                <li
                  key={category.id}
                  className={`py-2 px-4 text-sm cursor-pointer ${
                    category.name === selectedCategory
                      ? "bg-white text-red-800 font-bold"
                      : "text-white hover:bg-white hover:text-red-800"
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isLoading && handleCategoryClick(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};