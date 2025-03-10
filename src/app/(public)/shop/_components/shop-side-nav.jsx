"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export const SideNav = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const router = useRouter();
    const toggleCategory = useCallback(
        (category) => {
            setSelectedCategory((prevCategory) =>
                prevCategory === category ? null : category
            );
        },
        []
    );
    const handleNavigation = useCallback(
        (partTitle, subPartListing, itemListing) => {
            router.push(`/shop/${partTitle}/${subPartListing}/${itemListing}`);
        },
        [router]
    );

    


    return (
        <div className="hidden md:block">
            {parts.map((part, index) => (
                <div key={index}>
                    <p className="font-bold py-3">{part.title}</p>
                    {part.subParts.map((category, index) => (
                        <div key={index} className="my-4">
                            <h3
                                className="font-semibold mb-2 cursor-pointer text-sm"
                                onClick={() => toggleCategory(category.listing)}
                            >
                                {category.listing}
                            </h3>
                            {selectedCategory === category.listing && (
                                <ul className="text-sm">
                                    {category.parts.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() =>
                                                handleNavigation(
                                                    part.title,
                                                    category.listing,
                                                    item.listing
                                                )
                                            }
                                            className="text-gray-500 mb-1 cursor-pointer"
                                        >
                                            {item.listing}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

