"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export const PartSupplier = ({ subCategory }) => {
  const [showMore, setShowMore] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const apiUrl = "/api/suppliers";

  const router = useRouter();

  function stringToSlug(str) {
    if (!str) return "";
    let s = str.replace("&", "and").replace(/,/g, "~");
    return s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  const handleSupplierClick = (supplier) => {
    const brand = stringToSlug(supplier.name);
    router.push(`/suppliers/${brand}`);
  };

  // Normalization for subCategory: supports object map, array of IDs, or array of {id, position}
  const positions = useMemo(() => {
    const out = {};
    if (Array.isArray(subCategory)) {
      if (subCategory.length > 0 && typeof subCategory[0] === "object") {
        // [{ id, position }]
        for (const item of subCategory) {
          if (!item) continue;
          const id = String(item.id ?? "").trim();
          if (id) out[id] = Number(item.position ?? 0) || 0;
        }
      } else {
        // ["id1", "id2", ...] ordered
        subCategory.forEach((rawId, idx) => {
          const id = String(rawId ?? "").trim();
          if (id) out[id] = idx + 1; // 1-based order
        });
      }
    } else if (subCategory && typeof subCategory === "object") {
      // { id: position, ... }
      for (const [rawId, pos] of Object.entries(subCategory)) {
        const id = String(rawId).trim();
        if (id) out[id] = Number(pos ?? 0) || 0;
      }
    }
    return out;
  }, [subCategory]);

  useEffect(() => {
    if (!positions || Object.keys(positions).length === 0) {
      setSuppliers([]);
      return;
    }

    const fetchSuppliers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/all`);
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const allSuppliers = await response.json();

        // Filter and sort by provided positions
        const filteredAndSortedSuppliers = allSuppliers
          .filter((supplier) => {
            const id = String(supplier.id).trim();
            return positions[id] !== undefined;
          })
          .sort((a, b) => {
            const posA = positions[String(a.id).trim()] ?? Infinity;
            const posB = positions[String(b.id).trim()] ?? Infinity;
            return posA - posB;
          });

        setSuppliers(filteredAndSortedSuppliers);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [apiUrl, positions]);

  // Limit displayed suppliers by device/view
  const suppliersToDisplay = useMemo(() => {
    if (isMobile && !showMore) return suppliers.slice(0, 4);
    return suppliers.slice(0, 6);
  }, [isMobile, showMore, suppliers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 cursor-pointer">
        {suppliersToDisplay.map((supplier) =>
          supplier.imageUrl ? (
            <div key={supplier.id} className="bg-white p-3">
              <div
                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2"
                onClick={() => handleSupplierClick(supplier)}
                style={{ backgroundImage: `url(${supplier.imageUrl})` }}
              />
              <p className="text-center text-xs text-gray-500 font-semibold">
                {supplier.name}
              </p>
            </div>
          ) : null
        )}
      </div>

      {/* Show More button for mobile */}
      {isMobile && suppliers.length > 4 && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="text-[#b21b29] border border-[#b21b29] rounded px-3 py-1 font-semibold text-sm hover:bg-[#b21b29] hover:text-white transition-colors"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};
