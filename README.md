# CEP2 Full Stack Application

A modern full-stack application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Protected routes
- Modern UI with Tailwind CSS
- TypeScript for type safety
- MongoDB database integration
- JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Project Structure

```
project/
├── frontend/          # React frontend application
└── backend/          # Node.js backend application
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd project/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cep2
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application

1. Make sure MongoDB is running on your system
2. Start the backend server (from project/backend directory):
   ```bash
   npm run dev
   ```
3. Start the frontend development server (from project directory):
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile/:id` - Get user profile

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - JWT Authentication
  - Express Validator

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 
