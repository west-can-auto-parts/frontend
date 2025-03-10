import React from 'react'
import Link from 'next/link'
import { FaHome, FaWrench, FaWhatsapp, FaLocationArrow, } from 'react-icons/fa'
import { GiMechanicGarage } from "react-icons/gi";


export const MobileNavs = () => {

    return (
        <div className='grid grid-cols-4 md:hidden fixed bottom-0 w-full bg-white border-t-2 border-gray-200 z-50 py-1 shadow-md'>
            <Link href={'/'} className='flex flex-col items-center justify-center gap-1'>
                <FaHome className='h-5 w-5 text-red-800' />
                <span className='text-center text-xs'>Home</span>
            </Link>
            <Link href={'/categories'} className='flex flex-col items-center justify-center gap-1'>
                <GiMechanicGarage className='h-5 w-5 text-red-800' />
                <span className='text-center text-xs'>Products</span>

            </Link>
            <Link href={'/store'} className='flex flex-col items-center justify-center gap-1'>
                <FaLocationArrow className='h-5 w-5 text-red-800' />
                <span className='text-center text-xs'>Stores</span>
            </Link>
            <Link href={'https://wa.me/16045948800'} className='flex flex-col items-center justify-center gap-1'>

                <FaWhatsapp className='h-5 w-5 text-green-700 rounded-full'  />
                <span className='text-center text-xs'>WhatsApp</span>
            </Link>

        </div>

    )
}
