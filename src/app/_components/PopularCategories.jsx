"use client";

import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFlip } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-flip';
import Link from 'next/link';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CgShoppingCart } from 'react-icons/cg';
import { useRouter } from 'next/navigation';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
    ? 'https://clientsidebackend.onrender.com/api/product'
    : 'http://localhost:8080/api/product';

const fetchCategory = async () => {
    const response = await fetch(`${apiUrl}/category`);
    const data = await response.json();
    return data;
};

const fetchSubCategory = async () => {
    const response = await fetch(`${apiUrl}/subcategory`);
    const data = await response.json();
    return data;
};

const PopularCategories = () => {
    const [cats, setCats] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [view, setView] = useState('featured'); // 'featured' or 'bestsellers'
    const router = useRouter();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategory();
                setCats(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const getSubCategories = async () => {
            try {
                const fetchedSubCategories = await fetchSubCategory();
                setSubCats(fetchedSubCategories);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        getCategories();
        getSubCategories();
        //getData();
    }, []);

    const sideMenu = cats.map(cat => ({
        title: cat.name,
        items: subCats.filter(subCat => subCat.categoryName
            === cat.name).map(subCat => subCat.name),
        imgUrl: Array.isArray(cat.imageUrl) && cat.imageUrl.length > 0 ? cat.imageUrl[0] : "default_image_url.jpg",
        id: cat.id, // Store the category ID for use in the Swiper
    }));

    const getFilteredProducts = (category) => {
        return categories
            .filter(cat => cat.category === category)
            .filter(cat => (view === 'featured' ? cat.isFeatured : cat.isBestSeller));
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


    return (
        <section className='bg-gray-100/50 py-8'>
            <div className="w-10/12 mx-auto py-2">
                <div className="flex justify-between items-center">
                    <div className="flex justify-between flex-wrap md:flex-nowrap gap-2 mb-4 w-full">
                        <p className='text-2xl font-bold pb-2 md:pb-0'>Featured Categories</p>
                        <div className="w-full md:w-auto flex items-center justify-center gap-3 pb-2 md:pb-0">
                            <button
                                className={`text-xs px-4 py-2 w-full md:w-auto ${view === 'featured' ? 'bg-[#b21b29] text-white' : 'bg-gray-200 text-[#b21b29]'}`}
                                onClick={() => setView('featured')}>
                                View Featured
                            </button>
                            <button
                                className={`text-xs px-4 py-2 w-full md:w-auto ${view === 'bestsellers' ? 'bg-[#b21b29] text-white' : 'bg-gray-200 text-[#b21b29]'}`}
                                onClick={() => setView('bestsellers')}>
                                View Best Sellers
                            </button>
                        </div>
                    </div>
                </div>
                {sideMenu.map(menu => (
                    <div key={menu.title} className="flex gap-4 mb-8 h-[60vh]">
                        {/* Sidebar Block */}
                        <div
                            className="w-full lg:w-1/5 bg-gray-800 bg-cover bg-center text-white relative rounded-md overflow-hidden h-full"
                            style={{ backgroundImage: `url(${menu.imgUrl})` }}
                        >
                            <div className="absolute inset-0 bg-[#00000090] z-0" />
                            <div className="relative z-10 flex flex-col justify-between h-full p-4">
                                {/* Top */}
                                <div className="h-16 mb-4 rounded-md">
                                    <p className="text-lg font-bold px-8 mb-2 overflow-y-auto w-full flex flex-col justify-between items-start md:items-center text-white text-start md:text-center rounded-md h-full">{menu.title}</p>
                                </div>
                                {/* Middle - Menu List */}
                                <div className="flex-1 overflow-y-auto w-full flex flex-col justify-between items-start md:items-center text-white text-start md:text-center rounded-md h-full">
                                    <ul
                                        className={`flex flex-col gap-2 pt-4 max-h-[300px] overflow-hidden ${menu.items.length > 10 ? 'hover:overflow-y-scroll' : ''}`}
                                        style={{ scrollBehavior: "smooth" }}
                                    >
                                        {menu.items.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={`/shop/${stringToSlug(item)}`}
                                                    className="block p-1 text-white rounded hover:bg-[#b21b29] transition duration-300 text-xs"
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Bottom - Button */}
                                <Link
                                    href={
                                        menu.title === 'Replacement Parts' || menu.title === 'Fluids & Lubricants'
                                            ? `/replacement-parts`
                                            : `/shop-supplies`
                                    }
                                >
                                    <button className="mt-4 text-xs bg-[#b12b29] px-4 py-2 rounded w-full hover:bg-[#9c1f24] transition">
                                        Shop All
                                    </button>
                                </Link>
                            </div>
                        </div>


                        {/* Right Panel - 3 Static Cards */}
                        <div className="w-full lg:w-4/5 h-full">
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFlip]}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 8 },
                                    768: { slidesPerView: 2, spaceBetween: 8 },
                                    1024: { slidesPerView: 4, spaceBetween: 8 },
                                    1280: { slidesPerView: 4, spaceBetween: 8 },
                                }}
                            >
                                {subCats
                                    .filter((subCat) => subCat.categoryName === menu.title)
                                    .filter((subCat) => (view === 'bestsellers' ? subCat.bestSeller : true))
                                    .map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <div
                                                className="bg-white shadow-md rounded shadow-md flex flex-col justify-between p-4 text-white cursor-pointer h-full"
                                                onClick={() => router.push(`/shop/${stringToSlug(product.name)}`)}
                                            >
                                                <div>
                                                    <img src={product.images[0] || "https://via.placeholder.com/250"} alt={product.name} className="w-full h-[30vh] object-contain mb-4 rounded" />
                                                    <h3 className="text-lg font-semibold mb-2 text-[#b21b29] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-5">{product.description}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <Link className='text-sm bg-[#b21b29] px-2 py-1 text-white rounded-md font-semibold flex gap-2 items-center' href={
                                                            menu.name === "Replacement Parts" || menu.name === "Fluids & Lubricants"
                                                                ? `/shop/${stringToSlug(product.name)}`
                                                                : `/shop/${stringToSlug(product.name)}`
                                                        } >
                                                            <CgShoppingCart /> Shop Now
                                                        </Link>
                                                    <div className="bg-white text-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-[#b21b29] hover:text-white">
                                                        <HiMagnifyingGlass />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default PopularCategories;