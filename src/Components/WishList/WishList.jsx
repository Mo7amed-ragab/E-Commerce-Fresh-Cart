import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function WishList() {
  const { getWishList, deleteWishList, addCart } = useContext(cartContext);
  const queryClient = useQueryClient();

  const {
    data: wishlistQueryData,
    isLoading,
    isError,
  } = useQuery("wishlist", getWishList);
  const wishlistItems = wishlistQueryData?.data?.data;

  // Mutation for removing an item from the wishlist
  const { mutate: handleRemoveFromWishlist, isLoading: isRemoving } =
    useMutation(deleteWishList, {
      onSuccess: (response) => {
        if (response?.data?.status === "success") {
          toast.success("Product removed from wishlist.");

          queryClient.invalidateQueries("wishlist");
        } else {
          toast.error("Failed to remove product.");
        }
      },
      onError: () => {
        toast.error("An error occurred while removing the product.");
      },
    });

  // Mutation for adding an item to the cart from the wishlist
  const { mutate: handleAddToCart, isLoading: isAddingToCart } = useMutation(
    addCart,
    {
      onSuccess: (response, productId) => {
        if (response) {
          toast.success("Product added to cart successfully");
          queryClient.invalidateQueries("cart");
          handleRemoveFromWishlist(productId);
        } else {
          toast.error("Error adding product to cart.");
        }
      },
      onError: () => {
        toast.error("Error adding product to cart.");
      },
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !wishlistItems) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">
          Could not load your wishlist. Please try again later.
        </h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="View and manage your wishlist. Keep track of products you love and move them to your cart when you're ready."
        />
        <title>My Wishlist</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            My Wishlist
          </h1>

          {wishlistItems.length > 0 && (
            <p className="text-center text-gray-600 mb-8">
              You have {wishlistItems.length} item(s) in your wishlist.
            </p>
          )}

          {wishlistItems.length > 0 ? (
            <div className="relative overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-16 text-center">
                      No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b hover:bg-gray-50 align-middle"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/productDetails/${item._id}`}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={item.imageCover}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <span className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                            {item.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                        {item.price} EGP
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => handleAddToCart(item._id)}
                            disabled={isAddingToCart || isRemoving}
                            className="font-medium text-white bg-emerald-500 hover:bg-emerald-600 py-2 px-4 rounded-lg transition-colors disabled:bg-emerald-300 disabled:cursor-not-allowed"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            disabled={isRemoving || isAddingToCart}
                            className="font-medium text-red-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <i className="fa-solid fa-heart-crack text-5xl text-gray-400 mb-4"></i>
              <h2 className="text-2xl font-semibold text-gray-700">
                Your wishlist is empty.
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything yet. Start exploring!
              </p>
              <Link
                to="/products"
                className="mt-6 inline-block bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
