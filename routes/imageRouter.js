const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/images", upload.single("image"), imageController.createImage);
router.get("/images", imageController.getAllImages);

module.exports = router;
