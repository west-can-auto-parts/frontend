// components/NewsletterForm.tsx
"use client"

import React, { useState } from 'react';

export  const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [message, setMessage] = useState<string>('');

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api'
    : 'http://localhost:8080/api';

 const handleSubmit = async (e: React.FormEvent) => {
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
      console.log(data)

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
    <div>
      <h2 className='font-semibold text-xl mb-2'>
      Subscribe Us
      </h2>
<p className='text-sm'>
Sign up for newsletter and get latest news and updates..
</p>


      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="text-sm border p-2 bg-[#020202] rounded text-white w-full placeholder:text-white placeholder:p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="text-sm bg-[#b12b29] text-white p-2 rounded mt-2 w-full">
          Subscribe
        </button>
      </form>
      {status && (
        <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};


