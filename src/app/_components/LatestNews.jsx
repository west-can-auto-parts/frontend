"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
    ? 'https://clientsidebackend.onrender.com/api/blog'
    : 'http://localhost:8080/api/blog';
const apiUrl1 = isProduction
    ? 'https://clientsidebackend.onrender.com/api/suppliers'
    : 'http://localhost:8080/api/suppliers';

const fetchBlogs = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

const fetchSuppliers = async () => {
    try {
        const response = await fetch(`${apiUrl1}/all`);
        if (!response.ok) {
            throw new Error("Failed to fetch suppliers");
        }
        const allSuppliers = await response.json();
        return allSuppliers;
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Hardcoded vehicle list
const vehicles = [
    {
      id: 1,
      name: "Toyota Camry",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 2,
      name: "Honda Civic",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 3,
      name: "Ford F-150",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Truck"
    },
    {
      id: 4,
      name: "Chevrolet Silverado",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    },
    {
      id: 5,
      name: "Nissan Altima",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2020,
      type: "Sedan"
    },
    {
      id: 6,
      name: "Hyundai Elantra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 7,
      name: "Kia Sorento",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 8,
      name: "Mazda CX-5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 9,
      name: "Subaru Outback",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Wagon"
    },
    {
      id: 10,
      name: "Volkswagen Jetta",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 11,
      name: "BMW 3 Series",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 12,
      name: "Mercedes-Benz C-Class",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 13,
      name: "Audi Q5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 14,
      name: "Jeep Wrangler",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 15,
      name: "Tesla Model 3",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 16,
      name: "Chevrolet Equinox",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 17,
      name: "Toyota RAV4",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 18,
      name: "Honda CR-V",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 19,
      name: "Ford Escape",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 20,
      name: "GMC Sierra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    }
  ];

const LatestNews = () => {
    const [visibleRows, setVisibleRows] = useState(20);
    const [blogs, setBlogs] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

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
        const getBlogs = async () => {
            try {
                const myBlogs = await fetchBlogs();
                const suppliersList = await fetchSuppliers();
                setSuppliers(suppliersList);
                setBlogs(myBlogs);
            } catch (error) {
                console.error(error, error.message);
            }
        };
        getBlogs();
    }, []);

    const handleViewMore = () => {
        setVisibleRows(suppliers.length);
    };

    const handleSupplierClick = (supplier) => {
        const brand = stringToSlug(supplier.name);
        router.push(`/suppliers/${brand}`);
    };

    return (
        <section className='py-12'>
            <div className="">
                <h2 className="w-10/12 mx-auto text-2xl font-bold mb-6">Latest News & Blogs</h2>

                {/* Blog Section */}
                <div className="w-10/12 mx-auto mb-8">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={6}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
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
                                slidesPerView: 4,
                            },
                        }} >
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
                </div>

                {/* Suppliers Section */}
                <div className="w-full py-6 md:py-12 bg-gray-100">
                    <div className="w-10/12 mx-auto">
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Suppliers</h3>

                        <div className="w-full mx-auto">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={6}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 6,
                                        spaceBetween: 30,
                                    },
                                    1280: {
                                        slidesPerView: 6,
                                        spaceBetween: 30,
                                    },
                                }}>
                                {suppliers.slice(0, visibleRows).map((supplier, index) => (
                                    supplier.imageUrl ? (
                                        <SwiperSlide key={index} className="bg-white border-2 p-3 rounded-md cursor-pointer" onClick={() => handleSupplierClick(supplier)}>
                                            <div
                                                className="bg-white h-[100px] bg-contain bg-no-repeat bg-center p-2 transition-all duration-300 ease-in-out"
                                                style={{ backgroundImage: `url(${supplier.imageUrl})` }}
                                            />
                                            <p className="text-center text-xs text-gray-500 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                                                {supplier.name}
                                            </p>
                                        </SwiperSlide>
                                    ) : null
                                ))}
                            </Swiper>
                            {visibleRows < suppliers.length && (
                                <div className="text-center mt-4">
                                    <button
                                        className="px-4 mt-6 py-2 text-white bg-[#b12b29] text-xs rounded"
                                        onClick={() => router.push('/suppliers')}
                                    >
                                        View All
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vehicle sections as needed */}
               
                <div className="w-10/12 mx-auto">
                <h3 className="text-2xl font-bold mb-8 text-center">Popular Vehicles</h3>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={6}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}>
                        {vehicles.map(vehicle => (
                            <SwiperSlide key={vehicle.id} className="py-2 h-full">
                                <div className='bg-white shadow-md rounded-lg h-full flex flex-col items-center'>
                                    <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-32 object-cover mb-2 rounded-t" />
                                    <h4 className="text-md font-semibold mb-1 text-center">{vehicle.name}</h4>
                                    <p className="text-xs text-gray-500">{vehicle.year} • {vehicle.type}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {visibleRows < suppliers.length && (
                                <div className="text-center mt-4">
                                    <button
                                        className="px-4 mt-6 py-2 text-white bg-[#b12b29] text-xs rounded"
                                        onClick={() => router.push('/suppliers')}
                                    >
                                        View All
                                    </button>
                                </div>
                            )}
                </div>
            </div>
        </section>
    );
}

export default LatestNews;
