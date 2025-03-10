"use client";

import React, { useState, useEffect } from "react";
import { ProductCards } from "./_components/product-cards";
import { PageHeading } from "@/components/page-heading";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? 'https://westcanuserbackend.onrender.com/api/product'
  : 'http://localhost:8080/api/product';

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/category`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        const filteredCategories = data.filter(
          (category) =>
            category.name === "Tools & Equipments" ||
            category.name === "Industrial & Safety"
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
          // Call the endpoint to fetch all products when no filters are applied
          url = `${apiUrl}/product-category/category/${"Tools & Equipments"}`;
        } else {
          if (selectedCategory) {
            url += `?category=${selectedCategory}`;
          }

          if (selectedSubcategory) {
            // If a subcategory is selected, append it
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


  const handleSubCategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };



  return (
    <section>
      <PageHeading siteTitle="Replacement Parts" />
      <div className="w-10/12 mx-auto py-2 md:py-4">
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-1/4 md:sticky md:top-24 h-fit">
            <div className="w-full bg-white rounded-md px-4 py-6 h-fit relative">
              {/* Category Filter */}
              <p className="text-[#b12b29] font-semibold text-xs md:text-sm pb-2">
                Filter By Category
              </p>
              <select
                value={selectedCategory || ""}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(""); // Reset subcategory on category change
                }}
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

              {/* Subcategory Filter */}
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
                  {selectedCategory ? "Select a subcategory" : "Select a category first"}
                </option>
                {subcategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Cards */}
          <div className="w-full md:w-3/4">
            <ProductCards parts={filteredParts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
