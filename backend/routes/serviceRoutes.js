const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const { protect, provider } = require('../middleware/authMiddleware');

router.route('/').get(getServices).post(protect, provider, createService);

module.exports = router;
