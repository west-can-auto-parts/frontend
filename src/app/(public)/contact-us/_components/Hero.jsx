"use client";

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import locations from '@/datas/store';

// Map container styles
const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
    lat: 49.17098,
    lng: -122.70064
  };

const Hero = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
         <section className="">
        <div className="flex flex-wrap md:flex-nowrap w-10/12 mx-auto items-stretch gap-8">
        <div className="w-full h-auto min-h-[50vh]">
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
        
    </div>
         </section>
    );
}

export default Hero;
