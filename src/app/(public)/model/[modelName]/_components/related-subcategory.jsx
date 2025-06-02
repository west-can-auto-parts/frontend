"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const RelatedSubCategory = ({ subCategories = [], onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    setIsDropdownOpen(false);
  };

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
              key={category.name}
              className={`cursor-pointer p-1 rounded text-sm ${
                category.name === selectedCategory
                  ? "font-bold text-white"
                  : "hover:bg-white hover:text-red-800"
              }`}
              onClick={() => handleCategoryClick(category)}
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
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="bg-white p-2 w-full text-left rounded-md flex justify-between items-center"
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
                  key={category.name}
                  className={`py-2 px-4 text-sm cursor-pointer ${
                    category.name === selectedCategory
                      ? "bg-white text-red-800 font-bold"
                      : "text-white hover:bg-white hover:text-red-800"
                  }`}
                  onClick={() => handleCategoryClick(category)}
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
