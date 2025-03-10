"use client";

import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { currentUser } from '@/lib/auth';

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  phone: string;
  email: string;
}

const AddressBook: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    phone: '',
    email: '',
  });

  // Fetch addresses from API
  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses'); // Update the URL based on your route
      if (response.ok) {
        const data: Address[] = await response.json();
        setAddresses(data);
      } else {
        console.error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add a new address
  const handleAddAddress = async () => {
    try {
      const user = await currentUser();
      const id = user?.id;
      const response = await fetch(`/api/user/${id}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        const data: Address = await response.json();
        setAddresses([...addresses, data]);
        setNewAddress({
          name: '',
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          phone: '',
          email: '',
        });
        setIsAdding(false);
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  // Edit an address
  const handleEditAddress = async (id: string) => {
    // Implement address editing logic
  };

  // Delete an address
  const handleDeleteAddress = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}/addresses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAddresses(addresses.filter(address => address.id !== id));
      } else {
        console.error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Address Book</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 p-4 rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-2">{address.name}</h3>
            <p className="text-gray-700">{address.addressLine1}</p>
            {address.addressLine2 && <p className="text-gray-700">{address.addressLine2}</p>}
            {address.addressLine3 && <p className="text-gray-700">{address.addressLine3}</p>}
            <p className="text-gray-700">Phone Number: {address.phone}</p>
            <p className="text-gray-700">Email Address: {address.email}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditAddress(address.id)}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FaEdit className="mr-1" /> Edit Address
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-500 hover:text-red-700 flex items-center"
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))}
        <div className="border border-gray-200 p-4 rounded-lg bg-white flex flex-col items-center justify-center">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Address
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="mt-6 border border-gray-200 p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">New Address</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={newAddress.addressLine1}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={newAddress.addressLine2 || ''}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address Line 3"
              value={newAddress.addressLine3 || ''}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine3: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newAddress.email}
              onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              onClick={handleAddAddress}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
