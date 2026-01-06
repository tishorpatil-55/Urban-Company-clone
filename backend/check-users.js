const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const checkUsers = async () => {
    try {
        const users = await User.find({});
        console.log('Users found:', users.length);
        if (users.length > 0) {
            console.log('First user ID:', users[0]._id);
            console.log('First user Role:', users[0].role);
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
