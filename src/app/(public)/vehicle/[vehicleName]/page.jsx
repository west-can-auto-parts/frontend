"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const isProduction = process.env.NODE_ENV === "production";
const apiBaseUrl = isProduction
  ? "https://clientsidebackend.onrender.com/api"
  : "http://localhost:8080/api";

const Page = ({ params }) => {
  const router = useRouter();
  const initialVehicleName = params.vehicleName;

  const [allVehicles, setAllVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function stringToSlug(str) {
    str = initialVehicleName + "-" + str;
    str = str.replace(/&/g, "and");         // Replace all "&" with "and"
    str = str.replace(/\//g, "_");          // Replace all "/" with "_"
    str = str.replace(/,/g, "~");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  const fetchVehicleAndModels = async (vehicleName) => {
    setLoading(true);
    try {
      const vehicleRes = await fetch(`${apiBaseUrl}/vehicle/${vehicleName}`);
      if (!vehicleRes.ok) throw new Error("Vehicle not found");
      const vehicleData = await vehicleRes.json();
      setVehicle(vehicleData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllVehicles = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/vehicles`);
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      const data = await res.json();
      setAllVehicles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllVehicles();
    fetchVehicleAndModels(initialVehicleName);
  }, [initialVehicleName]);

  const handleVehicleClick = (name) => {
    router.push(`/vehicle/${name}`);
  };

  if (loading) return <div className="w-10/12 mx-auto py-8">Loading...</div>;
  if (error) return <div className="w-10/12 mx-auto py-8">Error: {error}</div>;

  return (
    <div className="w-10/12 mx-auto py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar: 1/6 width */}
      <div className="w-full md:w-1/6 bg-red-800 p-4 rounded h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-red-800"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #7f1d1d',
        }}>
        <h2 className="text-white text-lg font-semibold mb-4 text-center">Vehicles</h2>
        <ul className="grid grid-cols-2 md:grid-cols-1 gap-1 relative">
          {/* Separator line for mobile view only */}
          <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 h-[100px] w-px bg-gray-400 md:hidden"></div>

          {allVehicles.map((v) => (
            <li
              key={v.id}
              className={`cursor-pointer p-1 rounded text-sm text-left ${v.name === vehicle.name ? "text-white font-bold" : "text-white"
                } hover:bg-white hover:text-red-800`}
              onClick={() => handleVehicleClick(v.name)}
            >
              <span className="block break-words whitespace-normal leading-tight">
                {v.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content: 3/4 width */}
      <div className="w-full md:w-5/6">
        {/* Centered logo */}
        <div className="bg-white shadow-md rounded overflow-hidden mb-6 h-48 w-full">
          <img
            src={vehicle.bannerImageUrl}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {vehicle.model.map((model) => (
            <div
              key={model.name}
              className="bg-white shadow-md p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/model/${stringToSlug(model.name)}`)}
            >
              <img
                src={model.imageUrl}
                alt={model.name}
                className="h-32 w-full object-contain mb-2"
              />
              <h3 className="text-md font-semibold text-center">{model.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;