import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import imgUser from "../../assets/images/avatar-370-456322-512.webp";

export default function Profile() {
  // Safely parse user profile from localStorage
  let userProfile = { name: "Guest User", email: "guest@example.com" }; // Default values

  try {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      userProfile = JSON.parse(storedProfile);
    }
  } catch (error) {
    console.error("Failed to parse userProfile from localStorage", error);
  }

  // Get the first two words of the user's name
  const fullName = userProfile.name || "";
  const firstTwoWords = fullName.split(" ").slice(0, 2).join(" ");

  return (
    <div
      style={{ fontFamily: '"Fira Sans Condensed", sans-serif' }}
      className="py-8 bg-gray-50 min-h-screen"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="View and manage your personalized profile. Explore account settings and preferences."
        />
        <title>Your Profile</title>
      </Helmet>

      <div className="container mx-auto px-4">
        {/* User Avatar and Name */}
        <div className="text-center">
          <img
            src={imgUser}
            className="w-32 h-32 rounded-full mx-auto border-4 border-emerald-400 shadow-lg"
            alt="userAvatar"
          />
          <h3 className="my-3 text-3xl font-semibold text-gray-800">
            {firstTwoWords}
          </h3>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-2xl mx-auto mt-6">
          {/* Account Details Section */}
          <h3 className="text-2xl font-normal mb-3 text-gray-700">
            Account Details
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-lg text-gray-500 cursor-not-allowed"
                  placeholder={userProfile.name}
                  disabled
                />
              </div>
            </div>

            {/* Email Address Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-lg text-gray-500 cursor-not-allowed"
                  placeholder={userProfile.email}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Manage Account Section */}
          <h3 className="text-2xl font-normal mb-3 mt-8 text-gray-700">
            Manage Account
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">
              Need to change your password? Click the button below.
            </p>
            <Link
              to="/forgetpassword"
              className="inline-block w-full sm:w-1/2 bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
