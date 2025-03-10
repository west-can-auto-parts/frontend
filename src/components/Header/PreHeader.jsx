import React from 'react'
import Link from 'next/link'

import CanadianFlag from '@/assets/globals/canadaFlag.webp'

const navItems = [
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/careers', label: 'Careers' }
];

const PreHeader = () => {
    return (
        <div className='border-b-2 py-1 border-[#00000010] w-full hidden lg:block'>
            <div className="w-10/12 mx-auto flex justify-between">
                <div className='flex gap-2 text-gray-600 text-sm'>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <p className='rounded-full px-3 py-1 hover:text-black transition duration-300'>
                                {item.label}
                            </p>
                        </Link>
                    ))}
                </div>
                <div className='flex items-center text-sm text-gray-800 gap-2'>
                    <div className=''>
                        {/* <FaCanadianMapleLeaf className='h-5 w-5 rounded-full text-white ' /> */}
                        <img src={CanadianFlag.src} className=' h-5' alt="" srcSet
="" />
                    </div>    <span className='font-semibold text-[#b91b29]'>
                    Proudly Canadian!
                    </span>

                </div>
                <div className='flex gap-3 items-center text-sm'>
                    {/* <p className='text-gray-600'>
                        Compare : <b className='text-black'>0</b>
                    </p> */}
                    <p className='text-gray-600'>
                        Currency : <b className='text-black'>CAD</b>
                    </p>
                    <p className='text-gray-600'>
                        Language : <b className='text-black'>EN</b>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreHeader
