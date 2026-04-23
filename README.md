# Smart Task Manager

A beginner-friendly full-stack task manager app with user authentication.

Users can sign up, log in, and manage personal tasks from a clean dashboard.

## Features

- User signup and login with JWT authentication
- Protected task routes (each user can access only their own tasks)
- Create, view, update, and delete tasks
- Mark tasks as completed or pending
- Basic loading, empty state, and error handling in UI

## Tech Stack

### Frontend

- React
- React Router
- Fetch API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```bash
task-manager/
  backend/
  frontend/
```

## Setup Instructions

## 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd task-manager
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

```bash
cd ../frontend
npm install
```

## 2) Environment Variables

Create these files:

- `backend/.env`
- `frontend/.env`

You can copy from:

- `backend/.env.example`
- `frontend/.env.example`

### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_jwt_secret_here
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 3) Run Locally

Open 2 terminals.

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Tasks (Protected)

Send header:

```http
Authorization: Bearer <token>
```

- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks for logged-in user
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Deployment Instructions (Simple)

## Backend deployment

Deploy backend to a Node.js host (for example: Render, Railway, Cyclic, or VPS).

Set backend environment variables on hosting platform:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

## Frontend deployment

Deploy frontend to a static host (for example: Vercel, Netlify, or Render Static Site).

Set frontend environment variable:

- `REACT_APP_API_URL` = your deployed backend URL + `/api`

Example:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

Then redeploy frontend after setting env variable.

## Notes

- Keep `JWT_SECRET` private.
- Do not commit real `.env` files.
- Use `.env.example` files as templates.
