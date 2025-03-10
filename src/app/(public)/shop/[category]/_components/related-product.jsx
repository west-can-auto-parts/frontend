"use client";

import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';


export const RelatedProduct = ({subCategoryData}) => {
    const router = useRouter();

    // Handle navigation on click
    const handleClick = (name) => {
        router.push(`/shop/${encodeURIComponent(name)}`);
    };
    return (
        <div className="px-6 py-4">
            <h3 className="font-semibold pb-4">View More Categories</h3>
            <div
                className="flex flex-col gap-2 pt-4 max-h-[300px] overflow-hidden hover:overflow-y-scroll"
                style={{ scrollBehavior: "smooth" }}
            >
                {subCategoryData.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleClick(item.name)}
                    >
                        <p className="text-sm font-semibold hover:underline hover:text-red-800 transition">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
