"use client";

import React, { useState, useEffect } from 'react';
import { FaMapLocation, FaWrench, FaTruck, FaHandshake } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const icons = {
    "Parts Counter Person": <FaWrench />,
    "Replacement Parts Salesperson": <FaHandshake />,
    "Delivery Driver - Burnaby": <FaTruck />,
    "Delivery Driver - Langley": <FaTruck />,
    // Add more job titles and icons as needed
};
const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/jobs'
    : 'http://localhost:8080/api/jobs';
const AvailableJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const router = useRouter()
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-10/12 mx-auto my-6">
            <p className="text-2xl font-bold my-6">Available Jobs</p>
            <div className="bg-white shadow-lg rounded-lg">
                {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <div key={job.id}>
                            <div
                                className={`flex items-center justify-between p-6 cursor-pointer transition ${openIndex === index ? 'bg-[#b12b29] text-white' : 'bg-white'} border-b`}
                                onClick={() => handleToggle(index)}
                            >
                                <div className="flex items-center w-full pr-4">
                                    <div className='flex items-center justify-between w-full'>
                                        <div className="mr-4 h-7 w-7 flex items-center">
                                            {icons[job.jobTitle] || <FaWrench />} {/* Default to FaWrench if no icon is found */}
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                                            <div className="flex items-center text-base">
                                                <FaMapLocation className="mr-2" />
                                                {job.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </span>
                            </div>
                            {openIndex === index && (
                                <div className="p-6 border-b">
                                    <p className="text-sm mb-3">{job.jobDescription}</p>
                                    <button className='text-xs font-bold bg-[#b12b29] text-white px-2 py-1' onClick={()=>router.push(`/careers/${job.id}`)}>Apply Now</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No Jobs Available
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableJobs;
