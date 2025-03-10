import React from 'react'

export const PartTags = ({ tags }) => {
    return (
        <div className="border-t-2 p-6">
            <p className="text-lg font-semibold pb-4">
                Tags
            </p>
            <div className="flex flex-wrap gap-2">
                {
                    tags.map((tag, index) => (
                        <p key={index} className='bg-[#b21b29] text-white px-2 rounded-md'>
                            {tag}
                        </p>
                    ))
                }
            </div>
        </div>
    )
}
