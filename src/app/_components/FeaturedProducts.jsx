"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaMagnifyingGlass, FaCartShopping } from 'react-icons/fa6';
import { ClipLoader } from 'react-spinners'; // Importing ClipLoader from react-spinners
import { useRouter } from 'next/navigation';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

// import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/product'
    : 'http://localhost:8080/api/product';

// Sample API data (replace with your actual API call)
const fetchProducts = async () => {
    const response = await fetch(`${apiUrl}/bestsellingproduct`); // Adjust API endpoint
    const data = await response.json();
    return data;
};
function stringToSlug(str) {
    str = str.replace("&", "and");
  
    return str
      .toLowerCase()          
      .trim()                 
      .replace(/[^a-z0-9 -]/g, "")  
      .replace(/\s+/g, "-")         
      .replace(/--+/g, "-");       
  }
const FeaturedProducts = () => {
    const router = useRouter()
    const [autoParts, setAutoParts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        // Fetch products and update state
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setAutoParts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching is done
            }
        };

        getProducts();
    }, []);

    const handleClick = (listing, category) => {
        const categorySlug = category === 'Replacement Parts' || category === 'Fluids & Lubricants'
          ? 'replacement-parts'
          : 'shop-supplies';
          const slug = stringToSlug(listing);
        router.push(`/${categorySlug}/${slug}`);
      };

    return (
        <section className="bg-white py-4 md:py-12">
            <div className="w-10/12 mx-auto py-4">
                <div className="flex flex-wrap lg:flex-nowrap justify-between pb-2 border-[#00000010]">
                    <p className="text-lg md:text-2xl font-bold pb-4">Our Best Selling Products</p>
                </div>

                {/* Display the spinner while loading */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader size={50} color={"#b21b29"} loading={loading} />
                    </div>
                ) : (
                    <div className="mt-6">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={6}
                            slidesPerView={2}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 4,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1280: {
                                    slidesPerView: 6,
                                },
                            }}
                        >
                            {autoParts.map((product) => (
                                <SwiperSlide key={product._id} className="py-4 h-full">
                                    <div className="bg-white shadow-md rounded h-full group transition duration-300">
                                        {/* Image is not clickable */}
                                        <img
                                            src={product.imageUrl[0]}
                                            alt={product.name}
                                            className="w-full h-[15vh] object-cover mb-4 rounded"
                                        />
                                        <div className="p-3 group-hover:bg-gray-100/75">
                                        <h3
                                    className="text-md md:text-md font-semibold mb-2 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                                    onClick={()=>handleClick(product.name,product.categoryName)}
                                >
                                    {product.name}
                                </h3>
                                            <p
                                                className="text-gray-600 mb-2 hidden md:block text-xs line-clamp-3 overflow-hidden cursor-pointer"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 3,
                                                    overflow: "hidden",
                                                }}
                                                onClick={() =>handleClick(product.name,product.categoryName)}
                                            >
                                                {product.description}
                                            </p>
                                            <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
                                                <button
                                                    className="flex items-center gap-1 transition text-xs py-1 rounded-md hover:text-[#b21b29]"
                                                    onClick={() =>handleClick(product.name,product.categoryName)}
                                                >
                                                    <FaCartShopping className="w-4 h-4 transition-all duration-300 rounded-full" />
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </section>

    );
};

export default FeaturedProducts;
