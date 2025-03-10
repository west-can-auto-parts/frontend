import Usps from '@/app/(public)/product-view/_components/Usps'

import { FaShoppingCart } from 'react-icons/fa'

import React from 'react'

export const ProductDescription = ({myProduct}) => {
  return (
    <div className='w-full md:w-1/2'>
        <h1 className="text-2xl font-bold mb-2 py-2">{myProduct.listing}</h1>
        <p className="text-xs md:text-sm text-justify">{myProduct.content}</p>
        <div className="py-2 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
            {myProduct.tags.map(tag=>(
                <p className='bg-gray-200 font-semibold px-2 rounded-md'>{tag}</p>
            ))}
        </div>
        <Usps/>
        <div className="flex flex-col md:flex-row md:flex-nowrap w-full gap-2 md:gap-4">
            <button className='bg-white border-2 rounded-md px-4 py-2 text-[#b12b29] w-full md:w-1/2'>Have an Enquirty</button>
        <button className='bg-[#b12b29] text-white px-4 py-2 rounded-md w-full md:w-1/2 flex items-center justify-center gap-2'>
               <FaShoppingCart className='w-5 h-5'/> Shop Now
            </button>
            
        </div>
    </div>
  )
}
