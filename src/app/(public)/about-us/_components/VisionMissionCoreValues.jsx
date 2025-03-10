import React from 'react';
import { FaClipboardCheck, FaUserGroup, FaNoteSticky } from 'react-icons/fa6';

const VisionMissionCoreValues = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="mx-auto w-10/12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-700">Our Purpose</p>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 ">Vision, Mission & Values</h2>
                    <p className="mx-auto mt-4 text-sm font-normal text-gray-700">
                        We are committed to excellence, innovation, and customer satisfaction in every step.
                    </p>
                </div>
                <ul className="mx-auto mt-12 grid grid-cols-1 gap-10 sm:mt-16 lg:mt-20 w-full lg:grid-cols-3">
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <FaClipboardCheck className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Vision</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                To be the leading provider of top-quality auto parts, driving innovation and exceeding customer expectations.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <FaUserGroup className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Mission</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                Provide exceptional auto parts and service, empowering customers to maintain their vehicles with ease.
                            </h4>
                        </div>
                    </li>
                    <li className="flex-start group relative flex lg:flex-col">
                        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                            <FaNoteSticky className="h-10 w-10" />
                        </div>
                        <div className="ml-6 lg:ml-0 lg:mt-10">
                            <h3 className="text-xl font-bold text-gray-900">Core Values</h3>
                            <h4 className="mt-2 text-base text-gray-700">
                                Integrity, quality, and customer focus guide our actions and decisions every day.
                            </h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default VisionMissionCoreValues;
