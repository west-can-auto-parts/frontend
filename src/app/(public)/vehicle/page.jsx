"use client"

import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa'
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
    ? "https://clientsidebackend.onrender.com/api/suppliers/all"
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
    str = str.replace("&", "and");
    str = str.replace(/,/g, "~");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
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
    router.push(`/vehicle/${brand}`);
  };

  const vehicles = [
    {
      id: 1,
      name: "Toyota Camry",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 2,
      name: "Honda Civic",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 3,
      name: "Ford F-150",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Truck"
    },
    {
      id: 4,
      name: "Chevrolet Silverado",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    },
    {
      id: 5,
      name: "Nissan Altima",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2020,
      type: "Sedan"
    },
    {
      id: 6,
      name: "Hyundai Elantra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 7,
      name: "Kia Sorento",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 8,
      name: "Mazda CX-5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 9,
      name: "Subaru Outback",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Wagon"
    },
    {
      id: 10,
      name: "Volkswagen Jetta",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 11,
      name: "BMW 3 Series",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 12,
      name: "Mercedes-Benz C-Class",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 13,
      name: "Audi Q5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 14,
      name: "Jeep Wrangler",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 15,
      name: "Tesla Model 3",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 16,
      name: "Chevrolet Equinox",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 17,
      name: "Toyota RAV4",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 18,
      name: "Honda CR-V",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 19,
      name: "Ford Escape",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 20,
      name: "GMC Sierra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    }
  ];

  return (
    <section className='w-10/12 mt-2 md:mt-4 mx-auto flex flex-wrap md:flex-nowrap gap-4'>
      <div className="w-full md:w-3/4">
        {/* Loading and Error Handling */}
        {loading && <p className="text-center text-gray-600">Loading suppliers...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Suppliers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white p-3" onClick={() => handleSupplierClick(vehicle)}>
              <div
                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2"
                style={{ backgroundImage: `url(${vehicle.imageUrl})` }}
              />
              <p className="text-center text-xs text-gray-800 font-semibold">{vehicle.name}</p>
              <p className="text-center text-xs text-gray-500">{vehicle.year} • {vehicle.type}</p>
            </div>
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