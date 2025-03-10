import React from 'react'
import Link from 'next/link'
const layout = ({ children }) => {
    const navLinks = [

        {
            label: "View & Edit Blogs",
            slug: '/'
        },
        {
            label: "Create Blog",
            slug: 'upload'
        },

    ]
    return (
        <div>
            <div className="w-full flex gap-4 pb-6">
                {
                    navLinks.map((navLink, index) => (
                        <Link key={index} className='font-semibold transition hover:text-[#b21b29] py-1 rounded-sm text-sm' href={`/admin/blogs/${navLink.slug}`}>
                            {navLink.label}
                        </Link>
                    ))
                }
            </div>
            {children}
        </div>
    )
}

export default layout