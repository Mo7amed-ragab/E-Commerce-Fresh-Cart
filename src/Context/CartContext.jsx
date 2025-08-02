import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [allCart, setAllCart] = useState(null);
  const [totalCart, setTotalCart] = useState(0);
  const [numOfCart, setNumOfCart] = useState(0);
  const [CartId, setCartId] = useState(null);

  let headers = {
    token: localStorage.getItem("token"),
  };

  let Baseurl = "https://ecommerce.routemisr.com";

  async function addCart(productId) {
    return axios
      .post(
        `${Baseurl}/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => {
        fetchUserCart();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  function fetchUserCart() {
    axios
      .get(`${Baseurl}/api/v1/cart`, { headers })
      .then((res) => {
        setAllCart(res.data.data.products);
        setTotalCart(res.data.data.totalCartPrice);
        setNumOfCart(res.data.numOfCartItems);

        setCartId(res.data.data._id);
      })
      .catch((error) => {
        // If cart is empty or not found, reset state
        if (error.response && error.response.status === 404) {
          setAllCart([]);
          setTotalCart(0);
          setNumOfCart(0);
        }
        console.log("Error fetching cart:", error);
      });
  }

  function fetchUpdateCount(productId, newCount) {
    axios
      .put(
        `${Baseurl}/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => {
        setAllCart(res.data.data.products);
        setTotalCart(res.data.data.totalCartPrice);
        setNumOfCart(res.data.numOfCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteProduct(productId) {
    return axios
      .delete(`${Baseurl}/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        setAllCart(res.data.data.products);
        setTotalCart(res.data.data.totalCartPrice);
        setNumOfCart(res.data.numOfCartItems);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function clearUserCart() {
    return axios
      .delete(`${Baseurl}/api/v1/cart`, { headers })
      .then((res) => {
        // Reset cart state after successful clearing
        setAllCart([]);
        setTotalCart(0);
        setNumOfCart(0);
        return true;
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        return false;
      });
  }

  function ClearUI() {
    // Clear UI with new cart data
    setAllCart(null);
    setTotalCart(0);
    setNumOfCart(0);
    setCartId(null);
  }

  useEffect(() => {
    fetchUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addCart,
        allCart,
        totalCart,
        numOfCart,
        fetchUserCart,
        fetchUpdateCount,
        deleteProduct,
        clearUserCart,
        CartId,
        ClearUI,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
