# Urban Company Clone

A full-stack web application replicating the core functionalities of Urban Company, a gig marketplace for home services. This project facilitates service booking, user authentication, and management for both customers and service providers.

## 🚀 Features

### Frontend (Client-Side)
- **User Authentication**: Secure Login and Signup pages.
- **Service Browsing**: View available home services (`ServiceList`).
- **Service Booking**: Interactive booking form to schedule services (`BookingForm`).
- **Dashboard**: User dashboard to view booking history and profile (`Dashboard`).
- **Responsive Design**: Built with Tailwind CSS for a seamless mobile and desktop experience.
- **Navigation**: Client-side routing with React Router.

### Backend (Server-Side)
- **RESTful API**: Built with Node.js and Express. It provides endpoints for authentication, services, and bookings.
- **Database**: MongoDB with Mongoose for data modeling.
- **Authentication**: JWT (JSON Web Token) implementation for secure route protection.
- **Security**: Password hashing using bcryptjs.
- **CORS Support**: Configured to allow requests from the frontend application.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting**: ESLint

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT & bcryptjs

## 📂 Project Structure

```bash
Urban-Company-clone/
├── backend/                # Server-side application
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── src/                    # Client-side application
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context API files
│   ├── pages/              # Application pages (Home, Login, Dashboard, etc.)
│   ├── App.jsx             # Main App component
│   └── main.jsx            # DOM renderer
├── public/                 # Static assets
└── index.html              # HTML entry point
```

## ⚙️ Installation & Setup

Prerequisites: Ensure you have **Node.js** and **npm** installed on your machine. You will also need a local or cloud **MongoDB** instance (e.g., MongoDB Atlas).

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Urban-Company-clone.git
cd Urban-Company-clone
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
# Server should run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the root directory (where `vite.config.js` is located), and install dependencies:
```bash
npm install
```

**Note**: If you encounter issues with Tailwind, ensure you have the necessary dev dependencies installed:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Start the React development server:
```bash
npm run dev
# App should run on http://localhost:5173
```

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login user & get token |
| **GET** | `/api/services` | Get all available services |
| **POST** | `/api/bookings` | Create a new booking |
| **GET** | `/api/bookings` | Get user bookings |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
