"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShippingFast, FaPhoneAlt, FaShieldAlt, FaTag, FaBuilding } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// hero images

import hero1 from '@/assets/hero-backdrops/hero1.jpg'
import hero2 from '@/assets/hero-backdrops/hero2.jpg'
import hero3 from '@/assets/hero-backdrops/hero3.jpg'


const HeroSection = () => {

    const router = useRouter()

    const settings = {
        autoplay:true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        

    };

    const heroContent = [
        {
            title: "Find Parts That Fit Your Vehicle",
            description: " Discover a world of automotive excellence with our unbeatable parts selection",
            href: '/categories',
            imgUrl: hero1,
        },
        {
            title: "We Offer Live Chat Support",
            description: "Monday to Friday. From 8:00 A.M to 5:00 P.M. PDT",
            href: '/contact-us',
            imgUrl: hero3,
        },
        {
            title: "Shop Smart, Save Big! Unbeatable Deals",
            description: " Discover a world of automotive excellence with our unbeatable parts selection",
            href: '/categories',
            imgUrl: hero2,
        },
    ]


    return (
        <section className='py-2 my-2 w-full overflow-hidden'>
            <Slider {...settings}>
                {heroContent.map((slide, index) => (
                    <div className='w-full' key={index}>
                        <div key={index} className="rounded-md bg-no-repeat bg-gray-100 overflow-hidden bg-bottom md:bg-center !w-10/12 !mx-auto h-[30vh] md:h-[50vh] p-10 flex gap-4 flex-col justify-center" style={{
                            backgroundImage: `url(${slide.imgUrl.src})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'bottom right'
                        }}>
                            <p className='text-xl md:text-4xl pr-0 font-extrabold w-full md:w-2/3 lg:w-1/2 mb-1 pb-0 md:mb-4'>
                                {slide.title}
                            </p>
                            <p className='text-xs md:text-lg pr-0 lg:pr-12 w-full md:w-2/3 mb-2 md:mb-4 pb-0'>
                                {slide.description} </p>
                            <button onClick={() => router.push(slide.href)} className='text-sm md:text-md  bg-[#b91b29] text-white px-2 md:px-6 py-1 md:py-2 w-fit'>
                                Shop Now
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
            {/* <div className="w-10/12 mx-auto my-8 p-8 rounded-md shadow-md" style={{ backgroundImage: `url()`, backgroundSize: "contain" }}>
                <p className="text-4xl font-bold ">
                    Find Parts For Your Vehicle

                </p>
                <p>
                    Over hundreds of brands and tens of thousands of parts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                    <div>
                        <select name="" id="" className='w-full text-lg border-b-4 border-[#b12b29] p-4'>
                            <option value="">Year</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className='w-full text-lg border-b-4 border-[#b12b29] p-4'>
                            <option value="">Make</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className='w-full text-lg border-b-4 border-[#b12b29] p-4'>
                            <option value="">Model</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className='w-full text-lg border-b-4 border-[#b12b29] p-4'>
                            <option value="">Engine</option>
                        </select>
                    </div>
                </div>
            </div> */}

            <div className="text-xs py-8 w-10/12 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center space-x-2">
                    <FaShippingFast className="h-6 w-6 text-[#b91b29]" />
                    <div>
                        <p className="font-semibold">Speed and Efficiency</p>
                        <p>Delivery in under 2 Hours.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center space-x-2">
                    <FaGears className="h-6 w-6 text-[#b91b29]" />
                    <div>
                        <p className="font-semibold">Wide Selection</p>
                        <p>Access to over 2 million products.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center space-x-2">
                    <FaShieldAlt className="h-6 w-6 text-[#b91b29]" />
                    <div>
                        <p className="font-semibold">Unparalleled Quality</p>
                        <p>OEM products from 330 suppliers.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center space-x-2">
                    <FaBuilding className="h-6 w-6 text-[#b91b29]" />
                    <div>
                        <p className="font-semibold">Direct from Manufacturer</p>
                        <p>Serving 1,000 repair centers.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
