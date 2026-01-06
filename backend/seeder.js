const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing services to avoid duplicates if run multiple times (optional, but good for idempotency)
        await Service.deleteMany();

        const user = await User.findOne();

        if (!user) {
            console.error('Error: No users found in database. Create a user first.');
            process.exit(1);
        }

        const providerId = user._id;

        const services = [
            {
                name: 'Home Cleaning',
                description: 'Professional home cleaning service including deep cleaning of all rooms, kitchen, and bathrooms. We use eco-friendly products.',
                price: 1499,
                category: 'Cleaning',
                provider: providerId,
            },
            {
                name: 'AC Repair & Service',
                description: 'Expert AC repair and servicing for all brands. Includes filter cleaning, gas validation, and overall performance check.',
                price: 599,
                category: 'Appliance Repair',
                provider: providerId,
            },
            {
                name: 'Plumbing Services',
                description: 'Fixing leaks, installation of taps, sinks, and other plumbing fixtures. Fast and reliable service.',
                price: 499,
                category: 'Plumbing',
                provider: providerId,
            },
            {
                name: 'Electrician',
                description: 'Electrical wiring, switch installation, fan repair, and other electrical services by certified professionals.',
                price: 399,
                category: 'Electrical',
                provider: providerId,
            },
            {
                name: 'Salon for Men',
                description: 'Haircut, beard trim, and facial services at home. Hygenic and safe.',
                price: 299,
                category: 'Salon',
                provider: providerId,
            },
            {
                name: 'Salon for Women',
                description: 'Waxing, threading, and facial services at home. Hygenic and safe.',
                price: 899,
                category: 'Salon',
                provider: providerId,
            }
        ];

        await Service.insertMany(services);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
