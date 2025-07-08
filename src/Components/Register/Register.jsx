import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

export default function Register() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerUser(values) {
    setIsClicked(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

      .then(function () {
        toast.success("Congratulations! Your account has been created.");
        setIsClicked(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })

      .catch(function (x) {
        toast.error(
          x.response?.data?.message || "Registration failed. Please try again."
        );
        setIsClicked(false);
      });
  }

  const RegisterFormik = useFormik({
    initialValues: user,

    onSubmit: registerUser,

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Minimum must be 3 characters")
        .max(12, "Maximum must be 12 characters"),

      email: yup.string().required("Email is required").email("Invalid Email"),

      password: yup.string().required("Password is required").min(6).max(12),

      rePassword: yup
        .string()
        .required("Please re-enter your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^(20)?01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    }),
  });

  // ------ Another way to validate ---------
  // validate: function (values) {
  //   const errors = {};
  //   const nameRegex = /^[A-Z][a-z]{4,8}$/;
  //   const phoneRegex = /^(20)?01[0125][0-9]{8}$/;

  //   if (!nameRegex.test(values.name)) {
  //     errors.name = "Name must start with Capital";
  //   }
  //   if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "Phone must be Egyptain number";
  //   }
  //   if (values.email.includes('@') == false || values.email.includes('.') == false) {
  //     errors.email = "invalid email";
  //   }
  //   if (values.password.length < 6 || values.password.length > 12) {
  //     errors.password = "password must be from 6 to 12 character";
  //   }
  //   if (values.password !== values.rePassword) {
  //     errors.rePassword = "password and rePassword Doesn't match";
  //   }
  //   return errors;
  // }

  return (
    <>
      <div className="p-5">
        <h2 className="text-center p-3">Register Now :</h2>

        <form
          onSubmit={RegisterFormik.handleSubmit}
          className="max-w-md mx-auto border-blue-500 border-2 rounded-lg p-5"
        >
          <div className="w-full mb-5 group">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name :
            </label>
            <input
              value={RegisterFormik.values.name}
              onBlur={RegisterFormik.handleBlur}
              onChange={RegisterFormik.handleChange}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            {RegisterFormik.errors.name && RegisterFormik.touched.name ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {RegisterFormik.errors.name}
              </div>
            ) : null}
          </div>

          {/* Email Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email :
            </label>
            <input
              value={RegisterFormik.values.email}
              onBlur={RegisterFormik.handleBlur}
              onChange={RegisterFormik.handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {RegisterFormik.errors.email && RegisterFormik.touched.email ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {RegisterFormik.errors.email}
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
              value={RegisterFormik.values.password}
              onBlur={RegisterFormik.handleBlur}
              onChange={RegisterFormik.handleChange}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {RegisterFormik.errors.password &&
            RegisterFormik.touched.password ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {RegisterFormik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Re-enter Password Field */}
          <div className="w-full mb-5 group">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Re-enter Password :
            </label>
            <input
              value={RegisterFormik.values.rePassword}
              onBlur={RegisterFormik.handleBlur}
              onChange={RegisterFormik.handleChange}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
            />
            {RegisterFormik.errors.rePassword &&
            RegisterFormik.touched.rePassword ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {RegisterFormik.errors.rePassword}
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
              value={RegisterFormik.values.phone}
              onBlur={RegisterFormik.handleBlur}
              onChange={RegisterFormik.handleChange}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
            {RegisterFormik.errors.phone && RegisterFormik.touched.phone ? (
              <div
                className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {RegisterFormik.errors.phone}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!isClicked ? (
              "Register"
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
