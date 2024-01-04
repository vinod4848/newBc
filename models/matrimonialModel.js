const mongoose = require("mongoose");

const matrimonialSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  education: {
    degree: String,
    institution: String,
    completionYear: Number,
  },
  profession: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
  },
  nativePlace: {
    type: String,
  },
  family: {
    fatherName: String,
    motherName: String,
    siblings: {
      brothers: Number,
      sisters: Number,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  
  partnerPreferences: {
    ageRange: {
      min: Number,
      max: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    education: String,
    profession: String,
    minHeight: Number,
    maxIncome: Number,
  },
  height:{
    type: Number,
  },
  aboutMe: String,
  hobbies: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MatrimonialProfile = mongoose.model(
  "MatrimonialProfile",
  matrimonialSchema
);

module.exports = MatrimonialProfile;
