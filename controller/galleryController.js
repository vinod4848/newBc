const Gallery = require("../models/galleryModel");

const galleryController = {
  getAllGalleries: async (req, res) => {
    try {
      const galleries = await Gallery.find().populate("EventId");
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchGalleryByTitle: async (req, res) => {
    try {
      const { albumtitle } = req.query;

      if (!albumtitle) {
        return res
          .status(400)
          .json({ message: "Please provide a albumtitle parameter" });
      }

      const events = await Gallery.find({
        albumtitle: new RegExp(albumtitle, "i"),
      });

      if (events.length === 0) {
        return res
          .status(404)
          .json({ message: "No events found with the provided albumtitle" });
      }

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getGalleryById: async (req, res) => {
    try {
      const gallery = await Gallery.findById(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(200).json(gallery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addGallery: async (req, res) => {
    try {
      const newGallery = new Gallery(req.body);
      const savedGallery = await newGallery.save();
      res.status(201).json(savedGallery);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateGallery: async (req, res) => {
    try {
      const updatedGallery = await Gallery.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedGallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(200).json(updatedGallery);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteGallery: async (req, res) => {
    try {
      const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
      if (!deletedGallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = galleryController;
