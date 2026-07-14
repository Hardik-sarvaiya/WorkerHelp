

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get loading state from redux (optional)
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-y-4">
      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
          Email Address <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-gray-800 p-[12px] text-gray-50"
        />
      </label>

      {/* Password */}
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-50">
          Password <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
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
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-300">
            Forgot Password
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading} // disable during loading
        className={`mt-6 w-full rounded-[8px] py-[8px] px-[12px] font-medium text-gray-900 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-sky-300 hover:bg-sky-400 transition-colors duration-300"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
