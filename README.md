# Task Management Portal

A professional Task Management Portal built with the MERN stack, featuring a secure Express.js backend and a dynamic React frontend powered by Vite.

## Features
- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Task Management**: Create, view, update (status), and delete tasks.
- **Filtering**: Easily filter tasks by status (All, Pending, Completed).
- **Responsive Design**: Modern UI styled with Tailwind CSS, fully responsive across all devices.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local instance or Atlas connection string)

### 1. Database Configuration
Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/task-portal
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 2. Backend Installation & Setup
```bash
cd backend
npm install
npm start
```
The server will start on [http://localhost:5000](http://localhost:5000).

### 3. Frontend Installation & Setup
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at [http://localhost:5174](http://localhost:5174) (or as shown in the terminal).

## API Documentation
The backend provides a stateless REST API:
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive a JWT.
- `GET /api/tasks`: Fetch all tasks for the logged-in user.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update task status.
- `DELETE /api/tasks/:id`: Remove a task.

---
Developed as a production-ready Task Management solution.
