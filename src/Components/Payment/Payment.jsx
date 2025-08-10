import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import toast for notifications

export default function Payment() {
  const { CartId } = useContext(cartContext);
  const [Online, setOnline] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  let headers = {
    token: localStorage.getItem("token"),
  };

  let Baseurl = "https://ecommerce.routemisr.com";

  function detectAndCall(values) {
    if (Online) {
      paymentOrder(values);
    } else {
      cacheOrder(values);
    }
  }

  function cacheOrder(values) {
    const shippingAddressBody = {
      shippingAddress: values,
    };
    axios
      .post(`${Baseurl}/api/v1/orders/${CartId}`, shippingAddressBody, {
        headers,
      })
      .then((res) => {
        // On success, show a notification and redirect
        toast.success("Order placed successfully!");
        navigate("/allorders"); // Redirect to the all orders page
      })
      .catch((error) => {
        toast.error("Failed to place order. Please try again.");
        console.error("Cache order error:", error);
      });
  }

  function paymentOrder(values) {
    const shippingAddressBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `${Baseurl}/api/v1/orders/checkout-session/${CartId}`,
        shippingAddressBody,
        { headers },
        {
          params: {
            url: "http://localhost:3000",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      })
      .catch((error) => {
        toast.error("Failed to initiate online payment.");
        console.error("Payment error:", error);
      });
  }

  const PaymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectAndCall,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Complete your purchase by providing payment and shipping details."
        />
        <title>Payment</title>
      </Helmet>
      <div className="container mx-auto p-5">
        <form
          onSubmit={PaymentFormik.handleSubmit}
          className="max-w-md mx-auto border-blue-500 border-2 rounded-lg p-5"
        >
          {/* Details Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Details :
            </label>
            <input
              value={PaymentFormik.values.details}
              onBlur={PaymentFormik.handleBlur}
              onChange={PaymentFormik.handleChange}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Your Details"
            />
            {PaymentFormik.errors.details && PaymentFormik.touched.details ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {PaymentFormik.errors.details}
              </div>
            ) : null}
          </div>

          {/* Phone Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone :
            </label>
            <input
              value={PaymentFormik.values.phone}
              onBlur={PaymentFormik.handleBlur}
              onChange={PaymentFormik.handleChange}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone"
            />
            {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {PaymentFormik.errors.phone}
              </div>
            ) : null}
          </div>

          {/* City Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City :
            </label>
            <input
              value={PaymentFormik.values.city}
              onBlur={PaymentFormik.handleBlur}
              onChange={PaymentFormik.handleChange}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your city"
            />
            {PaymentFormik.errors.city && PaymentFormik.touched.city ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {PaymentFormik.errors.city}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setOnline(false)}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cache Order
            </button>
            <button
              onClick={() => setOnline(true)}
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Online Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
