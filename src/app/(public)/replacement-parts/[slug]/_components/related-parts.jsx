"use client"

import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { FaShoppingCart, FaMagnifyingGlass } from 'react-icons/fa';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

export const RelatedParts = ({ subCategoryName }) => {

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://westcanuserbackend.onrender.com/api/product'
        : 'http://localhost:8080/api/product';

    function stringToSlug(str) {
        str = str.replace("&", "and");

        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
    }

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const encodedSubCategoryName = encodeURIComponent(subCategoryName);
                const response = await fetch(`${apiUrl}/products-category/subCategoryName?subCategoryName=${encodedSubCategoryName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch related products');
                }
                const data = await response.json();
                setRelatedProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (subCategoryName) {
            fetchRelatedProducts();
        }
    }, [subCategoryName]);


    return (
        <div className="w-full mx-auto py-2 md:py-4">
            <p className="text-2xl font-bold py-2">Related Products</p>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
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
                {relatedProducts.map((product, index) => (
                    <SwiperSlide key={index} className="py-4 h-full" onClick={() => router.push(`/replacement-parts/${stringToSlug(product.name)}`)}>
                        <div className="bg-white shadow-md rounded h-full group transition duration-300">
                            <img
                                src={product.imageUrl[0]}
                                alt={product.name}
                                className="w-full h-[15vh] object-cover mb-4 rounded"
                            />
                            <div className="p-3 group-hover:bg-gray-100/75">
                                <h3 className="text-md md:text-md font-semibold mb-2 !line-clamp-1">{product.name}</h3>
                                <p className="text-gray-600 mb-2 hidden md:block text-xs !line-clamp-3 overflow-hidden">
                                    {product.description}
                                </p>
                                <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
                                    <button className="flex items-center gap-1 transition text-xs py-1 rounded-md hover:text-[#b21b29]">
                                        <FaShoppingCart className="w-4 h-4 transition-all duration-300 rounded-full" />
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
