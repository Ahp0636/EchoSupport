# Free Deployment (Frontend + Backend)

This project can run on a fully free stack:
- Frontend: Vercel Hobby (free)
- Backend: Render Free Web Service
- Database: MongoDB Atlas Free cluster (M0)

## 1) Prepare environment variables

### Backend (`backend/.env` locally)
Use `backend/.env.example` as template.

Required:
- `MONGO_URI`
- `OPENAI_API_KEY`
- `CORS_ORIGIN` (set to your frontend domain after deploy)

### Frontend (`frontend/.env` locally)
Use `frontend/.env.example` as template.

Required:
- `VITE_API_BASE_URL` (your backend URL, for example `https://your-api.onrender.com`)

## 2) Deploy backend to Render (free)

1. Push repo to GitHub.
2. In Render: `New` -> `Web Service`.
3. Connect repo and set:
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
4. Choose `Free` instance type.
5. Add env vars:
- `MONGO_URI`
- `OPENAI_API_KEY`
- `CORS_ORIGIN` (temporary: `*`, then set frontend URL after frontend deploy)
6. Deploy and copy backend URL (`https://...onrender.com`).

## 3) Deploy frontend to Vercel (free)

1. In Vercel: `Add New Project` and import repo.
2. Set:
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
3. Add env var:
- `VITE_API_BASE_URL=https://your-backend.onrender.com`
4. Deploy and copy frontend URL.

## 4) Final CORS update

After frontend URL is live, update Render env var:
- `CORS_ORIGIN=https://your-frontend.vercel.app`

Redeploy backend once.

## 5) Notes about free tier behavior

- Render free web services spin down after inactivity and may take around a minute to wake.
- MongoDB Atlas free cluster is for small workloads.
- Vercel Hobby is free with monthly usage limits.
