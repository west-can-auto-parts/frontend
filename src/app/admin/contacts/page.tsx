"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
  agreed: boolean;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const AdminContactsPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState({ firstName: "", startDate: "", endDate: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "subscribers">("contacts");

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/admin/api";

  const token = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const endpoint = activeTab === "contacts" ? "contact" : "subscribe";
      const response = await axios.get(`${apiUrl}/${endpoint}`,{headers});
      setData(response.data);
    } catch (err) {
      setError(`Failed to fetch ${activeTab}.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = activeTab === "contacts" 
    ? (Array.isArray(data) ? data.filter((item) => {
        const matchesFirstName =
          filters.firstName === "" ||
          item.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
        const matchesDate =
          (!filters.startDate || new Date(item.createdAt) >= new Date(filters.startDate)) &&
          (!filters.endDate || new Date(item.createdAt) <= new Date(filters.endDate));
        return matchesFirstName && matchesDate;
      }) : [])
    : data;

  const handleDownloadExcel = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const endpoint = activeTab === "contacts" ? "download-contacts" : "download-subscribers";
      const response = await axios.get(`${apiUrl}/${endpoint}`, {
        responseType: "blob", // Ensure the response is treated as a file
        headers
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${activeTab}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(`Failed to download the ${activeTab} Excel file.`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin - {activeTab === "contacts" ? "Contacts" : "Subscribers"}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p>Loading {activeTab}...</p>}

      <div className="mb-4 flex gap-4">
        <button
          className={`p-2 rounded ${activeTab === "contacts" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts
        </button>
        <button
          className={`p-2 rounded ${activeTab === "subscribers" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("subscribers")}
        >
          Subscribers
        </button>
      </div>

      {activeTab === "contacts" && (
        <div>
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Filter by First Name"
              className="border p-2 rounded w-full"
              value={filters.firstName}
              onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
            />
            <input
              type="date"
              placeholder="Start Date"
              className="border p-2 rounded"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <input
              type="date"
              placeholder="End Date"
              className="border p-2 rounded"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
            <button
              onClick={() => setFilters({ firstName: "", startDate: "", endDate: "" })}
              className="bg-gray-200 p-2 rounded"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleDownloadExcel}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Download Excel
      </button>

      <h2 className="text-xl font-semibold mb-4">{activeTab === "contacts" ? "Contacts List" : "Subscribers List"}</h2>
      {filteredData.length === 0 ? (
        <p>No {activeTab} found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {activeTab === "contacts" ? (
                <>
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">Company</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Agreed</th>
                  <th className="border p-2">Created At</th>
                </>
              ) : (
                <>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Subscribed At</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any) => (
              <tr key={item.id}>
                {activeTab === "contacts" ? (
                  <>
                    <td className="border p-2">{item.firstName}</td>
                    <td className="border p-2">{item.lastName}</td>
                    <td className="border p-2">{item.companyName || "N/A"}</td>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2">{item.phoneNumber}</td>
                    <td className="border p-2">{item.message}</td>
                    <td className="border p-2">{item.agreed ? "Yes" : "No"}</td>
                    <td className="border p-2">{item.createdAt}</td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2">{item.subscribedAt}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactsPage;
