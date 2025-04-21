"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { throttle } from 'lodash';

export const GoogleReviews = ({ apiKey, placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://clientsidebackend.onrender.com/api/review'
    : 'http://localhost:8080/api/review';

  const throttledImageLoad = throttle((e) => {
    e.target.onerror = null; // Prevents looping
    e.target.src = 'https://via.placeholder.com/40'; // Placeholder image URL
  }, 1000); // Throttle to 1 second

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/getAllReviews`);
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError("Error fetching reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiKey, placeId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
      </div>
    );
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full py-6 md:py-12">
      <div className="w-10/12 mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center">Know What Our Customers Have To Say For Us</h3>
        <div className="w-full mx-auto">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} className="p-3 rounded-md" style={{ minWidth: '300px' }}>
                  <div className="bg-[#b91b29] text-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full" style={{ minHeight: '250px' }}>
                    <FaQuoteLeft className="w-5 h-5"/>
                    <p className="mb-4 text-md !line-clamp-6 md:!line-clamp-3">{review.description}</p>
                    <FaQuoteRight className="w-5 h-5 ml-auto"/>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center mb-2">
                        <img
                          src={review.photoUrl}
                          alt={`${review.name}'s profile`}
                          className="rounded-full w-10 h-10 mr-4 flex-shrink-0"
                          onError={throttledImageLoad}
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm mr-4">({review.rating}/5)</span>
                          </div>
                          <div className="mb-4">
                            <p className="font-semibold truncate max-w-[80px]">{review.name.split(' ')[0]}</p>
                          </div>
                        </div>
                      </div>
                      <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold text-sm hover:underline ml-4"
                      >
                        View on Google
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};