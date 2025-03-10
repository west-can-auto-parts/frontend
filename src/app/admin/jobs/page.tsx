// app/jobs/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  useEffect(() => {
    async function fetchJobs() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${apiUrl}/jobs/all`,{headers});
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Openings</h1>
      <Link href="/admin/jobs/create" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Create Job</Link>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.jobTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={`/admin/jobs/${job.id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
