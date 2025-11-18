"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/grid';

const isProduction = process.env.NODE_ENV === 'production';
const blogApi = isProduction
    ? 'https://clientsidebackend.onrender.com/api/blog'
    : 'http://localhost:8080/api/blog';

const supplierApi = isProduction
    ? 'https://clientsidebackend.onrender.com/api/suppliers/all'
    : 'http://localhost:8080/api/suppliers/all';

const vehicleApi = isProduction
    ? 'https://clientsidebackend.onrender.com/api/vehicles'
    : 'http://localhost:8080/api/vehicles';

const fetchBlogs = async () => {
    const response = await fetch(blogApi);
    return response.json();
};

const fetchSuppliers = async () => {
    try {
        const response = await fetch(supplierApi);
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        return response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

const fetchVehicles = async () => {
    try {
        const response = await fetch(vehicleApi);
        if (!response.ok) throw new Error("Failed to fetch vehicles");
        return response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

const BlogSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg h-[340px] animate-pulse flex flex-col">
                <div className="w-full h-52 bg-gray-200 rounded-t" />
                <div className="p-4 space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mt-auto" />
                </div>
            </div>
        ))}
    </div>
);

const LogoSkeletonGrid = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center animate-pulse h-32">
                <div className="w-full h-16 bg-gray-200 rounded mb-3" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
        ))}
    </div>
);

const LatestNews = () => {
    const [blogs, setBlogs] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const stringToSlug = (str) =>
        str.replace("&", "and").replace(/,/g, "~")
            .toLowerCase().trim().replace(/[^a-z0-9 -~]/g, "")
            .replace(/\s+/g, "-").replace(/--+/g, "-");

    useEffect(() => {
        const getAllData = async () => {
            try {
                const [blogList, supplierList, vehicleList] = await Promise.all([
                    fetchBlogs(),
                    fetchSuppliers(),
                    fetchVehicles()
                ]);
                setBlogs(blogList);
                setSuppliers(supplierList);
                setVehicles(vehicleList);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getAllData();
    }, []);

    const handleSupplierClick = (supplier) => {
        const brand = stringToSlug(supplier.name);
        router.push(`/suppliers/${brand}`);
    };

    return (
        <section className="py-12">
            <div>
                <h2 className="w-10/12 mx-auto text-2xl font-bold mb-6">Latest News & Blogs</h2>

                {/* Blog Swiper */}
                <div className="w-10/12 mx-auto mb-8 min-h-[360px]">
                    {loading ? (
                        <BlogSkeleton />
                    ) : (
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={6}
                            slidesPerView={2}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                        >
                            {blogs.map(blog => (
                                <SwiperSlide key={blog.id} className="py-2 h-full">
                                    <div className='bg-white shadow-md rounded-lg h-full flex flex-col' onClick={() => router.push(`/blogs/${blog.id}`)}>
                                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-52 object-cover mb-4 rounded-t" />
                                        <p className="font-semibold text-sm bg-white w-fit text-[#b12b29] px-4 py-1 rounded-md mt-[-30px]">{blog.categories[0]}</p>
                                        <div className='p-4 flex flex-1 flex-col'>
                                            <h4 className="text-md font-semibold mb-2 !line-clamp-2">{blog.title}</h4>
                                            <p className="text-xs text-gray-500 mb-4">{blog.date}</p>
                                            <a href={blog.link} className="text-[#b12b29] hover:underline mt-auto">Read More</a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* Suppliers */}
                <div className="w-full py-6 md:py-12 bg-gray-100">
                    <div className="w-10/12 mx-auto">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Suppliers</h3>

                        <div className="min-h-[220px]">
                            {loading ? (
                                <LogoSkeletonGrid />
                            ) : (
                                <Swiper
                                    modules={[Autoplay, Grid]}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    spaceBetween={16}
                                    slidesPerView={2}
                                    grid={{
                                        rows: 1,
                                        fill: 'row',
                                    }}
                                    breakpoints={{
                                        640: { slidesPerView: 3, grid: { rows: 1 }, spaceBetween: 12 },
                                        768: { slidesPerView: 4, grid: { rows: 1 }, spaceBetween: 14 },
                                        1024: { slidesPerView: 6, grid: { rows: 1 }, spaceBetween: 16 },
                                        1280: { slidesPerView: 10, grid: { rows: 1 }, spaceBetween: 16 },
                                    }}
                                >
                                    {suppliers.slice(0, 40).map((supplier, index) =>
                                        supplier.imageUrl ? (
                                            <SwiperSlide
                                                key={index}
                                                className="bg-white shadow-md rounded-lg flex flex-col items-center p-2 cursor-pointer hover:shadow-lg transition"
                                                onClick={() => handleSupplierClick(supplier)}
                                            >
                                                <div
                                                    className="w-full h-24 bg-contain bg-no-repeat bg-center mb-2"
                                                    style={{ backgroundImage: `url(${supplier.imageUrl})` }}
                                                />
                                                <p className="text-sm font-semibold text-gray-700 text-center w-full truncate">
                                                    {supplier.name}
                                                </p>
                                            </SwiperSlide>
                                        ) : null
                                    )}
                                </Swiper>
                            )}
                        </div>
                        {!loading && suppliers.length > 40 && (
                            <div className="text-center mt-6">
                                <button
                                    className="px-4 py-2 text-white bg-[#b12b29] text-xs rounded"
                                    onClick={() => router.push('/suppliers')}
                                >
                                    View All
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vehicles */}
                {/* Vehicles */}
                <div className="w-full py-6 md:py-12 bg-gray-100 mt-12">
                    <div className="w-10/12 mx-auto">
                        <h3 className="text-2xl font-bold mb-8 text-center">Popular Vehicles</h3>

                        <div className="min-h-[220px]">
                            {loading ? (
                                <LogoSkeletonGrid />
                            ) : (
                                <Swiper
                                    modules={[Autoplay, Grid]}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    spaceBetween={16}
                                    slidesPerView={2}
                                    grid={{ rows: 1, fill: 'row' }}
                                    breakpoints={{
                                        640: { slidesPerView: 3, grid: { rows: 1 }, spaceBetween: 12 },
                                        768: { slidesPerView: 4, grid: { rows: 1 }, spaceBetween: 14 },
                                        1024: { slidesPerView: 6, grid: { rows: 1 }, spaceBetween: 16 },
                                        1280: { slidesPerView: 10, grid: { rows: 1 }, spaceBetween: 16 },
                                    }}
                                >
                                    {vehicles
                                        .filter(vehicle => vehicle.name.toUpperCase() !== "PONTIAC")
                                        .slice(0, 40)
                                        .map(vehicle => (
                                            <SwiperSlide
                                                key={vehicle.id}
                                                className="bg-white shadow-md rounded-lg flex flex-col items-center p-2 cursor-pointer hover:shadow-lg transition"
                                                onClick={() => router.push(`/vehicle/${stringToSlug(vehicle.name)}`)}
                                            >
                                                <div
                                                    className="w-full h-24 bg-contain bg-no-repeat bg-center mb-2"
                                                    style={{ backgroundImage: `url(${vehicle.imageUrl})` }}
                                                />
                                                <h4 className="text-sm font-semibold text-center">{vehicle.name}</h4>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            )}
                        </div>

                        {!loading && vehicles.filter(v => v.name.toUpperCase() !== "PONTIAC").length > 40 && (
                            <div className="text-center mt-6">
                                <button
                                    className="px-4 py-2 text-white bg-[#b12b29] text-xs rounded"
                                    onClick={() => router.push('/vehicles')}
                                >
                                    View All
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
