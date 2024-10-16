'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AuthLayout from "../layouts/authLayout";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    
      <div className="flex items-center justify-center sm:mr-0 md:px-4 px-2 pt-10 md:pt-15 bg-white">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg max-w-3xl w-full mx-0 md:mx-4">
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

          {/* Right Side - Login Form */}
          <div className="w-full md:w-3/5 flex justify-center items-center p-6 md:p-8">
            <div className="w-full max-w-xs md:max-w-sm">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Login</h2>

              <form onSubmit={handleSubmit} className="bg-gray-100 p-6 md:p-10 rounded-lg">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6 relative">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full px-4 py-2 pr-12 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Eye icon inside the input field */}
                  <span
                    className="absolute inset-y-0 mt-5 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white font-semibold py-2 md:py-3 rounded-md hover:bg-green-600"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-2 text-center">
                Forgot password?
                <a href="resetpassword" className="text-green-900 hover:underline">
                  Click here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Login;
