"use client"

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa'


const CurrentDeals = () => {

    const rhombusArrowStyle = `
    .rhombus-arrow {
        width: 40px;
        height: 40px;
        background-color: #b12b29;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 4px;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        cursor: pointer;
    }

    .rhombus-arrow:hover {
        background-color: #a11b1b;
    }
`;

    const autoParts = [
        {
            title: "LED Headlight",
            partNumber: "HL-12345",
            description: "High-performance LED headlight with improved visibility and longevity.",
            rating: 4.7,
            image: "https://example.com/images/led-headlight.jpg",
            price: 89.99,
            tags: ["Headlights", "LED", "Lighting"],
            category: "Headlights & Lighting"
        },
        {
            title: "Fog Light Kit",
            partNumber: "FL-67890",
            description: "Fog light kit with adjustable brackets and wiring harness.",
            rating: 4.5,
            image: "https://example.com/images/fog-light-kit.jpg",
            price: 69.99,
            tags: ["Fog Lights", "Lighting", "Kit"],
            category: "Headlights & Lighting"
        },
        {
            title: "Fuel Pump Assembly",
            partNumber: "FP-11223",
            description: "Durable fuel pump assembly for reliable fuel delivery.",
            rating: 4.8,
            image: "https://example.com/images/fuel-pump.jpg",
            price: 129.99,
            tags: ["Fuel System", "Pump", "Assembly"],
            category: "Fuel System"
        },
        {
            title: "Synthetic Motor Oil",
            partNumber: "MO-44556",
            description: "High-quality synthetic motor oil for smooth engine performance.",
            rating: 4.9,
            image: "https://example.com/images/motor-oil.jpg",
            price: 34.99,
            tags: ["Motor Oil", "Synthetic", "Engine"],
            category: "Fuel System"
        },
        {
            title: "Front Bumper",
            partNumber: "BP-77889",
            description: "Stylish front bumper for enhanced vehicle appearance and protection.",
            rating: 4.6,
            image: "https://example.com/images/front-bumper.jpg",
            price: 199.99,
            tags: ["Body Parts", "Bumper", "Front"],
            category: "Body Parts"
        },
        {
            title: "Front Bumper",
            partNumber: "BP-77889",
            description: "Stylish front bumper for enhanced vehicle appearance and protection.",
            rating: 4.6,
            image: "https://example.com/images/front-bumper.jpg",
            price: 199.99,
            tags: ["Body Parts", "Bumper", "Front"],
            category: "Body Parts"
        },
        {
            title: "Dashboard Cover",
            partNumber: "DC-99000",
            description: "Protective dashboard cover to shield against UV damage and enhance interior.",
            rating: 4.4,
            image: "https://example.com/images/dashboard-cover.jpg",
            price: 49.99,
            tags: ["Interior Parts", "Dashboard", "Cover"],
            category: "Interior Parts"
        },
        {
            title: "Dashboard Cover",
            partNumber: "DC-99000",
            description: "Protective dashboard cover to shield against UV damage and enhance interior.",
            rating: 4.4,
            image: "https://example.com/images/dashboard-cover.jpg",
            price: 49.99,
            tags: ["Interior Parts", "Dashboard", "Cover"],
            category: "Interior Parts"
        },
        {
            title: "Dashboard Cover",
            partNumber: "DC-99000",
            description: "Protective dashboard cover to shield against UV damage and enhance interior.",
            rating: 4.4,
            image: "https://example.com/images/dashboard-cover.jpg",
            price: 49.99,
            tags: ["Interior Parts", "Dashboard", "Cover"],
            category: "Interior Parts"
        },
        {
            title: "All-Season Tires",
            partNumber: "T-12356",
            description: "Reliable all-season tires with excellent grip and durability.",
            rating: 4.7,
            image: "https://example.com/images/all-season-tires.jpg",
            price: 89.99,
            tags: ["Tires", "All-Season", "Wheels"],
            category: "Tires & Wheels"
        },
        {
            title: "All-Season Tires",
            partNumber: "T-12356",
            description: "Reliable all-season tires with excellent grip and durability.",
            rating: 4.7,
            image: "https://example.com/images/all-season-tires.jpg",
            price: 89.99,
            tags: ["Tires", "All-Season", "Wheels"],
            category: "Tires & Wheels"
        },
        {
            title: "Timing Belt Kit",
            partNumber: "TB-65432",
            description: "Comprehensive timing belt kit including belts and tensioners.",
            rating: 4.8,
            image: "https://example.com/images/timing-belt-kit.jpg",
            price: 119.99,
            tags: ["Engine", "Timing Belt", "Kit"],
            category: "Engine & Drivetrain"
        },
        {
            title: "Timing Belt Kit",
            partNumber: "TB-65432",
            description: "Comprehensive timing belt kit including belts and tensioners.",
            rating: 4.8,
            image: "https://example.com/images/timing-belt-kit.jpg",
            price: 119.99,
            tags: ["Engine", "Timing Belt", "Kit"],
            category: "Engine & Drivetrain"
        }
    ];


     const CustomPrevArrow = ({ onClick }) => (
        <div className='bg-[#b12b29] p-3 text-white transform-[45] cursor-pointer' onClick={onClick}>
            <FaChevronLeft />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div className='bg-[#b12b29] p-3 text-white transform-[45] cursor-pointer' onClick={onClick}>
            <FaChevronRight />
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 768, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 1024, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
            {
                breakpoint: 1280, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
        ],
       
    };


    const calculateTimeRemaining = () => {
        const endDate = new Date('2024-08-20T23:59:59'); // Set your end date here
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12">
            <div className="w-full mx-auto text-center py-12">
                <p className="text-3xl font-bold mb-2">Attention! Deal Zone</p>
                <p className="text-lg mb-4">Hurry Up! Discounts up to 70%</p>

                <div className="mb-8">
                    {/* <p className="text-xl font-semibold">Deal ends in:</p> */}
                    <div className="flex justify-center mt-2">
                        <div className="w-[75px] p-4 bg-[#b91b29] text-white rounded-lg mx-2">
                            <p className="text-lg font-bold">{timeRemaining.days}</p>
                            <p>Days</p>
                        </div>
                        <div className="w-[75px] p-4 bg-[#b91b29] text-white rounded-lg mx-2">
                            <p className="text-lg font-bold">{timeRemaining.hours}</p>
                            <p>Hrs</p>
                        </div>
                        <div className="w-[75px] p-4 bg-[#b91b29] text-white rounded-lg mx-2">
                            <p className="text-lg font-bold">{timeRemaining.minutes}</p>
                            <p>Mins</p>
                        </div>
                        <div className="w-[75px] p-4 bg-[#b91b29] text-white rounded-lg mx-2">
                            <p className="text-lg font-bold">{timeRemaining.seconds}</p>
                            <p>Secs</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center justify-center mt-5'>
                        <div className='bg-[#b12b29] p-3 text-white transform-[45]'>
                            <FaChevronLeft className='' />
                        </div>
                        <button className='bg-white px-6 rounded py-2'>View Avaialable Offers</button>
                        <div className='bg-[#b12b29] p-3 text-white transform-[45]'>
                            <FaChevronRight className='' />
                        </div>
                    </div>
                </div>

                <div className="w-full bg-cover bg-center py-12 mt-[-50px]" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/natural-daylight-repair-tools-lying-down-engine-automobile-hood_146671-16158.jpg?t=st=1723459949~exp=1723463549~hmac=e3220d2cfa8af1718d8760923112e982cd091e76e087e39a143fe8e9b83d8691&w=1380)` }}>
                    <div className="w-10/12 py-8 mx-auto">
                        <Slider {...settings}>
                            {autoParts.map(part => (
                                <div key={part.partNumber} className="p-4">
                                    <div className="bg-white shadow-md p-4 rounded text-start">
                                        <img src={"https://red-parts.angular.themeforest.scompiler.ru/themes/red/assets/images/products/product-9-1.jpg"} alt={part.title} className="w-full h-50 object-cover mb-4 rounded" />
                                        <h3 className="text-lg font-semibold mb-2">{part.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{part.description}</p>
                                        <p className="text-xl font-bold mb-2">${part.price.toFixed(2)}</p>
                                        <div className="flex items-center">
                                            <div className="rating-stars flex">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <svg
                                                        key={index}
                                                        className={`w-4 h-4 ${index < Math.round(part.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className='flex items-center justify-between w-full'>
                                                <p className="text-sm text-gray-500 ml-2 flex">({part.rating})</p>
                                                <FaShoppingCart className='h-5 w-5' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CurrentDeals