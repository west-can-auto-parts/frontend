"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

// Skeletons to avoid layout shift while data loads
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} aria-hidden="true" />
);

const VehiclePageSkeleton = () => (
  <section className='w-10/12 mt-2 md:mt-4 mx-auto flex flex-wrap md:flex-nowrap gap-4'>
    <div className="w-full md:w-3/4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="bg-white p-3 space-y-2">
            <Skeleton className="h-[100px] rounded" />
            <Skeleton className="h-4 w-3/4 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
    <div className="w-full md:w-1/4 flex flex-col gap-4">
      {[0, 1].map((key) => (
        <div key={key} className="w-full rounded-md overflow-hidden shadow-md">
          <Skeleton className="h-48 w-full" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SuppliersPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://clientsidebackend.onrender.com/api/vehicles"
    : "http://localhost:8080/api/vehicles";

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
        setFilteredVehicles(data);

        const brands = Array.from(new Set(data.map(v => v.name)));
        setUniqueBrands(["All", ...brands]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [apiUrl]);

  const handleFilter = (brand) => {
    if (brand === "All") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter(vehicle => vehicle.name === brand));
    }
    setCurrentPage(1);
  };

  const stringToSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleVehicleClick = (vehicle) => {
    const slug = stringToSlug(vehicle.name);
    router.push(`/vehicle/${slug}`);
  };

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <VehiclePageSkeleton />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section className='w-10/12 mt-2 md:mt-4 mx-auto flex flex-wrap md:flex-nowrap gap-4'>
      <div className="w-full md:w-3/4">
        {/* Vehicle Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 cursor-pointer">
          {currentVehicles.map((vehicle, index) => (
            <div key={index} className="bg-white p-3" onClick={() => handleVehicleClick(vehicle)}>
              <div
                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2"
                style={{ backgroundImage: `url(${vehicle.imageUrl})` }}
              />
              <p className="text-center text-xs text-gray-800 font-semibold">{vehicle.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col gap-4">
        <div className="w-full text-center bg-cover bg-center rounded-md overflow-hidden shadow-md" style={{ backgroundImage: `url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809388/pikaso_texttoimage_auto-parts-in-red-black-and-white-theme-_2_pb0jrl.jpg)` }}>
          <div className="p-8 bg-[#00000080] text-white">
            <p className="text-xl font-semibold pb-6">
              Vehicles
            </p>
            <p className='text-justify text-sm pb-3'>
              Explore our extensive vehicle database for brands and models that define performance and reliability. Click on a brand to view its models and find the right parts for your ride.
            </p>
          </div>
        </div>
        <div className="w-full text-center bg-cover bg-center rounded-md overflow-hidden shadow-md" style={{ backgroundImage: `url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809543/pikaso_texttoimage_auto-parts-store-receoption-desk-in-red-black-and-_1_tk1ehb.jpg)` }}>
          <div className="p-8 bg-[#00000080] text-white">
            <p className="text-xl font-semibold pb-6">
              About Vehicles
            </p>
            <p className='text-justify text-sm pb-3'>
              Our vehicle listings include detailed information, brand logos, and more. Dive into specific brands to uncover their complete model lineups and find what suits your automotive needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuppliersPage;
