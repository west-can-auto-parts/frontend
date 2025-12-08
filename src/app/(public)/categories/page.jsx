"use client";

import React, { useEffect, useState } from 'react';
import { PageHeading } from '@/components/page-heading';
import { ProductCards } from './_components/product-cards';

// Lightweight skeletons to avoid layout shift during data fetches
const SidebarSkeleton = () => (
    <div className="w-full bg-white rounded-md px-4 py-6 h-fit animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-28 mb-4" />
        {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-3 bg-gray-200 rounded mb-3" />
        ))}
        <div className="h-10 bg-gray-200 rounded mt-6" />
    </div>
);

const ProductCardsSkeleton = ({ count = 8 }) => (
    <div className="animate-pulse">
        <div className="mb-4 flex justify-between items-center bg-white border-2 border-gray-100 py-2 px-2">
            <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="w-8 h-8 bg-gray-200 rounded" />
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="bg-white p-4 border border-gray-100">
                    <div className="w-full h-40 bg-gray-200 rounded mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
            ))}
        </div>
    </div>
);

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://clientsidebackend.onrender.com/api/product'
        : 'http://localhost:8080/api/product';

    // Fetch categories on mount
    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const response = await fetch(`${apiUrl}/category`);
                const data = await response.json();
                if (isMounted) setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                if (isMounted) setLoadingCategories(false);
            }
        };
        fetchCategories();
        return () => {
            isMounted = false;
        };
    }, []);

    // Fetch subcategories whenever selectedCategory changes
    useEffect(() => {
        let isMounted = true;
        const fetchSubcategories = async () => {
            if (!selectedCategory) {
                setSubcategories([]);
                setLoadingSubcategories(false);
                return;
            }
            setLoadingSubcategories(true);
            try {
                const response = await fetch(`${apiUrl}/subcategory/category/${selectedCategory}`);
                const data = await response.json();
                if (isMounted) setSubcategories(data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                if (isMounted) setLoadingSubcategories(false);
            }
        };
        fetchSubcategories();
        return () => {
            isMounted = false;
        };
    }, [selectedCategory]);

    // Fetch filtered parts whenever filters change
    useEffect(() => {
        let isMounted = true;
        const fetchFilteredParts = async () => {
            setLoadingProducts(true);
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
                if (isMounted) setFilteredParts(data);
            } catch (error) {
                console.error("Error fetching filtered parts:", error);
            } finally {
                if (isMounted) setLoadingProducts(false);
            }
        };
        fetchFilteredParts();
        return () => {
            isMounted = false;
        };
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
                        {loadingCategories ? (
                            <SidebarSkeleton />
                        ) : showAllCategories ? (
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
                                {loadingSubcategories ? (
                                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                                ) : (
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
                                )}
                            </div>
                        )}

                        {!showAllCategories && !loadingCategories && (
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
                        {loadingProducts ? (
                            <ProductCardsSkeleton />
                        ) : (
                            <ProductCards parts={filteredParts} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
