import React from 'react'

export const Grid1Layout = ({ products, handleClick, stringToSlug }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
    {products.map((part, index) => (
      <div
        key={index}
        className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 flex items-center gap-2 md:gap-4"
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
