import React from 'react';
import { MdSpeed, MdBuild, MdHighQuality, MdInventory, MdVerified, MdHub } from 'react-icons/md';

const HowAreWeDifferent = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="mx-auto w-10/12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">How Are We Different</h2>
                </div>
                <ul className="mx-auto mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:mt-20 w-full lg:grid-cols-3">
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdSpeed className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Speed and Efficiency</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                Because our warehouses and stores are strategically located, our products are delivered in less than 45 minutes*.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdBuild className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Unmatched Know-How</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                We constantly renew and upgrade our skills thanks to our continuous and passionate commitment to training and development.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdHighQuality className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Unparalleled Quality</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                We source products from the original equipment market (OEM) and from 330 suppliers in Canada.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdInventory className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Wide Selection</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                Our distribution network provides access to more than two million products.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdVerified className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">A Name You Can Trust</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                Leverage our strong expertise and our more than 40 years of experience in the automotive service and repair industry.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <MdHub className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Unbeatable Network</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                11 Locations, 200,000 square feet of space, servicing 1,000 repair centers.
                            </h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default HowAreWeDifferent;
