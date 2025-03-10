"use client";

import React, { useEffect, useState } from 'react';
import { PageHeading } from '@/components/page-heading';
import { ProductCards } from './_components/product-cards';

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://westcanuserbackend.onrender.com/api/product'
        : 'http://localhost:8080/api/product';

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${apiUrl}/category`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch subcategories whenever selectedCategory changes
    useEffect(() => {
        const fetchSubcategories = async () => {
            if (selectedCategory) {
                try {
                    const response = await fetch(`${apiUrl}/subcategory/category/${selectedCategory}`);
                    const data = await response.json();
                    setSubcategories(data);
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            } else {
                setSubcategories([]);
            }
        };
        fetchSubcategories();
    }, [selectedCategory]);

    // Fetch filtered parts whenever filters change
    useEffect(() => {
        const fetchFilteredParts = async () => {
            try {
                let url = `${apiUrl}/product-category`;

                if (!selectedCategory && !selectedSubcategory) {
                    url = `${apiUrl}/product-category/all`;
                } else {
                    if (selectedCategory) {
                        url += `?category=${selectedCategory}`;
                    }
                    if (selectedSubcategory) {
                        url += `&subcategory=${selectedSubcategory}`;
                    }
                }

                const response = await fetch(url);
                const data = await response.json();
                setFilteredParts(data);
            } catch (error) {
                console.error("Error fetching filtered parts:", error);
            }
        };
        fetchFilteredParts();
    }, [selectedCategory, selectedSubcategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(null);
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const handleCategoryExpand = (categoryId) => {
        // Toggle category expansion
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
        // Automatically select the category if it is expanded
        if (expandedCategory !== categoryId) {
            setSelectedCategory(categoryId);
        }
    };

    return (
        <section>
            <PageHeading siteTitle={"Categories"} />
            <div className="w-10/12 mx-auto py-2 md:py-4">
                <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <div className="w-full md:w-1/4 md:sticky md:top-24 h-fit">
                        {showAllCategories ? (
                            <div className="w-full bg-white rounded-md px-4 py-6 h-fit relative">
                                <p className="text-[#b12b29] font-semibold text-xs md:text-sm pb-2">
                                    All Categories
                                </p>
                                {categories.map((category) => (
                                    <div key={category.id} className="mb-4">
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => handleCategoryExpand(category.id)}
                                        >
                                            <span className="font-semibold">{category.name}</span>
                                            <span>
                                                {expandedCategory === category.id ? "-" : "+"}
                                            </span>
                                        </div>
                                        {expandedCategory === category.id && (
                                            <div className="pl-4 pt-2">
                                                {subcategories
                                                    .map((subCategory) => (
                                                        <div key={subCategory.id} className="py-1">
                                                            <span
                                                                className="text-sm text-gray-700 cursor-pointer"
                                                                onClick={() => setSelectedSubcategory(subCategory.id)}
                                                            >
                                                                {subCategory.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    className="px-4 w-full py-2 mt-4 rounded-md bg-[#b12b29] text-white"
                                    onClick={() => setShowAllCategories(false)}
                                >
                                    Back to Filter View
                                </button>
                            </div>
                        ) : (
                            <div className="w-full bg-white rounded-md px-4 py-6 h-fit relative">
                                <p className="text-[#b12b29] font-semibold text-xs md:text-sm pb-2">
                                    Filter By Category
                                </p>
                                <select
                                    value={selectedCategory || ""}
                                    onChange={handleCategoryChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <p className="text-[#b12b29] font-semibold text-xs md:text-sm py-2 mt-4">
                                    Filter By Subcategory
                                </p>
                                <select
                                    value={selectedSubcategory || ""}
                                    onChange={handleSubCategoryChange}
                                    className="w-full p-2 border rounded-md"
                                    disabled={!selectedCategory}
                                >
                                    <option value="" disabled>
                                        {selectedCategory
                                            ? "Select a subcategory"
                                            : "Select a category first"}
                                    </option>
                                    {subcategories.map((subCategory) => (
                                        <option key={subCategory.id} value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {!showAllCategories && (
                            <div className="rounded bg-black text-white mt-4">
                                <div className="p-4">
                                    <p className="text-lg font-bold mb-4">Confused on What To Buy?</p>
                                    <button
                                        className="px-4 w-full py-2 rounded-md bg-[#b12b29]"
                                        onClick={() => setShowAllCategories(true)}
                                    >
                                        View Our Catalogue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-3/4">
                        <ProductCards parts={filteredParts} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
