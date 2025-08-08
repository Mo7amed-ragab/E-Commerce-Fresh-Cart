import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import UnifiedCard from "../CustomComponents/UnifiedCard";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);

  // Modified function to fetch brands for a specific page
  function getAllBrands(page) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands?page=${page}`
    );
  }

  // Updated useQuery to refetch data when currentPage changes
  const { data, isLoading, isError, isPreviousData } = useQuery(
    ["AllBrands", currentPage],
    () => getAllBrands(currentPage),
    {
      keepPreviousData: true, // Shows old data while new data is being fetched
    }
  );

  // Extract total pages from the API response metadata
  const totalPages = data?.data.metadata.numberOfPages;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">No Brands found.</h3>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Explore all the brands we have to offer. Find your favorite brands and discover new ones."
        />
        <title>Brands</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-emerald-600">
          Our Brands
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.data.data.map((brand) => (
            <UnifiedCard
              key={brand._id}
              image={brand.image}
              title={brand.name}
              className="mx-auto border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          ))}
        </div>

        {/* Pagination Component */}
        <nav aria-label="Page navigation" className="flex justify-center my-10">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
            </li>
            {totalPages &&
              Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 leading-tight border border-gray-300 ${
                      currentPage === i + 1
                        ? "text-white bg-emerald-500 border-emerald-500"
                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || isPreviousData}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
