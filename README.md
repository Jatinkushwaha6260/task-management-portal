# Task Management Portal

A simple Task Management Portal built using the MERN stack (MongoDB, Express/Next.js routes, React Vite, Node.js).

## Project Structure
The repository is split into two completely separate folders natively:
1. `backend/`: A Next.js API-only server connected to MongoDB.
2. `frontend/`: A React Single Page Application created with Vite and styled with Tailwind CSS.

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- Local MongoDB instance or MongoDB Atlas account

### 1. Setup Database
Create a `.env.local` inside the `backend` directory:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/task-portal
JWT_SECRET=your_super_secret_jwt_key
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
# The backend API proxy routes will start at http://localhost:3000
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
# The Vite frontend server will typically start at http://localhost:5173
```
Visit the frontend URL in your browser to interact with the application.

---

## Technical Constraints & Deliverables Checked
- **Frontend**: React (Vite)
- **Backend**: Next.js
- **Database**: MongoDB
- **User Authentication**: Registered / Logged In users via JWT.
- **Core Features**: 
    - Add Task (Title required, Description optional)
    - View Tasks (Displayed in list, shows status & created date)
    - Mark Task as Completed (Status toggling)
    - Filtering (All / Pending / Completed criteria)

---

## Documentation

### AI Prompts Used
The following prompts were provided by the user to the Antigravity Agent:
1. *"is assignment ko complete kar ke do jo bhi requirement is assinment me boli gayi hai , sari complete kar ke do , run bhi kar ke do, please fast"*
2. *"frontend and backend dono part run kar ke do"*
3. *"frontend and backend dono running mode me with frontend backend connectivity"*
4. *"frontend and backend ke seperate folder hone chahiye"*

### What AI generated vs what they modified
- **AI Generated**: 100% of the codebase, project initialization using `create-next-app` & `create-vite`, dependency injection (Tailwind, Mongoose, Axios), implementation of user authentication, DB connections, API routes, and React components.
- **Human Modified**: No structural code was manually modified by the human user. The user steered the agent by asserting requirements regarding project architecture (strict separation between backend/frontend, concurrent local execution) and ensuring 100% alignment with the assignment criteria.

### API Design
The backend is powered by Next.js app directory API routes, functioning purely as a stateless REST JSON boundary.
- **`POST /api/auth/register`**: Expects `email`, `password`. Creates user and returns JWT token & user object.
- **`POST /api/auth/login`**: Expects `email`, `password`. Authenticates user and returns JWT token & user object.
- **`GET /api/tasks`**: Requires `Authorization: Bearer <token>`. Returns JSON array of task objects owned by the authenticated user, sorted by descending creation time.
- **`POST /api/tasks`**: Requires `Authorization: Bearer <token>`. Expects `title`, optional `description`. Returns the newly created Task object with `status: Pending`.
- **`PUT /api/tasks/:id`**: Requires `Authorization: Bearer <token>`. Expects updated `status`. Marks tasks as either 'Completed' or 'Pending'.
- **`DELETE /api/tasks/:id`**: Requires `Authorization: Bearer <token>`. Deletes the task from MongoDB.

### State Management
State management on the frontend strictly relies on React's native hooks (`useState`, `useEffect`) without heavy libraries (Redux) to adhere to the "simple portal" specification.
- **Application Scope**: Global state is minimized exclusively to the Authentication `token`, which is lifted to the root `App.jsx` component. It passes `setToken` closures to nested routes so children can revoke login status. `axios` intercepts this state change using a `useEffect` hook to dynamically populate the default `Authorization` HTTP header globally for all subsequent async API requests.
- **Local Dashboard Scope**: Inside `TaskBoard.jsx`, list-state mutations are optimistic when practical. Complex arrays like `tasks`, active enum `filter` strings, input `title`, and input `description` are restricted to local variables. Toggling status uses a declarative filter mapping, replacing old array items via immutable state updates rather than direct DOM mutations.
