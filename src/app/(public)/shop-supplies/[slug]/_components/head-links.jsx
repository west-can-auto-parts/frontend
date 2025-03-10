import React from 'react'
import Link from 'next/link'

export const BreadCrumbs = ({ categoryType, categorySlug, parentCategorySlug, parentCategory, productSlug, productLising }) => {
  return (
    <div className=" mx-auto items-center py-2 md:py-4 flex flex-wrap gap-2 text-xs md:text-sm">
      <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/categories`}>Categories</Link>
      / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`${categorySlug}`}>{categoryType}</Link>
      / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/shop/${parentCategorySlug}`}>{parentCategory}</Link>
      / <Link className='bg-gray-200 font-semibold px-2 py-1 rounded-md' href={`/${categorySlug}/${productSlug}`}>{productLising}</Link>


    </div>
  )
}
