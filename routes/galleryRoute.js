const express = require("express");
const router = express.Router();
const galleryController = require("../controller/galleryController");

// Routes

router.get('/galleries/search', galleryController.searchGalleryByTitle);
router.get("/galleries", galleryController.getAllGalleries);
router.get("/galleries/:id", galleryController.getGalleryById);
router.post("/galleries", galleryController.addGallery);
router.put("/galleries/:id", galleryController.updateGallery);
router.delete("/galleries/:id", galleryController.deleteGallery);

module.exports = router;
