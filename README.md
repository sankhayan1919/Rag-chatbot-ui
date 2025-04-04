# IntelliBot - AI Chatbot Interface

A full-stack chatbot application built with React, Node.js, and MongoDB.

## Features

- Real-time chat interface
- User authentication
- Chat history
- File upload support
- Dark mode
- Responsive design

## Setup

1. Install MongoDB Compass and ensure MongoDB is running locally
2. Clone the repository
3. Install dependencies:
   ```bash
   npm run install:all
   ```
4. Create a .env file in the root directory with the following:
   ```
   MONGODB_URI=mongodb://localhost:27017/intellibot
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
5. Start the development servers:
   ```bash
   npm start
   ```

## Project Structure

- `/frontend` - React application
- `/backend` - Express server and API
- `/backend/src/models` - MongoDB schemas
- `/backend/src/routes` - API routes
- `/backend/src/middleware` - Custom middleware

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express, MongoDB
- Authentication: JWT
- File Upload: Multer