"use client";

import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    phone: '',
    resume: '',
    coverLetter: '',
    positionApplied: '',
    location: '',
    experienceYears: '',
    status: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await axios.post('/api/applications', formData);
      setSuccess('Application submitted successfully!');
      setError('');
      // Reset form fields after successful submission
      setFormData({
        applicantName: '',
        applicantEmail: '',
        phone: '',
        resume: '',
        coverLetter: '',
        positionApplied: 'Parts Counter Person',
        location: 'Burnaby',
        experienceYears: '',
        status: 'Applied'
      });
    } catch (err) {
      setError('Failed to submit the application. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Job Application</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            type="text"
            id="resume"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
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
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
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
  );
};

export default JobApplicationForm;
