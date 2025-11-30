const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await Service.find({}).populate('provider', 'name email');
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Provider/Admin
const createService = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const service = new Service({
            name,
            description,
            price,
            category,
            provider: req.user._id,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, createService };
