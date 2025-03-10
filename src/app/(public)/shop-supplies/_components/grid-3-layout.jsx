import React from 'react'

export const Grid3Layout = ({ products, handleClick, stringToSlug }) => {
 return(
    <div className="grid grid-cols-2 md:grid-cols-3">
      {products.map((part, index) => (
        <div
          key={index}
          className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100"
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