const mongoose = require("mongoose");

const directorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
},
  name: {
    type: String,
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
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  companyName: {
    type: String,
    required: true,
  },
  establishedDate: {
    type: Date,
  },
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
  },
  tags: {
    type: [String],
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.isPublic;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
