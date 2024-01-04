const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  maritalStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
    lowercase: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
