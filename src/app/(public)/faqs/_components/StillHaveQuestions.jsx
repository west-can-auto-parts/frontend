import React from 'react'
import Link from 'next/link'
const StillHaveQuestions = () => {
    return (
        <div className='w-full rounded-md text-white overflow-hidden' style={{ backgroundImage: `url(https://img.freepik.com/premium-photo/diverse-car-engines-displayed-organized-warehouse-setting-with-colorful-branding-signs_937679-45044.jpg?w=1380)` }}>
            <div className="w-full h-full bg-[#00000080] text-white p-8">
                <p className="text-2xl font-bold mb-3">Still Have Questions</p>
                <p className='text-sm mb-3'>
                    We'll Be Happy To Answer Any Questions You May Have
                </p>
                <Link href={'/contact-us'} className='mt-3'>
                    <button className='bg-[#b12b29] text-white px-2 py-1 rounded-md text-sm'>Contact Us</button>
                </Link>
            </div>
        </div>
    )
}

export default StillHaveQuestions