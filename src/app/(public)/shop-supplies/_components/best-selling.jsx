"use client";

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

export const FeaturedProductsCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch featured products from API
        axios.get('/api/featured-products')
            .then(response => {
                setProducts(response.data.featuredProducts);
            })
            .catch(error => {
                console.error('Error fetching featured products:', error);
            });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        
    };

    return (
        <div className="relative w-full h-[200px] overflow-hidden bg-white mt-4">
            <p className="text-lg font-bold">Explore Our Best Sellers</p>
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product._id} className="!flex items-center p-4 gap-4">
                        <div className='w-fit'>
                            <img
                                src={product.imageUrls[0]}
                                alt={product.description}
                                className="w-7 md:w-12 h-7 md:h-12 object-cover rounded-md"
                            />
                        </div>

                        <h3 className="text-sm font-semibold w-fit">{product.description}</h3>


                    </div>
                ))}
            </Slider>
        </div>
    );
};
