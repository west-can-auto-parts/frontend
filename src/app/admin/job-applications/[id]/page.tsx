"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { ok } from 'assert';

const ViewJobApplicationPage = () => {
  const [application, setApplication] = useState<any | null>(null);
  const [status, setStatus] = useState<string>('Applied');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams(); // Assuming you use `useParams` to get the ID from the URL
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      try {
        const headers = {Authorization: `Bearer ${token}` };
        const response = await fetch(`${apiUrl}/job-application/${id}`,{headers});
        const data = await response.json();
        setApplication(data);
        // setStatus(ok);
      } catch (err) {
        setError('Failed to fetch job application.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/job-applications/${id}`, { ...application, status });
      router.push('/admin/job-applications'); // Redirect after successful update
    } catch (err) {
      setError('Failed to update job application.');
    }
  };

  if (loading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!application) return <div className="text-center">Application not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">View Job Application</h2>
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Name:</strong> {application.applicantName}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {application.applicantEmail}
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> {application.phone}
        </div>
        <div className="mb-4">
          <strong>Position Applied:</strong> {application.positionApplied}
        </div>
        <div className="mb-4">
          <strong>Location:</strong> {application.location}
        </div>
        <div className="mb-4">
          <strong>Experience (Years):</strong> {application.experienceYears}
        </div>
        <div className="mb-4">
          <strong>Resume:</strong> <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
        </div>
        <div className="mb-4">
          <strong>Cover Letter:</strong> {application.coverLetter || 'N/A'}
        </div>

        <form onSubmit={handleUpdate} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewJobApplicationPage;
