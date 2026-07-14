import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { HiMiniEye } from "react-icons/hi2";
import { AiFillEyeInvisible } from "react-icons/ai";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className='text-white'>
      {loading ? (
        <div>Loading.......</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and you’re all set.</p>

          <form onSubmit={handleOnSubmit}>
            {/* New Password */}
            <label>
              <p>New Password<sup>*</sup></p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
                className='w-full p-6 bg-gray-600 text-gray-50'
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <HiMiniEye fontSize={24} />
                )}
              </span>
            </label>

            {/* Confirm Password */}
            <label>
              <p>Confirm New Password<sup>*</sup></p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className='w-full p-6 bg-gray-600 text-gray-50'
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <HiMiniEye fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-400 hover:underline"
            >
              <p> Back to Login </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;