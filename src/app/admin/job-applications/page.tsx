"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AdminJobApplicationsPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'applicantName',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${apiUrl}/job-application/all`, { headers });
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError('Failed to fetch job applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = sortedApplications.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        const res = await fetch(`${apiUrl}/job-application/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setApplications(applications.filter(app => app.id !== id));
        }
      } catch (err) {
        setError('Failed to delete job application.');
      }
    }
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  return (
    <div className="mx-auto">
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Job Applications List</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('applicantName')}>
                Name {sortConfig.key === 'applicantName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('applicantEmail')}>
                Email {sortConfig.key === 'applicantEmail' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('phone')}>
                Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('positionApplied')}>
                Position {sortConfig.key === 'positionApplied' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{app.applicantName}</td>
                <td className="px-4 py-2 border-b">{app.applicantEmail}</td>
                <td className="px-4 py-2 border-b">{app.phone}</td>
                <td className="px-4 py-2 border-b">{app.positionApplied}</td>
                <td className="px-4 py-2 border-b">{app.status}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => router.push(`/admin/job-applications/${app.id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobApplicationsPage;
