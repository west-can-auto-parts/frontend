"use client";

import React from 'react'
import { useRouter } from "next/navigation";

export const Grid3Layout = ({ products }) => {

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

 return(
    <div className="grid grid-cols-2 md:grid-cols-3">
      {products.map((part, index) => (
        <div
          key={index}
          className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 cursor-pointer"
          onClick={() => handleClick(part.name, part.categoryName, part.subCategoryName)}
        >
          <img
            src={part.imageUrl[0]}
            alt={part.description}
            className="w-full h-40 object-contain"
          />
          <h3 className="font-semibold mb-2 text-center text-sm">{part.description}</h3>
          <p className="text-gray-500 text-center text-xs">View Products</p>
        </div>
      ))}
    </div>
 )
}