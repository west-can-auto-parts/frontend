"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export const PartSupplier = ({ subCategoryName }) => {
  const [showMore, setShowMore] = useState(false);
  const [suppliers, setSuppliers] = useState([]); // State to hold suppliers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  // Ensure `mySubPart` is valid and has the required property
  const currentListing = subCategoryName || "";
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/suppliers'
    : 'http://localhost:8080/api/suppliers';

  const router = useRouter();

  function stringToSlug(str) {
    str = str.replace("&", "and")
            .replace("/", "_");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -_]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }
  // Fetch suppliers by product category from the backend
  useEffect(() => {
    if (!subCategoryName || !subCategoryName.brandAndPosition) return;

    const fetchSuppliers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const allSuppliers = await response.json();
        console.log("SupplierList: ", allSuppliers);

        // Filter and sort suppliers based on brandAndPosition
        const brandPositions = subCategoryName.brandAndPosition || {};
        const filteredAndSortedSuppliers = allSuppliers
          .filter(supplier => brandPositions[supplier.id] !== undefined)
          .sort((a, b) => {
            const positionA = brandPositions[a.id] || 0;
            const positionB = brandPositions[b.id] || 0;
            return positionA - positionB;
          });

        setSuppliers(filteredAndSortedSuppliers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [subCategoryName, apiUrl]);

  const handleSupplierClick = (supplier) => {
    const brand = stringToSlug(supplier.name);
    router.push(`/suppliers/${brand}`);
  };

  // Show limited suppliers on mobile, all on desktop
  const suppliersToDisplay = isMobile && !showMore ? suppliers.slice(0, 4) : suppliers.slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center py-2 md:py-4">
        <p className="text-xl font-bold py-2 md:py-4">Our Suppliers</p>
        <a
          href="/suppliers"
          className="text-[#b21b29] border border-[#b21b29] rounded px-3 py-1 font-semibold text-sm hover:bg-[#b21b29] hover:text-white transition-colors"
        >
          View All
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4" >
        {suppliersToDisplay.map((supplier) =>
          supplier.imageUrl ? (
            <div key={supplier.id} className="bg-white p-3">
              <div
                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2" onClick={() => handleSupplierClick(supplier)}
                style={{ backgroundImage: `url(${supplier.imageUrl})` }}
              />
              <p className="text-center text-xs text-gray-500 font-semibold">
                {supplier.name}
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
