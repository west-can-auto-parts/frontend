import React from 'react';

import { FaHandsHelping, FaUniversity, FaShieldAlt  } from 'react-icons/fa';
import { FaGears,  } from 'react-icons/fa6';
const Culture = () => {
    return (
        <section className="bg-gray-100/50 py-8 py-md-5 py-xl-8 bg-light">
            <div className="w-10/12 mx-auto py-4">
                <div className="flex flex-wrap md:flex-nowrap gap-8 gy-3 gy-md-4 gy-lg-0 items-center">
                    <div className="w-full md:w-1/2">
                        {/* Gallery */}
                        <div className="flex flex-wrap md:flex-nowrap gap-4 h-full items-stretch">
                            <div className="w-full md:w-1/2 col-md-12 mb-4 mb-lg-0">
                                <img src="https://img.freepik.com/free-photo/composition-different-car-accessories_23-2149030399.jpg?t=st=1723807889~exp=1723811489~hmac=0073f1124d77c4a985389a6756aa8c68cfb5de88b49bdd0c14be587c795e0cf4&w=740" className="w-100 shadow-1-strong rounded mb-4" alt="Boat on Calm Water" />
                                <img src="https://img.freepik.com/free-photo/car-parts-repair-garage_1170-1702.jpg?t=st=1723807534~exp=1723811134~hmac=582e51a73f3ec15fc924197d5be21fab6e27a5200c6eed77c2261474e1e4f850&w=1380" className="w-100 shadow-1-strong rounded mb-4" alt="Wintry Mountain Landscape" />
                            </div>
                            <div className="w-full md:w-1/2 mb-4 mb-lg-0">
                                <img src="https://img.freepik.com/free-photo/various-work-tools-worktop_1170-1505.jpg?t=st=1723807963~exp=1723811563~hmac=a01ed91168f10c8d45c0b70ed5afb19f443978509ce58f90067702364eca59b0&w=1380" className="w-100 shadow-1-strong rounded mb-4" alt="Mountains in the Clouds" />
                                <img src="https://img.freepik.com/free-photo/composition-different-car-accessories_23-2149030386.jpg?t=st=1723807931~exp=1723811531~hmac=f02698a38515e2de077cde2c1dcb40de4b2c4d64208a33b714e3f0203a266ec3&w=740" className="w-100 shadow-1-strong rounded mb-4 object-cover h-fit" alt="Boat on Calm Water" />
                            </div>
                        </div>
                        {/* Gallery */}
                    </div>
                    <div className="h-full w-full md:w-1/2 flex flex-col justify-center">
                        <div className="h-full flex flex-wrap md:flex-nowrap flex-col justify-center">
                            <div className="flex flex-wrap md:flex-nowrap flex-col justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold pb-1 mb-0">Our Strategy</h2>
                                <p className="text-[#b02027] fs-2 text-secondary mb-3 font-semibold">
                                    Customer-Centricity, Excellence, Innovation
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    At West Can Auto Parts, our strategy revolves around three key pillars: customer-centricity, product excellence, and technological innovation.
                                </p>
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2">
                                        <div className="card border-0 bg-light p-4">
                                            <div className="card-body">
                                               <FaHandsHelping className='h-10 w-10 p-2 rounded-full bg-[#b12b29] text-white'/>
                                                <h5 className="card-title text-lg md:text-xl font-semibold">Customer-Centric Approach</h5>
                                                <p className="card-text">
                                                    We prioritize understanding and meeting the unique needs of our customers, offering quality auto parts and personalized assistance.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="card border-0 bg-light p-4 ">
                                            <div className="card-body">
                                            <FaShieldAlt className='h-10 w-10 p-2 rounded-full bg-[#b12b29] text-white'/>
                                               
                                                <h5 className="card-title text-lg md:text-xl font-semibold">Product Excellence</h5>
                                                <p className="card-text">
                                                    We source and provide the highest quality auto parts, ensuring our customers receive reliable products that exceed industry standards.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="card border-0 bg-light p-4">
                                            <div className="card-body">
                                            <FaGears className='h-10 w-10 p-2 rounded-full bg-[#b12b29] text-white'/>
                                               
                                                <h5 className="card-title text-lg md:text-xl font-semibold">Technological Innovation</h5>
                                                <p className="card-text">
                                                    We embrace technology to streamline operations and enhance the customer experience, providing a seamless online shopping experience.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4">
                                    Through these pillars, we aim to establish West Can Auto Parts as a trusted leader in the automotive industry, providing exceptional value and service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Culture;
