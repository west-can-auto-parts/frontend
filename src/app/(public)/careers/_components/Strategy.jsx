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
                                <h2 className="text-2xl md:text-3xl font-bold pb-1 mb-0">Our Culture</h2>
                                <p className="text-[#b02027] fs-2 text-secondary mb-3 font-semibold">
                                    Family-Owned, Award-Winning, Customer-Focused
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    West Can is a family-operated franchise with 11 thriving locations to serve you better. The continued synergy of our customers and vendors, along with our dedication to a gold standard service, further solidifies our business platform.
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    We thrive on building genuine customer relations with the commitment of delivering quality assured products in hand with phenomenal service. We aspire to continue evolving and adjusting to your needs.
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    West Can Auto Parts has been honoured with myriad awards and achievements of excellence, bearing a reputation for its outstanding product quality and fine-tuned customer service.
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    The company’s commitment to quality is evident in its sourcing practices. West Can Auto Parts partners with reputable manufacturers and suppliers to ensure that the parts it offers meet or exceed industry standards. This emphasis on quality not only ensures customer satisfaction but also promotes vehicle safety and longevity.
                                </p>
                                <p className="mb-5" style={{ textAlign: 'justify' }}>
                                    In addition to its impressive inventory, West Can Auto Parts takes pride in its knowledgeable and friendly staff. The company employs experienced professionals who possess a deep understanding of Replacement Parts and can provide expert advice to customers.
                                </p>
                                    
                                <p className="mt-4">
                                    At West Can Auto Parts, we strive to maintain our reputation for excellence by continually evolving and adjusting to meet the needs of our customers.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        {/* Gallery */}
                        <div className="flex flex-wrap md:flex-nowrap gap-4 h-full items-stretch">
                            <div className="w-full md:w-1/2 col-md-12 mb-4 mb-lg-0">
                                <img src="https://img.freepik.com/free-photo/composition-different-car-accessories_23-2149030399.jpg?t=st=1723807889~exp=1723811489~hmac=0073f1124d77c4a985389a6756aa8c68cfb5de88b49bdd0c14be587c795e0cf4&w=740" className="w-100 shadow-1-strong rounded mb-4" alt="Car Accessories" />
                                <img src="https://img.freepik.com/free-photo/car-parts-repair-garage_1170-1702.jpg?t=st=1723807534~exp=1723811134~hmac=582e51a73f3ec15fc924197d5be21fab6e27a5200c6eed77c2261474e1e4f850&w=1380" className="w-100 shadow-1-strong rounded mb-4" alt="Garage" />
                            </div>
                            <div className="w-full md:w-1/2 mb-4 mb-lg-0">
                                <img src="https://img.freepik.com/free-photo/various-work-tools-worktop_1170-1505.jpg?t=st=1723807963~exp=1723811563~hmac=a01ed91168f10c8d45c0b70ed5afb19f443978509ce58f90067702364eca59b0&w=1380" className="w-100 shadow-1-strong rounded mb-4" alt="Work Tools" />
                                <img src="https://img.freepik.com/free-photo/composition-different-car-accessories_23-2149030386.jpg?t=st=1723807931~exp=1723811531~hmac=f02698a38515e2de077cde2c1dcb40de4b2c4d64208a33b714e3f0203a266ec3&w=740" className="w-100 shadow-1-strong rounded mb-4 object-cover h-fit" alt="Auto Parts" />
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
