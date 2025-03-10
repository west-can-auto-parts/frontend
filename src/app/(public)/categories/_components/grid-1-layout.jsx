"use client";

import React from 'react'
import { useRouter } from "next/navigation";

export const Grid1Layout = ({ products }) => {

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
    <div className="grid grid-cols-1 gap-4">
    {products.map((part, index) => (
      <div
        key={index}
        className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 flex items-center gap-2 md:gap-4 cursor-pointer"
        onClick={() => handleClick(part.name, part.categoryName, part.subCategoryName)}
      >
        <img
          src={part.imageUrl[0]}
          alt={part.description}
          className="w-24 md:w-48 h-24 md:h-48 object-contain"
        />
        <div>
        <div className='flex flex-col justify-center '>
        <h3 className="font-semibold mb-2 text-left text-sm md:text-xl">{part.name}</h3>
        <p className="text-gray-500 text-left text-sm line-clamp-2">{part.description}</p>



        <div className="flex flex-wrap ga-2 md:gap-3 my-2">
          {
            part.tags.map(tag=>(<p className='bg-[#b12b29] text-white px-2 py-1 rounded-md text-xs'>
              {tag}
            </p>))
          }
        </div>
        <p className="text-[#b12b29] text-left text-xs mt-2 ">View Product</p>
        </div>
        </div>
      </div>
    ))}
  </div>
  )
}
