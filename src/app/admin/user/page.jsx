"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Tailwind styles for modal
const buttonStyles =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const inputStyles =
  "border rounded py-2 px-4 mb-4 w-full";
const modalStyles =
  "fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-75";

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={modalStyles}>
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const UserAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "USER",
    isTwoFactorEnabled: false,
  });

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user"); // API endpoint for fetching users
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update user
        await axios.put(`/api/user/${currentUser.id}`, formValues);
      } else {
        // Create new user
        await axios.post("/api/user", formValues);
      }
      // Reset form and state
      setFormValues({
        name: "",
        email: "",
        role: "USER",
        isTwoFactorEnabled: false,
      });
      setIsModalOpen(false);
      setIsEditMode(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please check the console for more details.");
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormValues({
      name: user.name,
      email: user.email,
      role: user.role,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please check the console for more details.");
    }
  };

  const openCreateModal = () => {
    setFormValues({
      name: "",
      email: "",
      role: "USER",
      isTwoFactorEnabled: false,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Button to open Create User modal */}
      <button onClick={openCreateModal} className={buttonStyles}>
        Add New User
      </button>

      {/* User Table */}
      <table className="min-w-full bg-white border border-gray-300 mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">2FA Enabled</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.isTwoFactorEnabled ? "Yes" : "No"}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Create/Edit User */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className={inputStyles}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className={inputStyles}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formValues.role}
              onChange={handleInputChange}
              className={inputStyles}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="EDITOR">EDITOR</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Two-Factor Enabled
            </label>
            <input
              type="checkbox"
              name="isTwoFactorEnabled"
              checked={formValues.isTwoFactorEnabled}
              onChange={(e) =>
                setFormValues({ ...formValues, isTwoFactorEnabled: e.target.checked })
              }
            />
          </div>
          <button type="submit" className={buttonStyles}>
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserAdminPanel;
