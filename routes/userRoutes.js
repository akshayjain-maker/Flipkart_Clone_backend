const express = require("express");
const { getProfile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.get("/profile", auth, getProfile);

module.exports = router;
