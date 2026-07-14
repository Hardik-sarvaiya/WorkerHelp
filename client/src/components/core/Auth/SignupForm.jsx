

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, sendOtp } from "../../../services/operations/authAPI";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice"; // ✅ import Redux action

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const { accountType, firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!accountType) {
      toast.error("Please select account type");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      if (!otpSent) {
        // ✅ Send OTP first
        await dispatch(sendOtp(email));
        toast.success("OTP sent to your email");

        // ✅ Save form data in Redux for verify-email page
        dispatch(
          setSignupData({
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          })
        );

        // ✅ Navigate to verify-email page
        navigate("/verify-email");
      } else {
        // This part won’t run here anymore — verification happens on /verify-email page
        await dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp));
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-y-4">
      {/* Account Type */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
          Account Type <sup className="text-pink-400">*</sup>
        </p>
        <select
          required
          name="accountType"
          value={accountType}
          onChange={handleOnChange}
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
        >
          <option value="" disabled>Select account type</option>
          <option value="worker">Worker</option>
          {/* <option value="customer">Customer</option> */}
        </select>
      </label>

      <div className="flex flex-row gap-10">
        {/* First Name */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
            First Name <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="Enter first name"
            className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
          />
        </label>

        {/* Last Name */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
            Last Name <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Enter last name"
            className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
          />
        </label>
      </div>

      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
          Email Address <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
          disabled={otpSent}
        />
      </label>

      <div className="flex flex-row gap-10">
        {/* Password */}
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
            Create Password <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter password"
            className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-10 cursor-pointer"
          >
            {showPassword ? (
              <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <IoEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>

        {/* Confirm Password */}
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
            Confirm Password <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm password"
            className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-10 cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <IoEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full rounded-[8px] py-[8px] px-[12px] font-medium text-gray-900 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-sky-300 hover:bg-sky-400 transition-colors duration-300"
        }`}
      >
        {loading ? "Sending OTP..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignupForm;
