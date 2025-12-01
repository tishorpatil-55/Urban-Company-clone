# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Backend Overview

The backend of this Urban Company Clone is built using **Node.js** and **Express.js**, with **MongoDB** as the database. It follows the **MVC (Model-View-Controller)** architecture to ensure a clean separation of concerns.

## 🛠 Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (with Mongoose ODM)
-   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
-   **Environment Management**: dotenv
-   **CORS**: Enabled for cross-origin requests

## 📂 Project Structure

-   `server.js`: Entry point of the application. Connects to the database and initializes routes.
-   `config/`: Configuration files (e.g., Database connection logic).
-   `controllers/`: Contains the business logic for handling requests (Auth, Services, Bookings).
-   `models/`: Mongoose schemas defining the data structure (User, Service, etc.).
-   `routes/`: API route definitions mapping endpoints to controllers.
-   `middleware/`: Custom middleware (e.g., Authentication protection).

## 🔑 Key Features

1.  **Authentication**:
    -   User registration and login.
    -   Password hashing using `bcryptjs`.
    -   JWT-based session management.

2.  **Service Management**:
    -   API to fetch available services.
    -   Provider-specific routes to create new services (protected).

3.  **Booking System**:
    -   Endpoints to manage bookings (Create, Read, Update, Delete).

## 🚀 Getting Started

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in a `.env` file (PORT, MONGO_URI, JWT_SECRET).
4.  Start the server:
    ```bash
    npm start
    # or for development
    npm run dev
    ```
