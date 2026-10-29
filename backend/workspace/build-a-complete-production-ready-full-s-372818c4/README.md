# Kanban Task & Project Management System

> Generated automatically from the prompt: "Build a complete, production-ready full-stack application for "a hostel management system".
Architecture:
- Frontend: React + Tailwind CSS (Responsive CRUD dashboard, Auth screens, Clean UX)
- Backend: Node.js + Express REST API (JWT Authentication, Input Validation, Dynamic Data Routes)
- Database: MongoDB Mongoose Schemas (Relational Data Models, Indexes)

Key MVP Features Required:
1. Role-Based User Authentication & RBAC
2. Interactive Real-Time Data Dashboard
3. Dynamic Entity Data Management (CRUD)
4. Automated Data Analytics & Metrics
5. Search & Category Filtering System
6. Export & Report Generator Console

Ensure robust error handling, unit tests, automated deployment configuration, and clear documentation."

## Roles
- Admin
- Project Manager
- Team Member

## Features
- Interactive Kanban Drag & Status Boards
- Project Workspaces & Sprint Milestones
- Task Assignee & Priority Controls
- Comment Threads & File Attachments
- Real-Time Team Activity Logs
- Project Completion Metrics Dashboard

## Tech Stack
- Frontend: React, TypeScript-style, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT

## Getting Started

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

Or with Docker:
```bash
docker-compose up --build
```

## Testing
```bash
cd backend
npm test
```

## Deployment
- GitHub: not connected (pending)
- Frontend: not deployed (pending)
- Backend: not deployed (pending)
- Database: MongoDB Atlas (simulated)

See `docs/API.md`, `docs/ENVIRONMENT.md`, and `docs/ARCHITECTURE.md` for details.
