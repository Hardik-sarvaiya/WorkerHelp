
const express = require("express");
const router = express.Router();

const { auth, authorize } = require("../middlewares/auth");

const {
  addWorker,
  getAllWorkers,
  getWorkerById,
  updateProfile,
  deleteAccount,
  getAllUserDetails
} = require("../controllers/Worker");

// Public route - Add worker
router.post("/", auth, authorize(["Worker"]), addWorker);

// Public routes
router.get("/all", getAllWorkers);
router.get("/:id", getWorkerById);

// Worker protected routes
router.put("/updateProfile", auth, authorize(["worker"]), updateProfile);
router.delete("/deleteprofile", auth, authorize(["worker"]), deleteAccount);
// router.get("/me", auth, authorize(["Worker", "Customer"]), getAllUserDetails);

module.exports = router;
