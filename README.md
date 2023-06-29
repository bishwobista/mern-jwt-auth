# MERN-JWT-Auth App

This is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with JSON Web Tokens (JWT) for authentication. The frontend is developed using Vite, a fast development environment for React.js, and the backend is built with Express.js.

## Features

- User registration with email and password
- User login and authentication using JWT
- Protected routes that require authentication
- JSON Web Token generation and validation
- User profile management
- Logout functionality

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js (v14 or above)
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd mern-jwt-auth-app
   ```

3. Install the dependencies for both the frontend and backend:

   ```bash
   cd client && npm install
   ```

   ```bash
   cd server && npm install
   ```

4. Configuration:

   - In the `server` directory, create a `.env` file based on the `.env.example` file and provide the necessary configuration values, such as your MongoDB connection string and JWT secret.

5. Run the application:

   - To start the frontend development server, navigate to the `client` directory and run:

     ```bash
     npm run dev
     ```

   - To start the backend server, navigate to the `server` directory and run:

     ```bash
     npm run start
     ```

6. Access the application:

   - Open your browser and visit `http://localhost:3000` to access the application.

## Project Structure

The project is structured as follows:

```
mern-jwt-auth-app/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── routes/
│       ├── services/
│       ├── styles/
│       └── utils/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    └── app.js
```

- The `client` directory contains the frontend code, including React components, styles, routes, and services for making API requests.
- The `server` directory contains the backend code, including Express.js routes, controllers, middleware, models, and utility functions.

## Dependencies

The main dependencies used in this project are:

### Frontend

- React.js: JavaScript library for building user interfaces.
- React Router: Declarative routing for React applications.
- Axios: Promise-based HTTP client for making API requests.

### Backend

- Express.js: Web application framework for Node.js.
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
- Bcrypt: Library for hashing and comparing passwords.
- JSON Web Token (JWT): Library for generating and verifying JSON web tokens.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).