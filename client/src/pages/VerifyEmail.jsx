import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  // Redirect to signup if no data in Redux
  useEffect(() => {
    if (!signupData) {
      toast.error("Please fill out the signup form first");
      navigate("/signup");
    }
  }, [signupData, navigate]);

  // ✅ Make the function async
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    try {
      await dispatch(
        signUp(
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
          () => {
            toast.success("Account verified successfully! Please login.");
            navigate("/login"); // ✅ Redirect after success
          }
        )
      );
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen px-4">
      {loading ? (
        <p className="text-lg font-semibold">Loading...</p>
      ) : (
        <div className="w-full max-w-md rounded-xl bg-gray-800 p-9 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-2">Verify Email</h1>
          <p className="text-center text-gray-400 mb-6">
            A verification code has been sent to your email. <br />
            Enter the 6-digit code below to verify your account.
          </p>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center gap-6"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={
                <span className="text-sky-400 font-bold mx-1">-</span>
              }
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-10 h-10 md:w-12 md:h-12 text-center text-lg font-semibold rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-sky-400"
                />
              )}
              containerStyle="justify-center"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg py-2 font-semibold text-gray-900 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-sky-300 hover:bg-sky-400 transition-colors duration-300"
              }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 flex justify-between items-center">
            <Link
              to="/login"
              className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
            >
              <MdOutlineKeyboardBackspace />
              <span>Back to Login</span>
            </Link>

            <button
              onClick={() => {
                if (signupData?.email) {
                  dispatch(sendOtp(signupData.email));
                  toast.success("OTP resent to your email");
                } else {
                  toast.error("Email not found. Please sign up again.");
                  navigate("/signup");
                }
              }}
              className="text-sm text-sky-400 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;



