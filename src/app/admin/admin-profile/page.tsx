"use client";

import React, { useState, useEffect } from "react";

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

const AdminUsersPage = () => {
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [newUser, setNewUser] = useState<{ name: string; email: string; role: string; password: string }>({
        name: "",
        email: "",
        role: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/api/admin-users"
    : "http://localhost:8081/api/admin-users";
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

    useEffect(() => {
        fetchAdminUsers();
    }, []);

    const fetchAdminUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setAdminUsers(data);
        } catch (err) {
            setError("Failed to fetch admin users.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user: AdminUser) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedUser) return;

        try {
            await fetch(`${apiUrl}/${selectedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(selectedUser),
            });
            setIsEditModalOpen(false);
            fetchAdminUsers();
        } catch (err) {
            setError("Failed to update admin user.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this admin?")) return;
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAdminUsers();
        } catch (err) {
            setError("Failed to delete admin user.");
        }
    };

    const handleCreateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await fetch(`${apiUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });
            setIsCreateModalOpen(false);
            fetchAdminUsers();
        } catch (err) {
            setError("Failed to create admin user.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Users</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p>Loading...</p>}

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsCreateModalOpen(true)}
            >
                Create Admin
            </button>

            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Create Admin User</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, name: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, role: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Owner">Owner</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, password: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Edit Admin User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, name: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, email: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Role</label>
                                <select
                                    value={selectedUser.role}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, role: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Owner">Owner</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;