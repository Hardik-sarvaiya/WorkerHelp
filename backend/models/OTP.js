const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTeplate"); // ✅ corrected import

// ✅ OTP Schema
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, // Should be Date, not String
    default: Date.now,
    expires: 10 * 60, // 10 minutes (600 seconds)
  },
});

// ✅ Function to send verification email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from WorkerHelp",
      otp
    );
    console.log("✅ Email sent successfully:", mailResponse.messageId);
  } catch (error) {
    console.error("❌ Error occurred while sending verification email:", error);
    throw error;
  }
}

// ✅ Pre-save hook — runs before saving new OTP
OTPSchema.pre("save", async function (next) {
  // Send OTP email only when document is new (not on update)
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
