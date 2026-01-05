const express = require("express");
const router = express.Router();
const adminUserController = require("../../controllers/admin/adminUserController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

router.use(authMiddleware, adminMiddleware);

router.get("/", adminUserController.getUsers);
router.get("/:id", adminUserController.getUserById);
router.patch("/:id/status", adminUserController.toggleUserStatus);
router.delete("/:id", adminUserController.deleteUser);

module.exports = router;
