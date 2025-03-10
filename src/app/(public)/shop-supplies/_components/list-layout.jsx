import React from 'react'

export const ListLayout = ({ products, handleClick, stringToSlug }) => {
  return (
    <div className="flex flex-col">
    {products.map((part, index) => (
      <div
        key={index}
        className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 flex items-center space-x-4"
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
