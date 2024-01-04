const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  Albumtitle: {
    type: String,
    required: true,
  },
  images: [],
  EventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
