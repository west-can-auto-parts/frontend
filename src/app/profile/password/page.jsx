"use client"
import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== repeatPassword) {
      alert("New password and repeat password don't match!");
      return;
    }
    // Handle password change logic here
    alert('Password changed successfully!');
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your current password"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your new password"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Repeat your new password"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
