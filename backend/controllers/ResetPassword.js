const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { updatedDetails } = require("../mail/templates/passwordUpdated")


// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {

    //get email from req body
    const email = req.body.email;

    //check user fot this email, email validation
    const user = await User.findOne({email: email});
    if(!user) {
      return res.json({
        success: false,
        message: "Your Email is not registered with us"
      });
    }

    //generate token
    const token = crypto.randomUUID();

    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate({email:email},
      {
        token: token,
        resetPasswordExpires: Date.now() + 5*60*1000,
      },
      {new:true});
    //create url
    const url = `http://localhost:3001/update-password/${token}`
    //send mail containing the url
    await mailSender(email,
      "Password Reset Link",
      `Password Reset Link: ${url}` );

    //return response
    return res.json({
      success:true,
      message:`Email sent successfully, please check email and change password`,
    });

  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'Something went wrong while sending reset password email'
    })
  }

}



exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const userDetails = await User.findOne({ token });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired, please regenerate",
      });
    }

    // Hash password safely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and remove token
    userDetails.password = hashedPassword;
    userDetails.token = undefined; // optional: clear token after use
    userDetails.resetPasswordExpires = undefined; // optional
    await userDetails.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


