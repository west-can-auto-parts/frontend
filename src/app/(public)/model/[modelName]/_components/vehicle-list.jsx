"use client";

import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

export const VehicleList = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [allVehicles, setAllVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
        ? "https://clientsidebackend.onrender.com/api/vehicles"
        : "http://localhost:8080/api/vehicles";

    useEffect(() => {
        let isMounted = true;
        const fetchAllVehicles = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(apiUrl);
                console.log("this model page vehicle list", res);
                if (!res.ok) throw new Error("Failed to fetch vehicles");
                const data = await res.json();
                console.log("this model page vehicle list", data);
                if (isMounted) setAllVehicles(data);
            } catch (err) {
                console.error(err);
                if (isMounted) setError("Unable to load vehicles");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchAllVehicles();
        return () => { isMounted = false; };
    }, [apiUrl]);

    function stringToSlug(str) {
        str = str.replace(/&/g, "and");
        str = str.replace(/\//g, "_");
        str = str.replace(/,/g, "~");
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -~_]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
    }

    const getVehicleLabel = (vehicle) => {
        // Prefer a unified name field; fall back to year/make/model if present
        if (vehicle?.name) return vehicle.name;
        const parts = [vehicle?.year, vehicle?.make, vehicle?.model].filter(Boolean);
        return parts.length ? parts.join(" ") : "Unknown Vehicle";
    };

    const handleVehicleClick = (vehicle) => {
        const vehicleLabel = getVehicleLabel(vehicle);
        const slug = stringToSlug(vehicleLabel);
        setSelectedModel(vehicleLabel);
        router.push(`/vehicle/${slug}`);
        setIsDropdownOpen(false);
    };

    if (loading) {
        return (
            <div className="border-b-2 px-6 py-6 bg-red-800 text-white border-b-white shadow-sm">
                <h3 className="text-sm font-semibold mb-4">All Vehicles</h3>
                <div className="text-sm">Loading vehicles...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="border-b-2 px-6 py-6 bg-red-800 text-white border-b-white shadow-sm">
                <h3 className="text-sm font-semibold mb-4">All Vehicles</h3>
                <div className="text-sm">{error}</div>
            </div>
        );
    }

    return (
        <div className="border-b-2 px-6 py-6 bg-red-800 text-white border-b-white shadow-sm">
            <h3 className="text-sm font-semibold mb-4">All Vehicles</h3>

            {/* Desktop View */}
            <div className="hidden sm:block">
                <ul
                    className="list-none pb-3 space-y-2 h-[250px] overflow-y-auto
                               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-red-800"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#d1d5db #7f1d1d",
                    }}
                >
                    {allVehicles.map((vehicle) => {
                        const vehicleLabel = getVehicleLabel(vehicle);
                        return (
                            <li
                                key={vehicle.id ?? vehicleLabel}
                                className={`cursor-pointer p-1 rounded text-sm ${
                                    vehicleLabel === selectedModel
                                        ? "font-bold text-white"
                                        : "hover:bg-white hover:text-red-800"
                                }`}
                                onClick={() => handleVehicleClick(vehicle)}
                            >
                                {vehicleLabel}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                        className="bg-white p-2 w-full text-left rounded-md flex justify-between items-center"
                    >
                        <span className="text-sm font-semibold text-red-800">
                            {selectedModel || "Select a Vehicle"}
                        </span>
                        <FaChevronDown
                            className={`h-3 w-3 text-red-800 transition-transform ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <ul className="absolute z-50 bg-red-800 w-full mt-1 rounded-md shadow-lg border border-white max-h-60 overflow-y-auto">
                            {allVehicles.map((vehicle) => {
                                const vehicleLabel = getVehicleLabel(vehicle);
                                return (
                                    <li
                                        key={vehicle.id ?? vehicleLabel}
                                        className={`py-2 px-4 text-sm cursor-pointer ${
                                            vehicleLabel === selectedModel
                                                ? "bg-white text-red-800 font-bold"
                                                : "text-white hover:bg-white hover:text-red-800"
                                        }`}
                                        onClick={() => handleVehicleClick(vehicle)}
                                    >
                                        {vehicleLabel}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
