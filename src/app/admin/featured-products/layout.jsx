import React from 'react'
import Link from 'next/link'
const layout = ({ children }) => {
  const navLinks = [

    {
      label: "View & Edit Products",
      slug: '/list'
    },
    {
      label: "Add Products",
      slug: '/'
    },

  ]
  return (
    <div>
      <p className="text-2xl font-bold pb-6">Managing Jobs</p>
      <div className="w-full flex gap-4">
        {
          navLinks.map((navLink, index) => (
            <Link key={index} className='font-semibold transition hover:text-[#b21b29] py-1 rounded-sm text-sm' href={`/admin/featured-products/${navLink.slug}`}>
              {navLink.label}
            </Link>
          ))
        }
      </div>
      {children}</div>
  )
}

export default layout