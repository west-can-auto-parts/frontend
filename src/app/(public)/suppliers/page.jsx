"use client"

import React, { useState,useEffect } from 'react';
import {FaChevronDown} from 'react-icons/fa'
import { useRouter } from "next/navigation";


const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [uniqueHeadings, setUniqueHeadings] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Adjust as needed

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://westcanuserbackend.onrender.com/api/suppliers/all"
    : "http://localhost:8080/api/suppliers/all";

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        setSuppliers(data);
        setFilteredSuppliers(data);
        
        // Extract unique categories (assuming `category` is an array)
        const categories = new Set();
        data.forEach((supplier) => {
          if (supplier.category) {
            categories.add(supplier.category);
          }
        });

        setUniqueHeadings([...categories]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [apiUrl]);

  function stringToSlug(str) {
    str = str.replace("&", "and")
            .replace("/", "_")
            .replace("-","+");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -_]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  const handleFilter = (heading) => {
    if (heading === "All") {
      setFilteredSuppliers(suppliers);
    } else {
      setFilteredSuppliers(suppliers.filter((supplier) => supplier.category === heading));
    }
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSupplierClick = (supplier) => {
    const brand = stringToSlug(supplier.name);
    router.push(`/suppliers/${brand}`);
  };
  
  

  return (
    <section className='w-10/12 mt-2 md:mt-4 mx-auto flex flex-wrap md:flex-nowrap gap-4'>
     <div className="w-full md:w-3/4">
        {/* Loading and Error Handling */}
        {loading && <p className="text-center text-gray-600">Loading suppliers...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {/* Mobile Dropdown */}
        <div className="block md:hidden mb-6">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="border-[#b12b29] text-[#b12b29] px-2 py-1 rounded-md w-fit text-xs flex gap-3 items-center"
          >
            Select Category <FaChevronDown className="h-2 w-2" />
          </button>
          {isDropdownOpen && (
            <div className="flex flex-col gap-2 mt-2">
              <button onClick={() => handleFilter("All")} className="bg-[#b12b29] text-white px-2 py-1 rounded-md">
                All
              </button>
              {uniqueHeadings.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => handleFilter(cat)}
                  className="bg-[#b12b29] text-white px-2 py-1 rounded-md"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex justify-between gap-4 pb-6 text-sm">
          <button onClick={() => handleFilter("All")} className="bg-[#b12b29] text-white px-2 py-2 rounded-md w-full">
            All
          </button>
          {uniqueHeadings.map((cat, index) => (
            <button key={index} onClick={() => handleFilter(cat)} className="bg-[#b12b29] text-white px-2 py-1 rounded-md w-full">
              {cat}
            </button>
          ))}
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer">
          {currentSuppliers.map((supplier, index) => (
            supplier.imageUrl ? (
              <div key={index} className="bg-white p-3" onClick={() => handleSupplierClick(supplier)}>
                <div
                  className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2"
                  style={{ backgroundImage: `url(${supplier.imageUrl})` }}
                />
                <p className="text-center text-xs text-gray-500 font-semibold">{supplier.name}</p>
              </div>
            ) : null
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-[#b12b29] text-white px-4 py-2 rounded-md disabled:opacity-50">
            Previous
          </button>
          <span className="text-gray-700 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-[#b12b29] text-white px-4 py-2 rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/4 flex flex-col gap-4">
        <div className="w-full text-center bg-cover bg-center rounded-md overflow-hidden shadow-md" style={{ backgroundImage: `url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809388/pikaso_texttoimage_auto-parts-in-red-black-and-white-theme-_2_pb0jrl.jpg)` }}>
          <div className="p-8 bg-[#00000080] text-white">
            <p className="text-xl font-semibold pb-6">
              Suppliers
            </p>
            <p className='text-justify text-sm pb-3'>
              Drive your passion with confidence by choosing our premium Replacement Parts and tools from our highly trusted network of suppliers. We've partnered with industry-leading experts to bring you a vast collection of high-performance components for every make and model. From engines and transmissions to lighting and interior accessories, our suppliers deliver top-notch quality and reliability.</p>
            <p className='text-justify text-sm pb-3'>
              Empower your DIY projects with our exceptional automotive tools procured from different suppliers. Be it wrenches and socket sets to diagnostic equipment and power tools, our suppliers offer unbeatable quality and durability. Our handpicked partners are the driving force behind our vast inventory of high-quality parts.</p>
            <p className='text-justify text-sm pb-3'>
              Also, don't forget to equip your workplace for success with our premier industrial supplies. We've partnered with some of the top notch suppliers to offer an extensive range of high-quality products that meet the demands of your business. Safety equipment, tools to maintenance supplies and materials, you name it all!
            </p>
          </div>
        </div>
        <div className="w-full text-center bg-cover bg-center rounded-md overflow-hidden shadow-md" style={{ backgroundImage: `url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809543/pikaso_texttoimage_auto-parts-store-receoption-desk-in-red-black-and-_1_tk1ehb.jpg)` }}>
          <div className="p-8 bg-[#00000080] text-white">
            <p className="text-xl font-semibold pb-6">
            About Suppliers
            </p>
            <p className='text-justify text-sm pb-3'>
            With West Can Auto Parts, you can discover a network of reliable suppliers who share your passion for quality. Our Suppliers section connects you with a diverse range of handpicked vendors, ensuring you have access to the finest products. We take immense pride in collaborating with reliable suppliers who deliver excellence. Our network is carefully curated to bring you top-quality products, handpicked from trusted sources. With our Suppliers, you can trust that your orders will be fulfilled with professionalism and efficiency, enabling you to provide an exceptional shopping experience. Explore our Suppliers today where exceptional partnerships are forged!</p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuppliersPage;