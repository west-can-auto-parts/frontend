"use client";

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import locations from '@/datas/store';
import { useRouter } from 'next/navigation';


const containerStyle = {
    width: '100%',
    height: '100%'
};
const center = {
    lat: 49.17098,
    lng: -122.70064
};
const StoreLocations = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const router = useRouter();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
    if (!isLoaded) return <div>Loading...</div>;
    const handleRedirect = (store) => {
        router.push(`/store/${store.id}`); // Replace with your actual dynamic route
    };
    return (
        <section className="py-4 md:py-12">
            <p className="my-2 py-2 text-2xl font-bold w-10/12 mx-auto">Locate Us</p>
            <div className="flex flex-wrap md:flex-nowrap w-10/12 mx-auto items-stretch gap-8">
                <div className="w-full lg:w-1/2 h-auto min-h-[50vh]">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={9.5}

                    >
                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                position={{ lat: location.position[0], lng: location.position[1] }} // Updated to use array values
                                onClick={() => setSelectedStore(location)}
                            />
                        ))}
                        {selectedStore && (
                            <InfoWindow
                                position={{ lat: selectedStore.position[0], lng: selectedStore.position[1] }} // Updated to use array values
                                onCloseClick={() => setSelectedStore(null)}
                            >
                                <div>
                                    <h2 className="font-semibold">{selectedStore.name}</h2>
                                    <p>{selectedStore.address}</p>
                                    {selectedStore.phone && <p>Phone: {selectedStore.phone}</p>}
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
                <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg">
                    {selectedStore ? (
                        <div>
                            <img src={selectedStore.imgUrl} alt="" className='object-cover h-[25vh] w-full' />
                            <div className="p-8">
                                <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
                                <p className='mt-4 text-sm font-bold text-[#b12b29]'>{selectedStore.address}</p>
                                {selectedStore.phone && <p>Phone: {selectedStore.phone}</p>}
                                <button
                                    className="bg-[#b12b29] text-white px-6 py-2 font-bold mt-6"
                                    onClick={() => handleRedirect(selectedStore)}
                                >
                                    Know More
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <img src={locations[0].imgUrl} alt="" className='object-cover h-[25vh] w-full' />
                            <div className="p-8">
                                <h2 className="text-xl font-bold">{locations[0].name}</h2>
                                <p className='mt-4 text-sm font-bold text-[#b12b29]'>{locations[0].address}</p>
                                {locations[0].phone && <p>Phone: {locations[0].phone}</p>}
                                <button
                                    className="bg-[#b12b29] text-white px-6 py-2 font-bold mt-6"
                                    onClick={() => handleRedirect(locations[0])} // Use locations[0] as a fallback
                                >
                                    Know More
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default StoreLocations;