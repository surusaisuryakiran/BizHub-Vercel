# BizHub Vercel-ready deployment

This package is split into two independent Vercel projects.

## 1. Frontend
Deploy the `frontend` folder as a Vite project.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://YOUR-BACKEND.vercel.app/api`

The frontend package intentionally excludes `node_modules`, `dist`, Vite caches, and local environment files.

## 2. Backend
Deploy the `backend` folder as an Express project.
- Vercel detects `app.js` automatically (Express entrypoint).
- Do NOT deploy the old local `.env`.
- Add these Vercel environment variables:
  - `MONGO_URI` = your MongoDB Atlas connection string
  - `JWT_SECRET` = a strong random secret
  - `FRONTEND_URL` = your deployed frontend URL

The backend uses a cached Mongoose connection suitable for serverless/Fluid compute.

## Important
The original application uses a local MongoDB address (`mongodb://127.0.0.1:27017/...`), which cannot be used by a deployed Vercel backend. Use MongoDB Atlas or another externally reachable MongoDB deployment.

## Local development
Frontend:
    npm install
    npm run dev

Backend:
    npm install
    npm run dev

For local backend `.env`, copy `.env.example` to `.env` and set the real values.

## Original project findings
- React/Vite frontend: deployable after cleanup.
- Express backend: deployable after Vercel-safe DB/config cleanup.
- `node_modules` and `dist` were included in the original ZIP and are intentionally removed from this package.
- The original backend `.env` contained credentials/secrets and is intentionally not included.
