
// src/services/operations/SettingsAPI.js
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api"; // make sure file name is 'api.js'
import { toast } from "react-hot-toast";
import { logout } from "./authAPI";
// import { DELETE_PROFILE_API } from "../apiRoutes";

// destructuring endpoints
const { 
  CHANGE_PROFILE_PIC_API,
  DELETE_ACCOUNT_API,
  UPDATE_PROFILE_API,
  UPDATE_PASSWORD_API,
} = settingsEndpoints;

// -------------------- Delete Profile --------------------

export const deleteProfile = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting your account...");

    try {
      // Check if token exists
      if (!token) {
        throw new Error("User not logged in or token missing");
      }

      // Call backend DELETE API
      const response = await apiConnector(
        "DELETE",
        "/workers/deleteprofile", // must match backend route
        null,
        { Authorization: `Bearer ${token}` }
      );

      // Check backend success response
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Account deletion failed");
      }

      toast.success("Account deleted successfully");

      // Logout user locally
      // dispatch(logout());

      // ✅ log user out and navigate
      dispatch(logout(navigate));

      // Redirect to signup or home page
      // navigate("/signup");
    } catch (error) {
      console.error("DELETE_ACCOUNT_API ERROR:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Could not delete account"
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
};






// -------------------- Change Profile Picture --------------------
export function changeProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile picture...");
    try {
      const response = await apiConnector(
        "PUT",
        CHANGE_PROFILE_PIC_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("CHANGE PROFILE PIC RESPONSE:", response?.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Profile pic update failed");
      }

      const updatedUser = response?.data?.data; // ✅ Correct field

      toast.success("Profile picture updated successfully");

      // ✅ Return updated user to frontend
      return updatedUser;
    } catch (error) {
      console.error("CHANGE_PROFILE_PIC_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Could not update picture");
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}






// -------------------- update Profile --------------------

// ✅ Update profile & refresh catalog
export function updateProfile(token, data, refreshCatalog) {
  return async () => {
    const toastId = toast.loading("Updating profile...");
    try {
      // 1️⃣ Update profile API call
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Profile update failed");
      }

      toast.success("Profile updated successfully");

      // 2️⃣ Refresh catalog if function provided
      if (typeof refreshCatalog === "function") {
        await refreshCatalog(); // call catalog fetch function
      }

      return response.data; // return updated profile
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Could not update profile");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// -------------------- Update Password --------------------
export function updatePassword(token, data) {
  return async () => {
    const toastId = toast.loading("Updating password...");
    try {
      const response = await apiConnector("POST", UPDATE_PASSWORD_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Password update failed");
      }

      toast.success("Password updated successfully");
      return response.data;
    } catch (error) {
      console.error("UPDATE_PASSWORD_API ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Could not update password"
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}
