"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';

const JobApplicationForm = ({ params }) => {
    const jobId = params.jobId;
    const [formData, setFormData] = useState({
        applicantName: '',
        applicantEmail: '',
        phone: '',
        resume: '',
        coverLetter: '',
        positionApplied: '',
        location: '',
        experienceYears: '',
        status: 'Applied'
    });
    const [jobDetails, setJobDetails] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState('')
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://westcanuserbackend.onrender.com/api/jobs'
        : 'http://localhost:8080/api/jobs';
    useEffect(() => {
        // Fetch job details based on jobId
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/${id}`); // Adjust the endpoint if needed
                const job = response.data;

                // Set the form data with job details
                setFormData(prevState => ({
                    ...prevState,
                    positionApplied: job.jobTitle,
                    location: job.location
                }));

                // Set job details for display
                setJobDetails(job);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch job details.');
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/applied`, formData);
            setSuccess('Application submitted successfully!');
            setError('');
            // Reset form fields after successful submission
            setFormData({
                applicantName: '',
                applicantEmail: '',
                phone: '',
                resume: '',
                coverLetter: '',
                positionApplied: '',
                location: '',
                experienceYears: '',
                status: 'Applied'
            });
        } catch (err) {
            setError('Failed to submit the application. Please try again.');
            setSuccess('');
        }
    };

    if (loading) return <p>Loading job details...</p>;

    return (
        <div className="w-full mx-auto flex flex-wrap md:flex-nowrap bg-cover bg-no-repeat bg-left" style={{ backgroundImage: `url(https://res.cloudinary.com/dpeocx0yy/image/upload/v1726811584/2149580614_kasfg1.jpg)` }}>


            {/* Display selected job details */}
            <div className="w-full md:w-1/2 p-4 md:p-12 bg-[#000000d6] text-white">
                <h1 className="text-2xl font-bold mb-6">Job Application</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                {jobDetails && (
                    <div className="mb-8  rounded-lg">
                        <h2 className="text-lg font-bold mb-2">{jobDetails.jobTitle}</h2>
                        <p className="text-sm font-medium mb-2">Company: {jobDetails.company}</p>
                        <p className="text-sm mb-2">Location: {jobDetails.location}</p>
                        <p className="text-sm mb-2">Employment Type: {jobDetails.employmentType}</p>
                        <p className="text-sm mb-2">Salary Range: {jobDetails.salaryRange}</p>
                        <p className="text-sm mb-2">Application Deadline: {new Date(jobDetails.applicationDeadline).toLocaleDateString()}</p>
                        <h3 className="text-md font-medium mt-4">Job Description</h3>
                        <p className='text-sm'>{jobDetails.jobDescription}</p>
                        <h3 className="text-md font-medium mt-4">Responsibilities</h3>
                        <ul className="list-disc list-inside text-sm">
                            {jobDetails.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                        <h3 className="text-md font-medium mt-4">Qualifications</h3>
                        <ul className=" text-sm list-disc list-inside">
                            {jobDetails.qualifications.map((qualification, index) => (
                                <li key={index}>{qualification}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/2 py-4 bg-white">
                <form onSubmit={handleSubmit} className="space-y-4 w-10/12 mx-auto shadow-md rounded-md p-8 block static top-32 md:sticky ">
                    <div>
                        <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="applicantName"
                            name="applicantName"
                            value={formData.applicantName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="applicantEmail"
                            name="applicantEmail"
                            value={formData.applicantEmail}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                        {previewUrl && (
                            <p> Your resume URL : {previewUrl}</p>
                        )}
                        <CldUploadWidget uploadPreset='my-next-cloudinary-app'
                            onSuccess={({ event, info }) => {
                                if (event === 'success') {
                                    const resume = info.public_id
                                    setPreviewUrl(info.secure_url)
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        resume: resume,


                                    }))
                                }
                            }}
                        >
                            {({ open }) => (<button className='bg-[#b21b29] text-white px-2 py-1 rounded-md' type='button' onClick={() => open()}>
                                Upload Here
                            </button>)}
                        </CldUploadWidget>
                    </div>
                    <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                        <input
                            type="number"
                            id="experienceYears"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationForm;
