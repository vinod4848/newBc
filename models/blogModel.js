const mongoose = require("mongoose");
const blogsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.isPublic;
      },
    },
  },

  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: false,
    },
  }
);

const Blog = mongoose.model("Blog", blogsSchema);

module.exports = Blog;
