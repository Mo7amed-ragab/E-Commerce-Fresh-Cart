import React, { useContext, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  let user = {
    email: "",
    password: "",
  };

  async function loginUser(values) {
    setIsClicked(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (x) {
        toast.success("Welcome Back");

        setToken(x.data.token);
        localStorage.setItem("token", x.data.token);
        setIsClicked(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(function (x) {
        toast.error(
          x.response?.data?.message || "An unexpected error occurred."
        );
        setIsClicked(false);
      });
  }

  const LoginFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
      email: yup.string().required().email("Invalid Email"),
      password: yup.string().required().min(6).max(12),
    }),
  });

  return (
    <>
      <div className="p-5">
        <h2 className="text-center p-3">Login Now :</h2>

        <form
          onSubmit={LoginFormik.handleSubmit}
          className="max-w-md mx-auto border-blue-500 border-2 rounded-lg p-5"
        >
          {/* Email Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email :
            </label>
            <input
              value={LoginFormik.values.email}
              onBlur={LoginFormik.handleBlur}
              onChange={LoginFormik.handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {LoginFormik.errors.email && LoginFormik.touched.email ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password :
            </label>
            <input
              value={LoginFormik.values.password}
              onBlur={LoginFormik.handleBlur}
              onChange={LoginFormik.handleChange}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {LoginFormik.errors.password && LoginFormik.touched.password ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!isClicked ? (
              "Login"
            ) : (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
