"use client";

import React from 'react'
import { useRouter } from "next/navigation";

export const ListLayout = ({ products }) => {

    const router = useRouter();
    function stringToSlug(str) {
      str = str.replace("&", "and");
    
      return str
        .toLowerCase()          
        .trim()                 
        .replace(/[^a-z0-9 -]/g, "")  
        .replace(/\s+/g, "-")         
        .replace(/--+/g, "-");       
    }
  
    const handleClick = (listing, category) => {
      const categorySlug = category === 'Replacement Parts' || category === 'Fluids & Lubricants'
        ? 'replacement-parts'
        : 'shop-supplies';
  
        const slug = stringToSlug(listing); // Convert listing to a slug
        router.push(`/${categorySlug}/${slug}`);
    };

  return (
    <div className="flex flex-col">
    {products.map((part, index) => (
      <div
        key={index}
        className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 flex items-center space-x-4 cursor-pointer"
        onClick={() => handleClick(part.name, part.categoryName, part.subCategoryName)}
      >
        <img
          src={part.imageUrl[0]}
          alt={part.name}
          className="w-72 h-72 object-contain"
        />
        <div className="flex-grow">
          <h3 className="font-semibold mb-2 text-left text-sm">{part.name}</h3>
          <p className="text-gray-500 text-left text-sm">{part.description}</p>
          <p className="text-[#b12b29] mt-4 font-semibold text-left text-xs">View Products</p>
        </div>
      </div>
    ))}
  </div>
  )
}
