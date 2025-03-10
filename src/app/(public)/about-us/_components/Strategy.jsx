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
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809388/pikaso_texttoimage_auto-parts-in-red-black-and-white-theme-_sc5e9q.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Car Accessories" />
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809388/pikaso_texttoimage_auto-parts-for-cars-in-red-black-and-white-theme-_1_db8hrj.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Garage" />
                            </div>
                            <div className="w-full md:w-1/2 mb-4 mb-lg-0">
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726728770/pikaso_texttoimage_images-of-an-auto-parts-store-with-red-white-black_3_mvsdup.jpg" className="w-100 shadow-1-strong rounded mb-4" alt="Work Tools" />
                                <img src="https://res.cloudinary.com/dpeocx0yy/image/upload/v1726809388/pikaso_texttoimage_auto-parts-in-red-black-and-white-theme-_1_vba1az.jpg" className="w-100 shadow-1-strong rounded mb-4 object-cover h-fit" alt="Auto Parts" />
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
