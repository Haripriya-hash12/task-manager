# Smart Task Manager

A beginner-friendly full-stack task manager app with user authentication.

Users can sign up, log in, and manage personal tasks from a clean dashboard.

---

## Live Demo

* **Frontend (Netlify):** https://sparkly-dango-9f1abb.netlify.app
* **Backend (Render):** https://task-manager-e4bh.onrender.com

---

##  Features

* User signup and login with JWT authentication
* Protected task routes (each user accesses only their own tasks)
* Create tasks
* View tasks
* Delete tasks
* Mark tasks as completed or pending
* Basic loading and error handling in UI

---

##  Tech Stack

### Frontend

* React
* React Router
* Fetch API

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)

---

## Project Structure

```
task-manager/
  backend/
  frontend/
```

---

##  Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend (.env)

```
REACT_APP_API_URL=https://task-manager-e4bh.onrender.com/api
```

---

##  API Endpoints

Base URL:

```
https://task-manager-e4bh.onrender.com/api
```

### Auth

* `POST /auth/signup` → Register user
* `POST /auth/login` → Login and get token

---

### Tasks (Protected)

Header:

```
Authorization: Bearer <token>
```

* `POST /tasks` → Create task
* `GET /tasks` → Get all tasks
* `DELETE /tasks/:id` → Delete task

---

##  Deployment

### Backend

* Deployed on Render
* Connected with MongoDB Atlas
* Environment variables configured

### Frontend

* Deployed on Netlify
* Base directory: `frontend`
* Build command: `npm run build`
* Publish directory: `build`

---

##  Notes

* JWT_SECRET is kept secure
* `.env` files are not committed
* `.env.example` files are used as templates

---

## Status

✔ Backend deployed and working
✔ Frontend deployed and working
✔ Database connected
✔ Task creation and deletion working

---

##  Conclusion

This project demonstrates a complete full-stack workflow including authentication, database integration, API development, and deployment.

---
