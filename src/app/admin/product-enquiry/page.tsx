"use client";

import React, { useState, useEffect } from "react";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    store: string;
    productName: string[];
    message: string;
    createdAt: string;
}

const AdminEnquiriesPage = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [filters, setFilters] = useState({
        name: [] as string[],
        store: [] as string[],
        productName: [] as string[],
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
        ? "https://westcanadmin.onrender.com/admin/api"
        : "http://localhost:8081/admin/api";
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await fetch(`${apiUrl}/product-enquiry-form`,{headers});
                const enquiryRes = await response.json();
                setEnquiries(enquiryRes);
            } catch (err) {
                setEnquiries([]);
                setError("Failed to fetch enquiries.");
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    const handleFilterChange = (field: "name" | "store" | "productName", value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: prevFilters[field].includes(value)
                ? prevFilters[field].filter((item) => item !== value)
                : [...prevFilters[field], value],
        }));
    };

    const filteredEnquiries = enquiries.filter((enquiry) => {
        const matchesName =
            filters.name.length === 0 || filters.name.includes(enquiry.name);
        const matchesStore =
            filters.store.length === 0 || filters.store.includes(enquiry.store);
        const matchesProductName =
            filters.productName.length === 0 ||
            (enquiry.productName &&
                enquiry.productName.some((product) =>
                    filters.productName.includes(product)
                ));
        return matchesName && matchesStore && matchesProductName;
    });

    const getUniqueValues = (field: "name" | "store" | "productName") => {
        const values = enquiries.flatMap((enquiry) =>
            field === "productName" && Array.isArray(enquiry.productName)
                ? enquiry.productName
                : enquiry[field]
        );
        return Array.from(new Set(values));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Enquiries</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p>Loading enquiries...</p>}

            {/* Filter Button */}
            <button
                onClick={() => setIsFilterModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
            >
                Filter
            </button>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <div className="space-y-4">
                            {["name", "store", "productName"].map((field) => (
                                <div key={field} className="border p-4 rounded">
                                    <h3 className="font-semibold mb-2 capitalize">{field}</h3>
                                    <div
                                        className={`${
                                            getUniqueValues(field as "name" | "store" | "productName").length > 5
                                                ? "h-32 overflow-y-auto"
                                                : ""
                                        }`}
                                    >
                                        {getUniqueValues(field as "name" | "store" | "productName").map((value) => (
                                            <label key={value} className="block mb-2">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={filters[field as keyof typeof filters].includes(value)}
                                                    onChange={() =>
                                                        handleFilterChange(field as "name" | "store" | "productName", value)
                                                    }
                                                />
                                                {value || "N/A"}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enquiries Table */}
            <h2 className="text-xl font-semibold mb-4">Enquiries List</h2>
            {filteredEnquiries.length === 0 ? (
                <p>No enquiries found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Store</th>
                            <th className="border p-2">Product Name(s)</th>
                            <th className="border p-2">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEnquiries.map((enquiry) => (
                            <tr key={enquiry.id}>
                                <td className="border p-2">{enquiry.name}</td>
                                <td className="border p-2">{enquiry.email}</td>
                                <td className="border p-2">{enquiry.store || "N/A"}</td>
                                <td className="border p-2">
                                    {enquiry.productName && Array.isArray(enquiry.productName)
                                        ? enquiry.productName.join(", ")
                                        : "N/A"}
                                </td>
                                <td className="border p-2">{enquiry.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminEnquiriesPage;
