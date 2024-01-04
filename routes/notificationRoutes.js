const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController");

router.post("/add", async (req, res) => {
  try {
    const { type, userId, itemId } = req.body;
    await notificationController.createNotification(type, userId, itemId);
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.get("/count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const unreadNotificationCount =
      await notificationController.getNotificationCount(userId);
    res.json({ unreadNotificationCount });
  } catch (error) {
    console.error("Error getting notification count:", error);
    res.status(500).json({ error: "Failed to get notification count" });
  }
});

router.put("/ReadNotification/:notificationId", async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const result = await notificationController.markNotificationAsRead(
      notificationId
    );
    res.json(result);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

module.exports = router;
