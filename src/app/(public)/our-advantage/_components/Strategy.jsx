import React from 'react';
import { FaHandsHelping, FaUniversity, FaShieldAlt } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';

const Strategy = () => {
    return (
        <section className="bg-gray-100/50 py-8 py-md-5 py-xl-8 bg-light">
            <div className="w-10/12 mx-auto py-4">
                <div className="flex flex-wrap md:flex-nowrap gap-8 gy-3 gy-md-4 gy-lg-0 items-center">
                    <div className="h-full w-full md:w-1/2 flex flex-col justify-center">
                        <div className="h-full flex flex-wrap md:flex-nowrap flex-col justify-center">
                            <div className="flex flex-wrap md:flex-nowrap flex-col justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold pb-1 mb-0">More Than Just A Parts Distributor</h2>
                                <p className="text-[#b02027] fs-2 text-secondary mb-3 font-semibold">
                                    Not only do we care about making sure our customers are satisfied, but we also get a real kick out of it too! We have a passion for all things automotive, and that’s what puts us in a class of our own.


                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    West Can Auto Parts is a Canadian auto parts distributor that has been in business for over 40 years. We have access to more than two million auto parts and related accessories. Thanks to our partnership with Canada’s largest network Uni-Select, which encompasses 72,000 square meters of warehouse space in 10 warehouses from Coast to Coast and 4,000 affiliated mechanical shops.


                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    Over and above the numbers, resources and human values are what set us apart. We’re a tightly-knit team of dedicated people with a passion for what we do. We follow the latest technological trends and advancements to deliver the best the industry has to offer to our customers.


                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    West Can Auto Parts is a home-grown brand serving local people. Nothing is more rewarding than contributing to local growth on a national scale.


                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    A team of seasoned professionals who understand your needs and know how to best meet them
                                    Unparalleled service offered by our dedicated warehouse and store employees
                                    Access to millions of premium brand products with our e-commerce portal
                                    An impeccable customer experience based on skilled, caring, and passionate employees
                                    Quality products at competitive prices delivered fast
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        {/* Gallery */}
                        <div className="flex flex-wrap md:flex-nowrap gap-4 h-full items-stretch">
                            <div className="w-full md:w-1/2 col-md-12 mb-4 mb-lg-0">
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726811467/1480_gq7z9z.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Boat on Calm Water" />
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726811584/2149580614_kasfg1.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Wintry Mountain Landscape" />
                            </div>
                            <div className="w-full md:w-1/2 mb-4 mb-lg-0">
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726811467/2149580562_anguiq.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Mountains in the Clouds" />
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726811584/2148428304_jzdelu.jpg" className="w-100 shadow-1-strong rounded mb-4 object-cover h-fit" alt="Boat on Calm Water" />
                            </div>
                        </div>
                        {/* Gallery */}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Strategy;
