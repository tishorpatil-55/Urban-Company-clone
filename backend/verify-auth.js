const http = require('http');

const runRequest = (path, method, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: responseData });
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
};

const verifyAuth = async () => {
    const email = 'test_verify_' + Date.now() + '@example.com';
    const password = 'password123';
    const name = 'Verify User';

    console.log(`Testing Auth Flow for ${email}...`);

    try {
        // 1. Register
        console.log('1. Testing Registration...');
        const regRes = await runRequest('/api/auth/register', 'POST', { name, email, password, role: 'user' });
        console.log(`   Registration Status: ${regRes.statusCode}`);
        if (regRes.statusCode !== 201) {
            console.error('Registration Failed:', regRes.body);
            return;
        }

        // 2. Login
        console.log('2. Testing Login...');
        const loginRes = await runRequest('/api/auth/login', 'POST', { email, password });
        console.log(`   Login Status: ${loginRes.statusCode}`);
        if (loginRes.statusCode !== 200) {
            console.error('Login Failed:', loginRes.body);
            return;
        }

        console.log('SUCCESS: Registration and Login verified.');

    } catch (error) {
        console.error('Test Error:', error);
    }
};

verifyAuth();
