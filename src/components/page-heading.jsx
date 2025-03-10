"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export const PageHeading = ({siteTitle}) => {
    const router = useRouter()
  return (
    <div className='w-10/12 mx-auto py-2 md:pt-6'>
        <div className="flex flex-wrap gap-2 text-xs mb-6">
            <span className='bg-gray-200 px-2 py-1 rounded-md' onClick={()=> router.push('/')}>Home</span> <span className='bg-gray-200 px-2 py-1 rounded-md'>{siteTitle}</span>
        </div>
        <h1 className='text-2xl font-bold'>{siteTitle}</h1>
    </div>
  )
}
