import React from "react";
import notFound from "../../assets/images/error.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Oops! The page you are looking for doesn't exist. Explore other sections or return to our homepage."
        />
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <div className="w-full max-w-md">
          <img
            src={notFound}
            alt="Page not found illustration"
            className="w-full h-auto"
          />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mt-8 mb-2">
          Page Not Found!
        </h3>
        <p className="text-lg text-gray-500 mb-6">
          The page you were looking for could not be found.
        </p>
        <div className="mt-2">
          <Link
            to="/"
            className="inline-block bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Go To Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
