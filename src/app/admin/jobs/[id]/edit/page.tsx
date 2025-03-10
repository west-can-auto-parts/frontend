// app/jobs/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditJobPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/admin/api";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

  useEffect(() => {
    async function fetchJob() {
      if (id) {
        try {
          const headers = { Authorization: `Bearer ${token}` };
          const response = await fetch(`${apiUrl}/jobs/${id}`, { headers });
          if (!response.ok) throw new Error("Failed to fetch job");
          const data = await response.json();
          setJob(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchJob();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/jobs/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) throw new Error("Failed to update job");

      setSuccessMessage("Job updated successfully!");

      setTimeout(() => {
        setSuccessMessage(null);
         // Redirect to job details page after update
      }, 2000);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      {job && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={job.jobTitle || ""}
                onChange={handleChange}
                placeholder="Job Title"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={job.location || ""}
                onChange={handleChange}
                placeholder="Location"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={job.company || ""}
                onChange={handleChange}
                placeholder="Company"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                name="jobDescription"
                value={job.jobDescription || ""}
                onChange={handleChange}
                placeholder="Job Description"
                className="mt-1 p-2 border border-gray-300 rounded w-full h-40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employment Type</label>
              <select
                name="employmentType"
                value={job.employmentType || ""}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={job.salaryRange || ""}
                onChange={handleChange}
                placeholder="Salary Range"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={job.applicationDeadline || ""}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={job.active || false}
                  onChange={(e) => setJob({ ...job, active: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditJobPage;
