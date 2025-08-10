import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";

export default function AllOrders() {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch user orders for a specific page
  function fetchUserOrders(page = 1) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Return a resolved promise with empty data if no user ID is found
      return Promise.resolve({
        data: { data: [], metadata: { numberOfPages: 0 } },
      });
    }
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}?page=${page}`
    );
  }

  // Query for fetching orders, with `isFetching` for pagination loading
  const { data, isError, isLoading, isFetching } = useQuery(
    ["orders", currentPage],
    () => fetchUserOrders(currentPage),
    {
      keepPreviousData: true,
      onError: (err) => {
        toast.error("Failed to fetch user orders.");
        console.error("Error fetching orders:", err);
      },
    }
  );

  const allOrders = data?.data || [];
  const totalPages = data?.data.metadata?.numberOfPages || 1;

  // Loading spinner component for the initial load
  const renderLoader = () => (
    <div className="min-h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );

  // Component for displaying when no orders are found
  const renderEmptyOrders = () => (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        You have no orders yet.
      </h2>
      <p className="text-gray-500 mt-2">
        When you place an order, it will appear here.
      </p>
    </div>
  );

  if (isLoading) {
    return renderLoader();
  }

  if (isError) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">Could not fetch orders.</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="An order overview page consolidates all order information. It displays details from order capture to fulfillment, payment, shipping, delivery, and service."
        />
        <title>Your Orders</title>
      </Helmet>

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Your Orders
          </h1>

          <div className="relative">
            {/* Loading overlay for pagination */}
            {isFetching && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-30 rounded-lg">
                <LoadingSpinner />
              </div>
            )}

            {allOrders.length > 0 ? (
              <div className="space-y-8">
                {allOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                          Order ID: #{order.id}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Placed on:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-teal-600 dark:text-teal-400">
                          Total: {order.totalOrderPrice} EGP
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            order.isPaid ? "text-green-500" : "text-yellow-500"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending Payment"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                        Items
                      </h3>
                      <div className="space-y-4">
                        {order.cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Quantity: {item.count}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                              {item.price} EGP
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                        Shipping Details
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        To:{" "}
                        <span className="font-medium text-teal-600 dark:text-teal-400">
                          {order.shippingAddress.city}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Phone:{" "}
                        <span className="font-medium text-teal-600 dark:text-teal-400">
                          {order.shippingAddress.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderEmptyOrders()
            )}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <nav
              aria-label="Page navigation"
              className="flex justify-center my-8"
            >
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1 || isFetching}
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1}>
                    <button
                      onClick={() => setCurrentPage(i + 1)}
                      disabled={isFetching}
                      className={`px-3 py-2 leading-tight border border-gray-300 ${
                        currentPage === i + 1
                          ? "text-white bg-emerald-500 border-emerald-500 cursor-default"
                          : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
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
                    disabled={currentPage === totalPages || isFetching}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
