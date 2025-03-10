"use client";
import React, { useState } from 'react';

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
  
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
      ? 'https://westcanuserbackend.onrender.com/api'
      : 'http://localhost:8080/api';
  
   const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${apiUrl}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          setEmail(''); // Clear the input field
        } else {
          setStatus('error');
          setMessage(data.message || 'Something went wrong.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Failed to subscribe.');
      }
    };
  

  return (
    <div className="bg-black/90 shadow-md rounded-lg p-8 mb-8 text-white">
      <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
      <p className="mb-4 text-gray-100 text-sm">
        Enter your email address below to subscribe to our newsletter and keep up to date with the
        latest news, discounts, and special offers.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="placeholder:text-white w-full px-3 py-2 rounded-md mb-4 bg-black/50"
          required
        />
        <button type="submit" className="w-full bg-[#b12b29] text-white px-4 py-2 rounded-md">
          Subscribe
        </button>
      </form>
      {status && (
        <p
          className={`mt-2 text-sm ${
            status === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
