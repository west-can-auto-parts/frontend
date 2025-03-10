"use client";

import React, { useState } from 'react';
import { FaLocationArrow, FaPhone } from 'react-icons/fa6';
import locations from '@/datas/store';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';

const Page = ({ params }) => {
  const id = params.storeId;

  // Find the location data based on the ID from the URL
  const location = locations.find((loc) => loc.id === parseInt(id));

  // Handle case when location is not found
  if (!location) {
    return (
      <main className="bg-gray-100 py-12 min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Location Not Found : {id}</h1>
          <p className="text-gray-700">The location you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  // State to handle dropdown selection
  const [selectedLocationId, setSelectedLocationId] = useState(id);

  // Find the selected location based on dropdown
  const selectedLocation = locations.find((loc) => loc.id === parseInt(selectedLocationId));

  return (
    <main className="bg-gray-100 py-12">
      <section className="w-10/12 mx-auto flex flex-wrap md:flex-nowrap gap-8">
        {/* Location Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white shadow-md rounded-lg">
            <img
              src={selectedLocation.imgUrl}
              alt={selectedLocation.name}
              className="w-full h-[50vh] object-cover mb-4 rounded-t"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{selectedLocation.name}</h1>
              <p className="text-md text-red-800 font-bold mb-2 flex items-center"><FaLocationArrow className='mr-2'/> Address: {selectedLocation.address}</p>
              <p className="text-md text-gray-600 mb-6 font-semibold flex items-center"><FaPhoneAlt className='mr-2'/> Contact: {selectedLocation.phone}</p>
              <div>{selectedLocation.description}</div>
            </div>
          </div>
        </div>

        {/* Sidebar in Dropdown Format */}
        <div className="w-full md:w-1/4 top-24 bg-[#b12b29] text-white sticky shadow-md p-4 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-4">Our Other Stores' Locations & Contact</h2>
          <select
            value={selectedLocationId}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="w-full mb-4 p-2 bg-white text-[#b12b29] text-center"
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>

          {/* Buttons for Call and View */}
          <div className="flex items-center gap-2 text-center">
            <button className="bg-white text-[#b12b29] w-full px-4 py-2 flex justify-between items-center gap-1">
              <a href={`tel:${selectedLocation.phone}`} className="text-center text-sm flex justify-center hover:underline w-full items-center gap-1">
                Call Store <FaPhone className="h-3 w-3" />
              </a>
            </button>
            {/* <button className="bg-white text-[#b12b29] w-full px-4 py-2 flex justify-between items-center gap-1"> */}
              {/* <Link href={`/store/${selectedLocation.id}`} className="text-center flex justify-center hover:underline w-full items-center gap-1">
                View Store
              </Link> */}
            {/* </button> */}
          </div>
        </div>
      </section>
    </main>
    
  );
};

export default Page;
