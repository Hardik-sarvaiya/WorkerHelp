
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4">
      {loading ? (
        <div className="text-xl font-semibold">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>

          <p className="text-gray-300 text-sm mb-6 text-center">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
            {!emailSent && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-400"
                >
                  Email Address <span className="text-pink-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg bg-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-sky-400 py-2 text-black font-semibold hover:bg-sky-300 transition"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-400 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;