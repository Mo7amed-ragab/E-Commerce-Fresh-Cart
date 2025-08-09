import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);
  const [formStep, setFormStep] = useState("sendEmail");
  const navigate = useNavigate();

  // --- Formik for sending the email ---
  const sendCodeFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErr(null);
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          values
        );
        if (data.statusMsg === "success") {
          toast.success(data.message);
          setFormStep("verifyCode"); // Switch to the next form
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Email not found.";
        setErr(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  // --- Formik for verifying the reset code ---
  const verifyCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Verification code is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErr(null);
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          values
        );
        if (data.status === "Success") {
          toast.success("Code verified successfully!");
          navigate("/resetpassword"); // Navigate to the final reset password page
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Incorrect verification code.";
        setErr(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  const renderSpinner = () => (
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
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Recover access to your account. Reset your password securely and regain control."
        />
        <title>Forgotten Password</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md">
          {formStep === "sendEmail" ? (
            // --- Send Email Form ---
            <div>
              <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                Find Your Account
              </h1>
              <form
                onSubmit={sendCodeFormik.handleSubmit}
                className="bg-white p-8 shadow-lg rounded-lg"
              >
                <p className="text-center text-gray-600 mb-6">
                  Please enter your email address to search for your account.
                </p>
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
                    onBlur={sendCodeFormik.handleBlur}
                    onChange={sendCodeFormik.handleChange}
                    value={sendCodeFormik.values.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {sendCodeFormik.errors.email &&
                    sendCodeFormik.touched.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {sendCodeFormik.errors.email}
                      </p>
                    )}
                </div>
                {errMsg && (
                  <p className="text-red-500 text-center text-sm mt-4">
                    {errMsg}
                  </p>
                )}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={
                      !sendCodeFormik.isValid ||
                      !sendCodeFormik.dirty ||
                      isLoading
                    }
                    className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? renderSpinner() : null}
                    {isLoading ? "Searching..." : "Send Code"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // --- Verify Code Form ---
            <div>
              <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                Verify Code
              </h1>
              <form
                onSubmit={verifyCodeFormik.handleSubmit}
                className="bg-white p-8 shadow-lg rounded-lg"
              >
                <p className="text-center text-gray-600 mb-6">
                  A verification code has been sent to your email. Please enter
                  it below.
                </p>
                <div>
                  <label
                    htmlFor="resetCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="resetCode"
                    name="resetCode"
                    onBlur={verifyCodeFormik.handleBlur}
                    onChange={verifyCodeFormik.handleChange}
                    value={verifyCodeFormik.values.resetCode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {verifyCodeFormik.errors.resetCode &&
                    verifyCodeFormik.touched.resetCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {verifyCodeFormik.errors.resetCode}
                      </p>
                    )}
                </div>
                {errMsg && (
                  <p className="text-red-500 text-center text-sm mt-4">
                    {errMsg}
                  </p>
                )}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={
                      !verifyCodeFormik.isValid ||
                      !verifyCodeFormik.dirty ||
                      isLoading
                    }
                    className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? renderSpinner() : null}
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
