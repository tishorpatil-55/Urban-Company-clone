const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

dotenv.config();

// We need to query the database directly to get IDs, then use axios against the running server to test the API.
// Actually, using axios against localhost:5000 is better to test the full stack.

const API_URL = 'http://localhost:5001/api';

const runTest = async () => {
    try {
        await connectDB();

        // 1. Get a User (or create one if needed, but we assume seeded users exist)
        const user = await User.findOne({ email: 'john@example.com' }); // standard seeded user?
        let token;
        let userId;

        // If no user, we might need to register/login via API to get token.
        // Let's simpler: Use a known user or create one via API.

        console.log('1. Logging in...');
        try {
            // Try to login with sample user
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: 'user@example.com',
                password: 'password'
            });
            token = loginRes.data.token;
            console.log('   Logged in as:', loginRes.data.name);
        } catch (e) {
            console.log('   Login failed, trying to register new test user...');
            const timestamp = Date.now();
            const regRes = await axios.post(`${API_URL}/auth/register`, {
                name: `Test User ${timestamp}`,
                email: `test${timestamp}@example.com`,
                password: 'password'
            });
            token = regRes.data.token;
            console.log('   Registered new user:', regRes.data.name);
        }

        // 2. Get a Service
        console.log('2. Fetching services...');
        const service = await Service.findOne({});
        if (!service) {
            throw new Error('No services found in DB. Please seed first.');
        }
        console.log('   Found service:', service.name, 'ID:', service._id);

        // 3. Create a Booking
        console.log('3. Creating booking...');
        const bookingDate = new Date().toISOString().split('T')[0];
        const bookingPayload = {
            service: service._id.toString(), // Frontend style
            date: bookingDate,
            time: '10:00',
            address: '123 Test St'
        };

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const createRes = await axios.post(`${API_URL}/bookings`, bookingPayload, config);
        console.log('   Booking created! ID:', createRes.data._id);

        if (!createRes.data.provider) {
            console.error('   CRITICAL ERROR: Provider was not assigned to booking!');
        } else {
            console.log('   Provider assigned:', createRes.data.provider);
        }

        // 4. Get My Bookings
        console.log('4. Fetching my bookings...');
        const getRes = await axios.get(`${API_URL}/bookings`, config);
        const myBookings = getRes.data;
        console.log(`   Fetched ${myBookings.length} bookings.`);

        // 5. Verify
        const found = myBookings.find(b => b._id === createRes.data._id);
        if (found) {
            console.log('   SUCCESS: Created booking found in list.');
            if (found.service && found.service.name) {
                console.log('   SUCCESS: Service details populated:', found.service.name);
            } else {
                console.error('   ERROR: Service details NOT populated.');
            }
        } else {
            console.error('   FAILURE: Created booking NOT found in list.');
        }

        process.exit(0);

    } catch (error) {
        console.error('TEST FAILED:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        process.exit(1);
    }
};

runTest();
