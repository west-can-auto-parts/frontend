import React from 'react';
import { FaArrowUpRightFromSquare, FaScaleBalanced, FaHandshake } from 'react-icons/fa6';

const VisionMissionCoreValues = () => {
    return (
        <section className="w-full md:w-2/3 sm:py-16 lg:py-8 mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                {/* <p className="text-sm font-bold uppercase tracking-widest text-gray-700">Join Our Team</p> */}
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Reasons to Work with Us</h2>
                <p className="mx-auto mt-4 text-sm font-normal text-gray-700">
                    Join us at West Can Auto Parts and become part of a dynamic team where your expertise, passion, and ideas are valued. Together, we'll shape the future of Replacement Parts e-commerce.
                </p>
            </div>
            <ul className="mx-auto mt-6 grid grid-cols-1 gap-10 sm:mt-4 lg:mt-6 w-full lg:grid-cols-3">
                <li className="flex-start group relative flex lg:flex-col">
                    <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                        <FaArrowUpRightFromSquare className="h-10 w-10" />
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                        <h3 className="text-lg font-bold text-gray-900">Growth Opportunities</h3>
                        <h4 className="mt-2  text-gray-700 text-sm">
                            We believe in investing in our team members' development. Whether it's through ongoing training programs, mentorship opportunities, or challenging projects, we are committed to helping you reach your full potential.
                        </h4>
                    </div>
                </li>
                <li className="flex-start group relative flex lg:flex-col">
                    <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                        <FaScaleBalanced className="h-10 w-10" />
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                        <h3 className="text-lg font-bold text-gray-900">Work-Life Balance</h3>
                        <h4 className="mt-2  text-gray-700 text-sm">
                            We understand the importance of maintaining a healthy work-life balance. We offer flexible schedules, remote work options, and various employee benefits to ensure your well-being.
                        </h4>
                    </div>
                </li>
                <li className="flex-start group relative flex lg:flex-col">
                    <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-gray-200 transition-all duration-200 text-[#b02027]">
                        <FaHandshake className="h-10 w-10" />
                    </div>
                    <div className="ml-6 lg:ml-0 lg:mt-10">
                        <h3 className="text-lg font-bold text-gray-900">Collaborative Environment</h3>
                        <h4 className="mt-2  text-gray-700 text-sm">
                            Collaboration is the cornerstone of our success. We foster a culture of teamwork, where ideas are shared, and everyone's voice is heard.
                        </h4>
                    </div>
                </li>
            </ul>
            
        </div>
    </section>
    );
};

export default VisionMissionCoreValues;
