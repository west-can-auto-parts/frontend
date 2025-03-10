// app/jobs/create/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateJobPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState<string>('');
  const [qualifications, setQualifications] = useState<string>('');
  const [employmentType, setEmploymentType] = useState('FullTime');
  const [salaryRange, setSalaryRange] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  const handleCreate = async () => {
    try {
        const formattedDeadline = applicationDeadline
        ? new Date(applicationDeadline).toISOString()
        : null;
      await fetch(`${apiUrl}/jobs/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`},
        body: JSON.stringify({
          jobTitle,
          location,
          company,
          jobDescription,
          responsibilities: responsibilities.split('\n'),
          qualifications: qualifications.split('\n'),
          employmentType,
          salaryRange,
          applicationDeadline:formattedDeadline,
          active
        }),
      });
      setSuccess('Job created successfully.');
      setError(null);
      setTimeout(() => router.push('/admin/jobs'), 2000);
    } catch (error) {
      setError('Error creating job.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Job</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Job Description"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">Responsibilities (one per line)</label>
          <textarea
            id="responsibilities"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Responsibilities"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">Qualifications (one per line)</label>
          <textarea
            id="qualifications"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Qualifications"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
            required
          >
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
          <input
            type="text"
            id="salaryRange"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="Salary Range"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
          />
        </div>
        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="date"
            id="applicationDeadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Job
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default CreateJobPage;
