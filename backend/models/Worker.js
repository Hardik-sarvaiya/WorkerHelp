const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
    required: true,
    trim: true,
    default: [],
  },
  city: { 
    type: String, 
    required: true, 
  },
  location: {
    type: String,
    default: "",
  },
  experienceYears: {
    type: Number, 
    required: true, 
  }, 
  contactNumber: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    trim: true,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Worker", workerSchema);
