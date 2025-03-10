import React from 'react';

const EditProfile = () => {
  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value="Ryan"
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value="Ford"
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value="red-parts@example.com"
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value="38 972 588-42-36"
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
