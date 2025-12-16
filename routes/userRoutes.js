const express = require("express");
const { getProfile ,updateProfile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);


module.exports = router;
