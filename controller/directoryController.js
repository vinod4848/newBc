const Directory = require("../models/directoryModel");

const directoryController = {
  getAllDirectories: async (req, res) => {
    try {
      const directories = await Directory.find().populate("userId").exec();
      res.status(200).json(directories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDirectoryById: async (req, res) => {
    try {
      const directory = await Directory.findById(req.params.id)
        .populate("userId")
        .exec();
      if (!directory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(200).json(directory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addDirectory: async (req, res) => {
    try {
      const newDirectory = new Directory(req.body);
      const savedDirectory = await newDirectory.save();
      res.status(201).json(savedDirectory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateDirectory: async (req, res) => {
    try {
      const updatedDirectory = await Directory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedDirectory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(200).json(updatedDirectory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteDirectory: async (req, res) => {
    try {
      const deletedDirectory = await Directory.findByIdAndDelete(req.params.id);
      if (!deletedDirectory) {
        return res.status(404).json({ message: "Directory not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = directoryController;
