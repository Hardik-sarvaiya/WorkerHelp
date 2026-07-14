const express = require("express");
const router = express.Router();
const { changeProfilePicture } = require("../controllers/ChangeProfile");
const { auth } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.put(
  "/changeProfilePicture",
  auth,
  upload.single("displayPicture"),
  changeProfilePicture
);

module.exports = router;
