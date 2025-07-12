import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SimpleSlider from "../Slider/HomeSlider";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Products() {
  const [allProducts, setAllProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setAllProducts(data.data);
    } catch (error) {
      toast.error("Failed to fetch products. Please try again later.");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {allProducts ? (
        <>
          <div className="h-1/4 w-full">
            <SimpleSlider />
          </div>
          <div className="container mx-auto p-4">
            <div className="h-1/4 w-full">
              <CategoriesSlider />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {allProducts.map((pro) => (
                <div
                  className="product border rounded-lg shadow-sm p-3 transition-transform transform hover:scale-105 hover:shadow-lg"
                  key={pro._id}
                >
                  <img
                    className="w-full rounded-md"
                    src={pro.imageCover}
                    alt={pro.title}
                  />
                  <p className="text-emerald-500 font-semibold mt-2 mb-1">
                    {pro.category.name}
                  </p>
                  <h3 className="font-bold text-gray-800 h-12 overflow-hidden">
                    {pro.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-900">
                      {pro.priceAfterDiscount ? (
                        <>
                          <span className="text-red-500 line-through text-sm me-2">
                            {pro.price}
                          </span>
                          {pro.priceAfterDiscount} EGP
                        </>
                      ) : (
                        `${pro.price} EGP`
                      )}
                    </span>
                    <span className="text-yellow-500 font-bold">
                      <i className="fa-solid fa-star me-1"></i>
                      {pro.ratingsAverage}
                    </span>
                  </div>
                  <button className="btn btn-success border-white bg-emerald-400 w-100 mt-3">
                    + Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-5">
          <h3 className="text-muted">No products found.</h3>
        </div>
      )}
    </>
  );
}
