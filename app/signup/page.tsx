'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import meralcoImage from "@/assets/meralco.svg"
import googleImage from "@/assets/gmail.svg"
import Link from 'next/link'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfPassword = () => {
    setShowConfPassword(!showConfPassword)
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center">
      {/* Logo Section */}
      <div className="flex justify-center pt-[52px]">
        <Image src={meralcoImage} width={56} height={56} alt="meralcoimg" />
      </div>

      {/* Title Section */}
      <div className="flex justify-center text-2xl pt-[34px]">
        Create an Account
      </div>

      {/* Description Section */}
      <div className="flex justify-center text-base pt-2 text-[#535862]">
        Start Your Journey through energy with
      </div>
      <div className="flex justify-center text-base pt-1 text-[#535862]">
        Airene!
      </div>

      {/* Form Section: Flexbox layout for label and input */}
      <div className="flex flex-col items-center mt-3 w-full max-w-3xl px-4">
        {/* Email Label and Input Field */}
        <div className="w-full mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email*
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Label and Input Field */}
        <div className="w-full mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password*
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Must be at least 8 characters text aligned with other labels */}
        <div className="w-full mb-1 text-sm text-[#535862] pl-1">
          Must be at least 8 characters.
        </div>

        {/* Confirm Password Label and Input Field */}
        <div className="w-full mb-4">
          <label htmlFor="confPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password*
          </label>
          <div className="relative">
            <input
              id="confPassword"
              type={showConfPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={toggleConfPassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="button"  // Change from submit to button to prevent form submission
          className="w-full py-3 px-4 mb-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
        >
          Create Account
        </button>

        {/* Sign In with Google Button */}
        <button
          type="button"
          className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <Image src={googleImage} className="mr-2 text-xl" alt="google image"/>
          Sign In with Google
        </button>

        {/* Already have an account? Login Text */}
        <div className="flex items-center justify-center mt-4">
          <div className="text-sm text-[#535862]">
            Already have an account?
          </div>
          <Link href="/" className="text-orange-500 hover:underline ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
