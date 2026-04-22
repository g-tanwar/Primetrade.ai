# Primetrade

Primetrade is a full-stack starter app with:

- Node.js + Express backend (JWT auth, role checks, task CRUD)
- React frontend (login, register, and basic dashboard)
- MongoDB with Mongoose models

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React (Vite), React Router, Axios

## Project Structure

```text
Primetrade/
├── src/                 # Backend source
│   ├── config/          # DB connection
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, roles, validation, error handling
│   ├── models/          # Mongoose models
│   └── routes/          # API routes
└── client/              # React frontend
    └── src/
        ├── api/         # Axios client setup
        └── pages/       # Login, Register, Dashboard
```

## Setup

### 1) Clone and install backend dependencies

```bash
git clone https://github.com/g-tanwar/Primetrade.ai.git
cd Primetrade
npm install
```

### 2) Configure backend environment

Create `.env` in project root:

```bash
cp .env.example .env
```

Required backend variables:

- `PORT=5000`
- `MONGO_URI=<your_mongodb_connection_string>`
- `JWT_SECRET=<a_long_random_secret>`
- `JWT_EXPIRES_IN=7d`

### 3) Install frontend dependencies

```bash
cd client
npm install
```

Create frontend env:

```bash
cp .env.example .env
```

Frontend variable:

- `VITE_API_BASE_URL=http://localhost:5000/api/v1`

### 4) Run the app

Run backend (from root):

```bash
npm run dev
```

Run frontend (from `client`):

```bash
npm run dev
```

Default URLs:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## API Overview

Base URL: `http://localhost:5000/api/v1`

### Auth

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user and return JWT

### Tasks (Authenticated)

- `POST /tasks` - Create task for logged-in user
- `GET /tasks` - Get logged-in user tasks
- `GET /tasks/:id` - Get single task (owned by logged-in user)
- `PATCH /tasks/:id` - Update task (owned by logged-in user)
- `DELETE /tasks/:id` - Delete task (owned by logged-in user)

### Users (Admin only)

- `GET /users` - List users (requires `admin` role)

## Authentication Notes

- Login returns a JWT token.
- Frontend stores token in `localStorage`.
- Axios request interceptor attaches token automatically as:
  - `Authorization: Bearer <token>`

## Current Frontend Pages

- `/login` - Login form
- `/register` - Register form
- `/dashboard` - Minimal tasks dashboard (fetch/add/delete)

## Future Improvements

- Add refresh tokens and logout endpoint
- Add protected route wrappers in frontend
- Add tests (unit + integration)
- Add Docker setup for local development
