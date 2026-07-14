const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { otpTeplate } = require("../mail/templates/emailVerificationTeplate");
const { passwordUpdated }= require("../mail/templates/passwordUpdated")




exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // 2️⃣ Generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // 3️⃣ Ensure OTP is unique
    let existingOTP = await OTP.findOne({ otp });
    while (existingOTP) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp });
    }

    // 4️⃣ Save OTP in database
    await OTP.create({ email, otp });
    console.log("✅ OTP generated and saved for:", email);

    // 5️⃣ Send OTP email
    await mailSender(email, "Verify your Account - WorkerHelp", otp);

    // 6️⃣ Send success response (without OTP)
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email!",
    });
  } catch (error) {
    console.error("❌ SEND OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};

// -------------------- SIGN UP --------------------
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp, // OTP sent from frontend
    } = req.body;

    // validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields including OTP are required",
      });
    }

    // check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword do not match",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // validate OTP
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found, please request a new one",
      });
    }
    if (otp.toString() !== recentOtp[0].otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // delete used OTP
    await OTP.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Cannot register user",
    });
  }
};



//Login
exports.login = async (req, res) => {
  try {
    // get data from req body
    const {email, password} = req.body;
    //validation data
    if(!email || !password) {
      return res.status(403).json({
        success:false,
        message:'All fields are required, please try again',
      });
    }

    // user check exist ot not
    const user = await User.findOne({email}).populate("additionalDetails");
    if(!user) {
      return res.status(401).json({
        success:false,
        message:"User is not registred, please signup first",
      });
    }

    //generate JWT, after password matching
    if(await bcrypt.compare(password, user.password)) {

      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType || "Worker",
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"7d"
      });
      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success:true,
        token,
        user,
        message:'Logged in successfully',
      })
    }
    else {
      return res.status(401).json({
        success: false,
        message:`Password is incorrect`,
      });
    }
   
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Login Failure, please try again',
    });

  }
};



//ChangePassword
exports.changePassword = async (req, res) => {
  try {

    //get data from req body
     const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    // validation
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    //Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    //Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //update password in DB
    user.password = hashedPassword;
    await user.save();

    //sent mail - Password updated
    await mailSender(
      user.email,
      "Password Changed Successfully",
      `Hello ${user.firstName}, your password has been updated successfully.`
    );

    //return response
    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Change Password Failure, please try again',
    });
  }
}

