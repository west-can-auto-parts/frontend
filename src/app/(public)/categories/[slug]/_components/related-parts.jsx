"use client"

import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { FaShoppingCart, FaMagnifyingGlass } from 'react-icons/fa';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

export const RelatedParts = ({ mySubPart }) => {
    const router = useRouter()
    return (
        <div className="w-full mx-auto py-2 md:py-4">
            <p className="text-2xl font-bold py-2">Related Products</p>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={6}
                slidesPerView={2}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000, // 3 seconds delay
                    disableOnInteraction: false, // Keeps autoplay running even after interaction
                }}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 4,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
            >
                {mySubPart.parts.map((product, index) => (
                    <SwiperSlide key={index} className="py-4 h-full">
                        <div className="bg-white shadow-md rounded 
                                    h-full group transition duration-300">
                            <img
                                src={product.imageUrl1}
                                alt={product.listing}
                                className="w-full h-[15vh] object-cover mb-4 rounded"
                            />
                            <div className="p-3 group-hover:bg-gray-100/75">
                                <h3 className="text-md md:text-md font-semibold mb-2 !line-clamp-1">{product.listing}</h3>
                                <p className="text-gray-600 mb-2 hidden md:block text-xs !line-clamp-3 overflow-hidden">
                                    {product.content}
                                </p>
                                <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
                                    <button className="flex items-center gap-1 transition text-xs py-1 rounded-md hover:text-[#b21b29]">
                                        <FaShoppingCart className="w-4 h-4 transition-all duration-300 rounded-full" />
                                        Shop Now
                                    </button>
                                    {/* <div className="bg-gray-100 justify-center rounded-full text-[#b21b19] w-5 h-5 flex items-center text-lg transition-all duration-300 group-hover:bg-[#b21b29] group-hover:text-white">
                                        <FaMagnifyingGlass className="w-3 h-3" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
