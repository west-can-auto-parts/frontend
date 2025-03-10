"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import locations from "@/datas/store";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? 'https://westcanuserbackend.onrender.com/api/contact'
  : 'http://localhost:8080/api/contact';
const Form = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: locations[0]?.name || "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleCardClick = (location) => {
    setSelectedLocation(location);
    setFormData((prev) => ({
      ...prev,
      company: location.name,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setError("You must agree to the privacy policy to proceed.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          agreed,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Your contact information was successfully saved!");
        setFormData({
          firstName: "",
          lastName: "",
          company: selectedLocation.name,
          email: "",
          phoneNumber: "",
          message: "",
        });
        setAgreed(false);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Failed to send the request. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log('locations: ', selectedLocation)

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-6 p-6">

      {/* Left Section: Locations */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">Find Us At</h2>
        <div
          className="bg-white w-full cursor-pointer group text-start mb-4 shadow-md rounded-lg mx-auto flex flex-wrap md:flex-nowrap gap-6 p-2"
          onClick={() => router.push(`/store/${selectedLocation.id}`)}
        >
          <img
            src={selectedLocation.imgUrl}
            alt={selectedLocation.name}
            className="w-full md:w-32 h-32 rounded-lg object-cover"
          />
          <div className="my-auto">
            <h3 className="text-lg font-semibold mb-1 text-[#b12b29] group-hover:underline transition">
              {selectedLocation.name}
            </h3>
            <p className="text-gray-600 mb-1 text-sm">
              <strong>Address:</strong> {selectedLocation.address}
            </p>
            {selectedLocation.phone && (
              <p className="text-gray-600 mb-1 text-sm">
                <strong>Phone:</strong> {selectedLocation.phone}
              </p>
            )}
            <button className="text-[#b91b29] hover:text-red-700 transition">View Store</button>
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-6 h-[50vh] overflow-y-auto py-4">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleCardClick(location)}
              className={`p-4 rounded-md cursor-pointer transition flex gap-4 items-center ${selectedLocation.id === location.id
                  ? "bg-[#b12b29] text-white"
                  : "bg-white text-gray-800 border shadow-md"
                }`}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <p className="text-sm">{location.address}</p>
                {location.phone && <p className="text-sm">Phone: {location.phone}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="w-full lg:w-2/3 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reach Out To Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
          <input
            type="text"
            name="address"
            value={selectedLocation.name}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            className="w-full p-2 border rounded-md"
          ></textarea>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-5 h-5"
            />
            <label className="text-sm">
              By selecting this, you agree to our{" "}
              <a href="#" className="text-blue-600 underline">
                privacy policy
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="block w-full rounded-md bg-[#b12b29] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Let's Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
