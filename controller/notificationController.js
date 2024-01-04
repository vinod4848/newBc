const Notification = require("../models/notificationModel");

const notificationController = {
  createNotification: async (type, userId, itemId) => {
    try {
      const notification = new Notification({ type, userId, itemId });
      await notification.save();
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error.message);
      throw new Error("Failed to create notification");
    }
  },

  getNotificationCount: async (userId) => {
    try {
      const unreadNotificationCount = await Notification.countDocuments({
        userId,
        isRead: false,
      })
        .populate("userId")
        .exec();
      return unreadNotificationCount;
    } catch (error) {
      console.error("Error getting notification count:", error.message);
      throw new Error("Failed to get notification count");
    }
  },

  markNotificationAsRead: async (notificationId) => {
    try {
      const notification = await Notification.findById(notificationId).populate(
        {
          path: "userId",
          select: "username",
        }
      );

      if (!notification) {
        throw new Error("Notification not found");
      }

      notification.isRead = true;
      await notification.save();

      const populatedNotification = await Notification.findById(notificationId)
        .populate({
          path: "userId",
          select: "username",
        })
        .exec();

      return {
        message: "Notification marked as read",
        notification: populatedNotification,
      };
    } catch (error) {
      console.error("Error marking notification as read:", error);
      console.error("Notification ID:", notificationId);
      console.error("Stack Trace:", error.stack);

      throw new Error("Failed to mark notification as read");
    }
  },
};

module.exports = notificationController;
