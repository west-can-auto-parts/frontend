import React from 'react'
import Link from 'next/link'

export const BreadCrumbs = ({mainCat, cat, product}) => {
  return (
    <div className="w-10/12 mx-auto items-center py-2 md:py-4 flex flex-wrap gap-2 text-xs md:text-sm">
        <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/shop`}>Shop</Link>
        / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/shop`}>{mainCat}</Link>
        / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/shop/${mainCat}/${cat}`}>{cat}</Link>
        / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/shop/${mainCat}/${product}`}>{product}</Link>
    

    </div>
  )
}
