const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Booking = require('./models/Booking');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const debugLogic = async () => {
    try {
        await connectDB();

        console.log('1. Finding a service...');
        const service = await Service.findOne({});
        if (!service) {
            console.error('No service found');
            process.exit(1);
        }
        console.log('   Found service:', service.name);
        console.log('   Service ID:', service._id);
        console.log('   Service Provider:', service.provider); // Should be ObjectId
        console.log('   Provider Type:', typeof service.provider);

        console.log('2. Creating Booking Instance...');
        // Mock user ID
        const user = await User.findOne({});

        const booking = new Booking({
            user: user._id,
            service: service._id, // use ID
            provider: service.provider, // use provider from service
            date: new Date(),
        });

        console.log('   Booking object created:');
        console.log(booking);

        console.log('3. Validating Booking...');
        await booking.validate();
        console.log('   Validation Successful!');

        console.log('4. Saving Booking (Simulated)...');
        // await booking.save(); 

        process.exit(0);

    } catch (error) {
        console.error('DEBUG FAILED:', error.message);
        if (error.errors) {
            console.error('Validation Errors:', JSON.stringify(error.errors, null, 2));
        }
        process.exit(1);
    }
};

debugLogic();
