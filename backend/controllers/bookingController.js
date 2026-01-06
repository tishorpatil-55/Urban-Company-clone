const Booking = require('../models/Booking');
const Service = require('../models/Service');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    // Frontend sends 'service' as the ID, or we can look for 'serviceId' for compatibility
    const serviceId = req.body.service || req.body.serviceId;
    const { date, time } = req.body; // Add time if needed, though Schema might not have it yet.

    if (!serviceId) {
        return res.status(400).json({ message: 'Service ID is required' });
    }

    try {
        // Find the service to get the provider
        const service = await Service.findById(serviceId);
        console.log('DEBUG: Found service:', service);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        console.log('DEBUG: Service provider:', service.provider);


        const booking = new Booking({
            user: req.user._id,
            service: serviceId,
            provider: service.provider, // Get provider from the service
            date: date, // Ensure date is formatted correctly if needed
            // If Schema updates to include time/address, add them here:
            // time, 
            // address
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('service').populate('provider', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Provider/Admin
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.status = status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getMyBookings, updateBookingStatus };
