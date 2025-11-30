const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, provider } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking).get(protect, getMyBookings);
router.route('/:id/status').put(protect, provider, updateBookingStatus);

module.exports = router;
