const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true,
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // contactNumber: {
  //   type: String,
  //   required: true,
  // },
  accountType: {
    type: String,
    enum: ["worker"],
    default: "worker",
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, { timestamps: true });


// 🔥 USER DELETE → WORKER AUTO DELETE
userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const user = await this.model.findOne(this.getQuery());

    if (user && user.additionalDetails) {
      await mongoose.model("Worker").findByIdAndDelete(user.additionalDetails);
    }

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
