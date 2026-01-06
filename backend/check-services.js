const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const checkServices = async () => {
    try {
        const services = await Service.find({});
        console.log('Services found:', services.length);
        console.log(JSON.stringify(services, null, 2));
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkServices();
