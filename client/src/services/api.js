


// Using VITE
const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const categories = {
//   CATEGORIES_API: BASE_URL + "/skills/showAllCategories",
// };

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}





// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}


// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/shaowAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// CONTACT-US API 
export const contactusEndpoints = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}


// src/services/apis.js
export const settingsEndpoints = {

  DELETE_ACCOUNT_API: "/workers/deleteprofile",





  CHANGE_PROFILE_PIC_API: "/uploads/changeProfilePicture",



  UPDATE_PROFILE_API: "/workers/updateProfile",
  
  UPDATE_PASSWORD_API: "/auth/updatepassword",
};

