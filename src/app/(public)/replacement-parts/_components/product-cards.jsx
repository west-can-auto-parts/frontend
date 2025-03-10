"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTh, FaThLarge, FaBars, FaList } from 'react-icons/fa';

import { Grid4Layout } from './grid-4-layout'
import { Grid3Layout } from './grid-3-layout'
import { Grid1Layout } from './grid-1-layout'
import { ListLayout } from './list-layout'


export const ProductCards = ({ parts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // Default number of products per page
  const [layout, setLayout] = useState('grid-4'); // Default layout is 4-column grid

  // Directly use parts since it's already flat
  const allParts = parts;

  // Calculate the index range of products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allParts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(allParts.length / productsPerPage);

  // Handler for pagination buttons
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler for changing the number of products per page
  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value)); // Update the products per page
    setCurrentPage(1); // Reset to the first page when the number of products per page changes
  };

  // Handler for changing layout
  const handleLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <div>
      {/* Layout and Products Per Page Controls */}
      <div className="mb-4 flex justify-between items-center bg-white border-2 border-gray-100 py-2 px-2 z-50">
        {/* Layout Control */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleLayoutChange('grid-4')}
            className={`p-2 ${layout === 'grid-4' ? 'bg-[#b12b29] text-white' : ''}`}
          >
            <FaThLarge /> {/* 4 Column Layout */}
          </button>
          <button
            onClick={() => handleLayoutChange('grid-3')}
            className={`p-2 ${layout === 'grid-3' ? 'bg-[#b12b29] text-white' : ''}`}
          >
           <FaTh /> {/* 3 Column Layout */}
          </button>
          <button
            onClick={() => handleLayoutChange('grid-1')}
            className={`p-2 ${layout === 'grid-1' ? 'bg-[#b12b29] text-white' : ''}`}
          >
            <FaBars /> {/* 1 Column Layout */}
          </button>
          <button
            onClick={() => handleLayoutChange('list')}
            className={`p-2 ${layout === 'list' ? 'bg-[#b12b29] text-white' : ''}`}
          >
             <FaList /> {/* Detailed List Layout */}
          </button>
        </div>

        {/* Products Per Page Input */}
        <div className="flex items-center space-x-2">
          <label htmlFor="productsPerPage" className="text-sm font-medium">
            Products per page:
          </label>
          <input
            type="number"
            id="productsPerPage"
            min="1"
            max={allParts.length}
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
            className="border px-2 py-1 w-16 text-center"
          />
        </div>
      </div>

      {/* Render appropriate layout */}
      {layout === 'grid-4' && <Grid4Layout products={currentProducts} />}
      {layout === 'grid-3' && <Grid3Layout products={currentProducts} />}
      {layout === 'grid-1' && <Grid1Layout products={currentProducts} />}
      {layout === 'list' && <ListLayout products={currentProducts} />}

      {/* Pagination Controls */}
      <div className="w-full overflow-x-auto flex justify-start mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border ${i + 1 === currentPage ? 'bg-[#b12b29] text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
