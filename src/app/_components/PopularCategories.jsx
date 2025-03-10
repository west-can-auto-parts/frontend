"use client";

import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFlip } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CgShoppingCart } from 'react-icons/cg';
import { useRouter } from 'next/navigation';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/product'
    : 'http://localhost:8080/api/product';
// const fetchCategories = async () => {
//     const response = await fetch('/api/product-categories');
//     const data = await response.json();
//     return data.productCategories;
// };

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
        imgUrl: Array.isArray(cat.imageUrl) && cat.imageUrl.length > 0 ? cat.imageUrl[0]: "default_image_url.jpg",
        id: cat.id, // Store the category ID for use in the Swiper
    }));

    const getFilteredProducts = (category) => {
        return categories
            .filter(cat => cat.category === category)
            .filter(cat => (view === 'featured' ? cat.isFeatured : cat.isBestSeller));
    };
    function stringToSlug(str) {
        return str
            .toLowerCase()                  // Convert the string to lowercase
            .trim()                         // Remove any leading or trailing whitespace
            .replace(/[^a-z0-9 -]/g, '')    // Remove all non-alphanumeric characters except for spaces and hyphens
            .replace(/\s+/g, '-')           // Replace spaces and consecutive spaces with a single hyphen
            .replace(/--+/g, '-');          // Replace multiple hyphens with a single hyphen
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
                    <div key={menu.title} className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
                        <div className="w-full lg:w-1/5 bg-cover bg-center h-[25vh] md:h-auto" style={{ backgroundImage: `url(${menu.imgUrl})` }}>
                            <div className="overflow-y-auto overlay w-full flex flex-col justify-between items-start md:items-center p-8 bg-[#00000090] text-white text-start md:text-center rounded-md h-full">
                                <div className='h-full overflow-hidden'>
                                    <p className="text-xl font-bold mb-2">{menu.title}</p>
                                    <div className='overflow-y-auto max-h-[300px]'>
                                        <ul
                                            className={`flex flex-col gap-2 pt-4 max-h-[300px] overflow-hidden ${menu.items.length > 10 ? 'hover:overflow-y-scroll' : ''
                                                }`}
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
                                </div>
                                <Link href={
                                    menu.title === "Replacement Parts" || menu.title === "Fluids & Lubricants"
                                        ? `/replacement-parts`
                                        : `/shop-supplies`
                                }>
                                    <button className='mt-3 text-xs text-white bg-[#b12b29] px-4 py-2'>Shop All</button>
                                </Link>

                            </div>
                        </div>
                        <div className='w-full lg:w-4/5'>
                            {subCats.some(cat => cat.categoryName === menu.title) && (
                                <Swiper
                                    spaceBetween={12}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFlip]}
                                    navigation
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 8 },
                                        768: { slidesPerView: 2, spaceBetween: 8 },
                                        1024: { slidesPerView: 3, spaceBetween: 8 },
                                        1280: { slidesPerView: 3, spaceBetween: 8 },
                                    }}
                                >
                                    {subCats.filter(subCat => subCat.categoryName === menu.title).map(product => (
                                        <SwiperSlide key={product.id} className="py-6 md:py-2 h-full">
                                            <div className="bg-white shadow-md rounded h-full group transition" onClick={() => router.push(`/shop/${encodeURI(product.name)}`)}>
                                                <img src={product.images[0] || "https://via.placeholder.com/250"} alt={product.name} className="w-full h-[25vh] object-contain mb-4 rounded" />
                                                <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-2 text-[#b21b29] whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                                                    <div className="flex justify-between items-center mt-4">
                                                        <Link className='text-sm bg-[#b21b29] px-2 py-1 text-white rounded-md font-semibold flex gap-2 items-center' href={
                                                            menu.name === "Replacement Parts" || menu.name === "Fluids & Lubricants"
                                                                ? `/shop/${encodeURI(product.name)}`
                                                                : `/shop/${encodeURI(product.name)}`
                                                        } >
                                                            <CgShoppingCart /> Shop Now
                                                        </Link>
                                                        <div className="group-hover:bg-[#b12b29] group-hover:text-white bg-gray-100 rounded-full flex text-xl items-center w-10 h-10 justify-center transition">
                                                            <HiMagnifyingGlass />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
