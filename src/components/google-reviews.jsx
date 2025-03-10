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

export const GoogleReviews = ({ apiKey, placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews`);
        const filteredReviews = response.data.combinedReviews.filter(
          (review) => review.rating >= 4 // Only show reviews with rating above 4
        );
        setReviews(filteredReviews);
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
    <div className="w-10/12 mx-auto rounded-lg flex flex-wrap md:flex-nowrap gap-2 md:gap-4 py-2 md:py-6">
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <p className="text-2xl font-bold">
          Know What Our Customers Have To Say For Us
        </p>
        <p className="font-semibold text-[#b12b29]">
          Reviews, Experiences and a lot more!
        </p>

      </div>
      <div className="w-full md:w-1/2">
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            className="w-full h-full"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 4,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 1,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="!h-full pt-4 pb-12 px-1">

                <div className="bg-[#b91b29] text-white p-4 rounded-lg shadow-md !h-full flex flex-col justify-between" style={{ height: "100%" }}>
                  <FaQuoteLeft className="w-5 h-5"/>

                  <p className=" mb-2 text-md !line-clamp-3 md:!line-clamp-2">{review.text}</p>

                <FaQuoteRight className="w-5 h-5 ml-auto"/>


                  <div className="flex justify-between items-center">
                    <div className="flex items-center mb-2">
                      <img
                        src={review.profile_photo_url}
                        alt={`${review.author_name}'s profile`}
                        className="rounded-full w-10 h-10 mr-4"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm ">({review.rating}/5)</span>
                        </div>
                        {/* <p className="font-semibold">{review.author_name}</p> */}
                        <p className="text-xs ">
                          <em>{review.relative_time_description}</em>
                        </p>
                      </div>
                    </div>

                    <a
                      href={review.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold text-sm hover:underline"
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
  );
};
