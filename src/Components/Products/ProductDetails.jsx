import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { id } = useParams();
  const { addCart, addToWishList, getWishList, deleteWishList } =
    useContext(cartContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Function to add a product to the cart
  async function handleAddCart(productId) {
    setIsAddingToCart(true);
    const success = await addCart(productId);
    if (success) {
      toast.success("Product added successfully to cart");
    } else {
      toast.error("Error adding product to cart");
    }
    setIsAddingToCart(false);
  }

  // Fetch product details
  function fetchProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery(
    ["ProductDetails", id],
    fetchProductDetails
  );

  // Fetch wishlist and check if the current product is in it
  const { refetch: refetchWishlist } = useQuery("wishlist", getWishList, {
    onSuccess: (data) => {
      const ids = new Set(data?.data?.data.map((item) => item._id));
      setIsWishlisted(ids.has(id));
    },
  });

  // Function to toggle wishlist status
  async function handleToggleWishlist(productId) {
    if (isWishlisted) {
      await deleteWishList(productId);
      toast.error("Product removed from wishlist");
    } else {
      await addToWishList(productId);
      toast.success("Product added to wishlist");
    }
    refetchWishlist();
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">No Product Details found.</h3>
      </div>
    );
  }

  const product = data.data.data;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={product.description} />
        <title>{product.title}</title>
      </Helmet>

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col md:flex-row gap-8">
            {/* Image Gallery - Width adjusted */}
            <div className="w-full md:w-1/4">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-auto object-cover rounded-lg"
              />
              {/* Optional: Add thumbnails for image gallery here */}
            </div>

            {/* Product Info - Width adjusted */}
            <div className="w-full md:w-2/3 flex flex-col">
              <span className="text-teal-500 font-semibold mb-2">
                {product.category.name}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                {product.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  Price : {product.price} EGP
                </p>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-auto">
                <button
                  onClick={() => handleAddCart(product._id)}
                  disabled={isAddingToCart}
                  className="flex-grow bg-teal-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <i className="fa-solid fa-cart-plus mr-2"></i>
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={() => handleToggleWishlist(product._id)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Add to wishlist"
                >
                  <i
                    className={`fa-heart text-2xl transition-colors ${
                      isWishlisted
                        ? "fa-solid text-red-500"
                        : "fa-regular text-gray-600 dark:text-gray-300"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
