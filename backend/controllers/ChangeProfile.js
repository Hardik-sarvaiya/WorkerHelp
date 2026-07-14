const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2; // Optional: if using Cloudinary

exports.changeProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let imagePath;

    // ✅ Optional: Upload to Cloudinary
    if (process.env.CLOUDINARY_URL) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "profile_pictures",
        resource_type: "image",
      });
      imagePath = uploadResult.secure_url;

      // Delete local temp file
      fs.unlinkSync(file.path);
    } else {
      // Local upload
      imagePath = `/uploads/${file.filename}`;
    }

    // ✅ Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("CHANGE_PROFILE_PIC ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
