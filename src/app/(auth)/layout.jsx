import React from 'react'
import bgImage from '@/assets/login_image.jpeg'

const layout = ({ children }) => {
    return (
        <main className='min-h-screen flex flex-wrap md:flex-nowrap'>
            <div className="hidden md:block w-full md:w-1/2" style={{backgroundImage:`url(${bgImage.src})`}}></div>
            <div className="w-full md:w-1/2 p-2 md:p-4 flex items-center justify-center">
                {children}
            </div>
        </main>
    )
}

export default layout