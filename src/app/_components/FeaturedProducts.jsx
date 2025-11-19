"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'swiper/css';
import { FaCartShopping } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from '@/components/LazySwiper';
import { useInView } from '@/hooks/useInView';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? 'https://clientsidebackend.onrender.com/api/product'
  : 'http://localhost:8080/api/product';

const SKELETON_COUNT = 4;

const ProductSkeleton = () => (
  <div className="w-full md:flex-1 min-w-0 bg-white shadow-md rounded flex flex-col animate-pulse">
    <div className="w-full h-[12vh] bg-gray-200 rounded mb-4" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mt-4" />
    </div>
  </div>
);

const SkeletonGrid = () => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-4 py-2 md:py-4 justify-center w-full items-stretch overflow-x-auto">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);

// Fetch products and sort based on bestSellerPosition
const fetchProducts = async () => {
  const response = await fetch(`${apiUrl}/bestsellingproduct`);
  const data = await response.json();
  return data
    .filter(item => item.bestSeller) // Ensure only best sellers
    .sort((a, b) => a.bestSellerPosition - b.bestSellerPosition);
};

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

const ProductCard = React.memo(({ product, onClick }) => (
  <div
    className="w-full md:flex-1 min-w-0 bg-white shadow-md rounded group transition duration-300 flex flex-col"
  >
    <img
      src={product.imageUrl[0]}
      alt={product.name}
      className="w-full h-[12vh] object-cover mb-4 rounded"
      loading="lazy"
    />
    <div className="p-3 group-hover:bg-gray-100/75">
      <h3
        className="text-sm font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        onClick={onClick}
      >
        {product.name}
      </h3>
      <p
        className="text-gray-600 mb-2 hidden md:block text-xs line-clamp-3"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>
      <div className="flex justify-between items-center gap-2 mt-3">
        <button
          className="flex items-center gap-1 text-xs py-1 rounded-md hover:text-[#b21b29]"
          onClick={onClick}
        >
          <FaCartShopping className="w-4 h-4" />
          Shop Now
        </button>
      </div>
    </div>
  </div>
));
ProductCard.displayName = "ProductCard";

const FeaturedProducts = () => {
  const router = useRouter();
  const [autoParts, setAutoParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setAutoParts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleClick = useCallback((listing, category) => {
    const categorySlug =
      category === 'Replacement Parts' || category === 'Fluids & Lubricants'
        ? 'replacement-parts'
        : 'shop-supplies';
    const slug = stringToSlug(listing);
    router.push(`/${categorySlug}/${slug}`);
  }, [router]);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (!swiperInstance || !swiperInstance.autoplay) return;
    if (isInView) {
      swiperInstance.autoplay.start();
    } else {
      swiperInstance.autoplay.stop();
    }
  }, [isInView]);

  return (
    <section className="bg-white py-4 md:py-12" ref={sectionRef}>
      <div className="w-10/12 mx-auto py-4">
        <div className="flex justify-between pb-2 border-[#00000010]">
          <p className="text-lg md:text-2xl font-bold pb-4">Our Best Selling Products</p>
        </div>

        <div className="min-h-[280px]">
          {loading ? (
            <SkeletonGrid />
          ) : autoParts.length <= 8 ? (
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 py-2 md:py-4 justify-center w-full items-stretch overflow-x-auto">
              {autoParts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => handleClick(product.name, product.categoryName)}
                />
              ))}
            </div>
          ) : (
            <Swiper
              observer={false}
              observeParents={false}
              resizeObserver={false}
              watchOverflow
              modules={[Autoplay, Pagination]}
              spaceBetween={6}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 6 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 8 },
              }}
              onSwiper={(instance) => {
                swiperRef.current = instance;
                if (!isInView && instance.autoplay) {
                  instance.autoplay.stop();
                }
              }}
            >
              {autoParts.map(product => (
                <SwiperSlide key={product._id} className="py-4 h-full">
                  <ProductCard
                    product={product}
                    onClick={() => handleClick(product.name, product.categoryName)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
