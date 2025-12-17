"use client"

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export const RelatedParts = ({ subCategoryName }) => {

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://clientsidebackend.onrender.com/api/product'
        : 'http://localhost:8080/api/product';

    function stringToSlug(str) {
        str = str.replace("&", "and");
        str = str.replace(/,/g, "~");
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -~]/g, "")
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
    
          {/* Wrapper for Swiper with external navigation - ADDED position: relative */}
          <div className="relative"> {/* ← Added this wrapper with relative positioning */}
    
            {/* Left Navigation Button - Outside */}
            <div
              className="swiper-button-prev-custom absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center cursor-pointer
                       bg-[#b21b29] hover:bg-[#8a1520] transition shadow-lg"
              role="button"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-white text-xl md:text-2xl font-black" />
            </div>
    
            {/* Right Navigation Button - Outside */}
            <div
              className="swiper-button-next-custom absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center cursor-pointer
                       bg-[#b21b29] hover:bg-[#8a1520] transition shadow-lg"
              role="button"
              aria-label="Next"
            >
              <FaChevronRight className="text-white text-xl md:text-2xl font-black" />
            </div>
    
            {/* Swiper Container */}
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 12 },
                1280: { slidesPerView: 4, spaceBetween: 12 },
              }}
              className="w-full pb-10"
            >
              {loading && (
                <SwiperSlide>
                  <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
                </SwiperSlide>
              )}
    
              {error && !loading && (
                <SwiperSlide>
                  <div className="p-6 text-center text-sm text-red-500">Error: {error}</div>
                </SwiperSlide>
              )}
    
              {!loading &&
                !error &&
                (relatedProducts.length ? (
                  relatedProducts.map((product, index) => (
                    <SwiperSlide
                      key={product.id ?? index}
                      className="py-4 h-full cursor-pointer"
                      onClick={() => router.push(`/replacement-parts/${stringToSlug(product.name)}`)}
                    >
                      <div className="bg-white shadow-md rounded h-full group transition duration-300">
                        <img
                          src={product.imageUrl?.[0] || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-[15vh] object-cover mb-4 rounded"
                        />
                        <div className="p-3 group-hover:bg-gray-100/75">
                          <h3 className="text-md md:text-md font-semibold mb-2 !line-clamp-1">
                            {product.name}
                          </h3>
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
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="p-6 text-center text-sm text-gray-500">No related products found.</div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div> {/* ← Closing the wrapper div */}
        </div>
      );
};
