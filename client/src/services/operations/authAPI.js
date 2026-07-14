import React from "react";
import { setLoading, setToken, setSignupData } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { toast } from "react-hot-toast";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// ------------------ SEND OTP ------------------
export function sendOtp(email) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP could not be sent");
      }

      toast.success("OTP Sent Successfully");
      // OTP sent, now frontend will show OTP input
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Could Not Send OTP"
      );
      console.error("SENDOTP API ERROR:", error);
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp, // OTP from user input
  onSuccess // callback after successful signup
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));

    try {
      // Call backend signup API
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed");
      }

      // Success
      toast.success("Signup Successful");
      dispatch(setSignupData(null)); // clear signupData from Redux

      // Call onSuccess callback (e.g., navigate to login)
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Signup Failed"
      );
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ✅ Save Signup Data (before OTP)
export const handleSignupData = (formData, navigate) => async (dispatch) => {
  dispatch(setSignupData(formData)); // store signup details in Redux
  await dispatch(sendOtp(formData.email)); // send OTP
  navigate("/verify-email"); // go to verify page
};


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      // Safely create user image
      const userImage = response.data?.user?.userImage
        ? response.data.user.userImage
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      // User object with image
      const userData = { ...response.data.user, image: userImage };

      dispatch(setUser(userData));

      // Correctly save token and user in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(userData)); // ✅ fixed

      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login Failed"
      );
      console.error("LOGIN API ERROR:", error);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ------------------ LOGOUT ------------------
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

// ------------------ PASSWORD RESET FLOW ------------------
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending reset email...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.error("RESET PASSWORD TOKEN ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send reset email"
      );
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting password...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);
      toast.error(error?.response?.data?.message || "Unable to Reset Password");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

