const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

// Controllers
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");


//Routes for user login
router.post("/login", login);

//Router for user signup
router.post("/signUp", signUp);

//Route for sending OTP to the user's email
router.post("/sendOTP", sendOTP);

//Route for changing the password
router.post("/changepassword", auth, changePassword);

//Route for ResetPassword Token
router.post("/reset-password-token", resetPasswordToken);

//Route for ResetPassword
router.post("/updatepassword", resetPassword);

//Route for 

module.exports = router;