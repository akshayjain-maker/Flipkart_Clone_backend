const express = require('express');
const router = express.Router();
const panController = require('../controllers/panController');
const authenticate = require('../middleware/authMiddleware');
router.get('/me', authenticate, panController.getPan);
router.post('/save', authenticate, panController.savePan);

module.exports = router;
