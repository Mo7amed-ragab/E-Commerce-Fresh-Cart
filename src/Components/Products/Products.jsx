import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import SimpleSlider from "../Slider/HomeSlider";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const { addCart, addToWishList, getWishList, deleteWishList } =
    useContext(cartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  // Function to add a product to the cart
  async function handleAddCart(id) {
    const response = await addCart(id);
    if (response) {
      toast.success("Product added successfully to cart");
    } else {
      toast.error("Error adding product to cart");
    }
  }

  // Function to fetch products for a specific page
  function fetchProducts(page) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
  }

  // Query for fetching products, with `isFetching` for pagination loading
  const { data, isError, isLoading, isFetching } = useQuery(
    ["products", currentPage],
    () => fetchProducts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  // Query for fetching the wishlist
  const { data: wishlistData, refetch: refetchWishlist } = useQuery(
    "wishlist",
    getWishList,
    {
      onSuccess: (data) => {
        const ids = new Set(data?.data?.data.map((item) => item._id));
        setWishlistIds(ids);
      },
    }
  );

  // Function to toggle a product's wishlist status
  async function handleToggleWishlist(productId) {
    if (wishlistIds.has(productId)) {
      await deleteWishList(productId);
      toast.error("Product removed from wishlist");
    } else {
      await addToWishList(productId);
      toast.success("Product added to wishlist");
    }
    // Refetch the wishlist to update the UI
    refetchWishlist();
  }

  // Extract total pages from the API response metadata
  const totalPages = data?.data.metadata.numberOfPages;

  // Handles the initial page load
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">No Products found.</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Explore our curated collection of high-quality products. Shop now for the best deals!"
        />
        <title>Products</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="mt-4 rounded-xl overflow-hidden">
          <SimpleSlider />
        </div>

        <div className="my-8">
          <CategoriesSlider />
        </div>

        {/* === PRODUCT GRID WRAPPER FOR PAGINATION LOADING === */}
        <div className="relative">
          {/* --- Loading overlay for pagination --- */}
          {isFetching && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-30 rounded-lg">
              <LoadingSpinner />
            </div>
          )}

          {/* === PRODUCT GRID WITH NEW LAYOUT === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-4">
            {data?.data.data.map((pro) => (
              <div
                className="product-card bg-white rounded-lg border border-gray-200 flex flex-col justify-between p-3 transition-shadow hover:shadow-lg"
                key={pro._id}
              >
                <div>
                  <Link to={`/productDetails/${pro._id}`}>
                    <img
                      src={pro.imageCover}
                      alt={pro.title}
                      className="w-full h-40 object-contain mb-2"
                    />
                    <span className="text-emerald-600 font-medium text-xs">
                      {pro.category.name}
                    </span>
                    <h3
                      className="text-gray-800 font-semibold text-sm h-10 my-1"
                      title={pro.title}
                    >
                      {pro.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-900 font-bold text-base">
                      {pro.price} EGP
                    </span>
                    <span className="text-yellow-500 font-bold text-sm flex items-center">
                      <i className="fa-solid fa-star text-xs mr-1"></i>
                      {pro.ratingsAverage}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleAddCart(pro._id)}
                    className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold py-2 px-3 rounded-md transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleToggleWishlist(pro._id)}
                    className="p-1 px-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    aria-label="Add to wishlist"
                  >
                    <i
                      className={`fa-heart transition-colors ${
                        wishlistIds.has(pro._id)
                          ? "fa-solid text-red-500"
                          : "fa-regular text-gray-600"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Pagination Component --- */}
        <nav aria-label="Page navigation" className="flex justify-center my-8">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      </div>
    </>
  );
}
