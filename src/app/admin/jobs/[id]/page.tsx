// app/jobs/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  useEffect(() => {
    async function fetchJob() {
      if (id) {
        try {
          const headers = {Authorization: `Bearer ${token}` };
          const response = await fetch(`${apiUrl}/jobs/${id}`,{headers});
          if (!response.ok) throw new Error('Failed to fetch job');
          const data = await response.json();
          if (Object.keys(data).length === 0) throw new Error('Job not found');
          setJob(data);
        } catch (error:any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await fetch(`${apiUrl}/jobs/delete/${id}`, {
          method: 'DELETE',headers:{Authorization: `Bearer ${token}`}
        });
        router.push('/admin/jobs');
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" bg-white">
      {job && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{job.jobTitle}</h1>
          
          <div className="mb-6">
            <p><strong className="font-medium">Location:</strong> {job.location}</p>
            <p><strong className="font-medium">Company:</strong> {job.company}</p>
            <p><strong className="font-medium">Description:</strong> {job.jobDescription}</p>
            <p><strong className="font-medium">Responsibilities:</strong> {job.responsibilities}</p>
            <p><strong className="font-medium">Qualifications:</strong> {job.qualifications}</p>
            <p><strong className="font-medium">Employment Type:</strong> {job.employmentType}</p>
            <p><strong className="font-medium">Salary Range:</strong> {job.salaryRange}</p>
            <p><strong className="font-medium">Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
            <p><strong className="font-medium">Active:</strong> {job.active ? 'Yes' : 'No'}</p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => router.push(`/admin/jobs/${id}/edit`)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
