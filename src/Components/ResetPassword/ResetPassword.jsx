import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);
  const navigate = useNavigate();

  // Yup validation schema remains the same
  const schemaValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,8}$/,
        "Password must start with an uppercase letter and be 7-9 characters long."
      ),
  });

  // API call function
  async function resetPassword(values) {
    setLoading(true);
    setErr(null); // Reset error on new submission
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      if (data.token) {
        toast.success("Password reset successfully!");
        // Assuming you want the user to log in again with the new password
        navigate("/login");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "An unexpected error occurred.");
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: schemaValidation,
    onSubmit: resetPassword,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Reset your password securely. Regain access to your profile and protect your account."
        />
        <title>Reset Password</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
            Reset Your Password
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-8 shadow-lg rounded-lg"
          >
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* New Password Input */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Global Error Message */}
            {errMsg && (
              <p className="text-red-500 text-center text-sm mt-4">{errMsg}</p>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || isLoading}
                className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
