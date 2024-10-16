'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AuthLayout from "../layouts/authLayout";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component is mounted on the client side
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Assuming reset was successful
      setMessage('If an account with that email exists, you will receive a password reset link.');
      setEmail(''); // Clear the email field
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    
      <div className="flex items-center justify-center md:px-4 px-2 pt-10 md:pt-24 bg-white">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-l max-w-2xl w-full mx-4">
          {/* Left Side - Logo and Info */}
          <div className="w-full md:w-2/5 bg-[#0B3004] text-white flex flex-col justify-center items-center p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
            <Image
              src="/logo.png"
              alt="Igire Rwanda Organisation"
              width={100}
              height={100}
              priority={true}
              className="md:w-36 md:h-36 w-24 h-24"
            />
            <h1 className="text-lg md:text-xl font-bold mt-4">Igire Rwanda</h1>
            <p className="text-md md:text-lg mt-2">Organisation</p>
          </div>

          {/* Right Side - Reset Password Form */}
          <div className="w-full md:w-3/5 flex justify-center items-center p-6 md:p-8">
            <div className="w-full max-w-xs md:max-w-sm">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
                Reset Password
              </h2>

              <form onSubmit={handleSubmit} className="bg-gray-100 p-6 md:p-10 rounded-lg">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white font-semibold py-2 md:py-3 rounded-md hover:bg-green-600"
                >
                  Send Reset Link
                </button>
              </form>

              {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ResetPassword;
