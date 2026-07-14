

// controllers/Worker.js
const Worker = require("../models/Worker");
const User = require("../models/User");

// ------------------------
// 1. Add Worker
// ------------------------
exports.addWorker = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills = [], city, location = "", experienceYears } = req.body;

    if (!skills.length || !city || experienceYears === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields (skills, city, experienceYears) are required",
      });
    }

    const existingWorker = await Worker.findOne({ user: userId });
    if (existingWorker) {
      return res.status(400).json({
        success: false,
        message: "Worker profile already exists for this user",
      });
    }

    const worker = await Worker.create({
      user: userId,
      skills,
      city,
      location,
      experienceYears,
    });

    await User.findByIdAndUpdate(userId, { additionalDetails: worker._id });

    return res.status(201).json({
      success: true,
      message: "Worker profile created successfully",
      data: worker,
    });
  } catch (error) {
    console.error("Error adding worker:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding worker",
      error: error.message,
    });
  }
};

// ------------------------
// 2. Update Profile
// ------------------------

exports.updateProfile = async (req, res) => {
  try {
    // 🔹 Get user ID from token
    const userId = req.user.id;

    // 🔹 Extract profile fields from request body
    let { skills, city, location, experienceYears, contactNumber, about } = req.body;

    // 🔹 Convert experienceYears to number if not empty
    experienceYears = experienceYears !== undefined && experienceYears !== "" ? Number(experienceYears) : undefined;

    // 🔹 Convert contactNumber to string if not empty
    contactNumber = contactNumber !== undefined && contactNumber !== "" ? String(contactNumber) : undefined;

    // 🔹 Check if Worker already exists
    let existingWorker = await Worker.findOne({ user: userId });

    let updatedWorker;

    if (existingWorker) {
      // 🔹 Update existing worker with new values or fallback to existing
      updatedWorker = await Worker.findOneAndUpdate(
        { user: userId },
        {
          skills: skills || existingWorker.skills,
          city: city || existingWorker.city,
          location: location || existingWorker.location,
          experienceYears: experienceYears !== undefined ? experienceYears : existingWorker.experienceYears,
          contactNumber: contactNumber !== undefined ? contactNumber : existingWorker.contactNumber,
          about: about || existingWorker.about,
        },
        { new: true, runValidators: true }
      );
    } else {
      // 🔹 Create new worker if none exists
      updatedWorker = await Worker.create({
        user: userId,
        skills: skills || "",
        city: city || "",
        location: location || "",
        experienceYears: experienceYears || 0,
        contactNumber: contactNumber || "",
        about: about || "",
      });
    }

    // 🔹 Return success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedWorker,
    });
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


// ------------------------
// 3. Delete Account
// ------------------------
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userDetails.additionalDetails) {
      await Worker.findByIdAndDelete(userDetails.additionalDetails);
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete user account",
      error: error.message,
    });
  }
};






// ------------------------
// 4. Get All Workers
// ------------------------
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find()
      .populate("user", "firstName lastName email image contactNumber about")
      .where("user")
      .ne(null) // 🔥 IMPORTANT FIX
      .exec();
    return res.status(200).json({
      success: true,
      users: workers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// ------------------------
// 5. Get Worker by ID
// ------------------------
exports.getWorkerById = async (req, res) => {
  try {
    const workerId = req.params.id;
    if (!workerId) {
      return res
        .status(400)
        .json({ success: false, message: "Worker ID is required" });
    }

    const worker = await Worker.findById(workerId).populate("user");
    if (!worker) {
      return res
        .status(404)
        .json({ success: false, message: "Worker not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Worker fetched successfully",
      data: worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching worker",
      error: error.message,
    });
  }
};
