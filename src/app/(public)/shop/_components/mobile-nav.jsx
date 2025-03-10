"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";


export const MobileNav = () => {
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubPart, setSelectedSubPart] = useState([]);
    const [selectedPart, setSelectedPart] = useState("");
    const router = useRouter();

    const handleSearchClick = () => {
        if (title && selectedCategory && selectedPart) {
            router.push(`/shop/${title}/${selectedCategory}/${selectedPart}`);
        }
    };

    const handleSubPartChange = useCallback((subPart) => {
        setSelectedSubPart(subPart.parts);
    }, []);

    return (
        <div className="block md:hidden text-sm">
            <select
                className="w-full p-2 my-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b21b29]"
                onChange={(e) => {
                    const subPart = parts
                        .flatMap((part) => part.subParts)
                        .find((subPart) => subPart.listing === e.target.value);
                    handleSubPartChange(subPart || {});
                    setSelectedCategory(subPart?.listing || "");
                    setTitle(subPart ? parts.find((part) => part.subParts.includes(subPart)).title : "");
                }}
            >
                <option value="">Select Category</option>
                {parts.map((part) =>
                    part.subParts.map((subPart) => (
                        <option key={subPart.listing} value={subPart.listing}>
                            {subPart.listing}
                        </option>
                    ))
                )}
            </select>
            <select
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#b21b29]"
                onChange={(e) => setSelectedPart(e.target.value)}
            >
                <option value="">Select Part</option>
                {selectedSubPart.map((part) => (
                    <option key={part.listing} value={part.listing}>
                        {part.listing}
                    </option>
                ))}
            </select>
            <button
                className="bg-[#b21b29] text-white px-4 py-1 rounded-md"
                onClick={handleSearchClick}
            >
                Search
            </button>
        </div>
    )
}

