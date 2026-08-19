# MindMetric AI – Deployment Guide

## Quick Start (Local Dev)

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env            # edit if needed
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env            # set VITE_API_URL
npm run dev                     # → http://localhost:5173
```

---

## Deploy Frontend to Vercel

### Prerequisites
- Push your repo to GitHub/GitLab/Bitbucket
- Create a free account at [vercel.com](https://vercel.com)

### Steps

1. **Import your repo** on vercel.com → click **New Project**
2. **Set the root directory** to `frontend` (critical – the repo root has both frontend and backend)
3. **Configure the build settings:**
   | Setting | Value |
   |---------|-------|
   | Framework | Vite |
   | Root Directory | `frontend` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

4. **Add environment variable** (under Project Settings → Environment Variables):
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```
   > Replace with your actual Render backend URL. This is required – without it the frontend cannot reach the backend.

5. **Deploy** – Vercel will auto-build and deploy. SPA routing is handled by `frontend/vercel.json` (rewrites all routes to `index.html`).

> **Why it works:** `vercel.json` in the `frontend/` directory contains rewrite rules so that navigating to `/assessment` or `/results` (or refreshing those pages) serves `index.html` instead of returning a 404.

---

## Deploy Backend to Render

### Prerequisites
- Push your repo to GitHub/GitLab/Bitbucket
- Create a free account at [render.com](https://render.com)

### Steps

1. **Import your repo** on render.com → click **New** → **Web Service**
2. **Configure the service:**
   | Setting | Value |
   |---------|-------|
   | Name | `mindmetric-backend` (or anything) |
   | Runtime | Python 3 |
   | Root Directory | `backend` |
   | Build Command | `pip install -r requirements.txt` |
   | Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
   | Instance Type | Free (or Starter for always-on) |

3. **Add environment variable** (under Environment tab):
   ```
   ALLOWED_ORIGINS=https://your-app-name.vercel.app
   ```
   > Replace with your actual Vercel frontend URL. **This is required** – without it the backend blocks all browser requests from the frontend (CORS).

4. **Deploy** – Render will build and start the FastAPI server. Note the service URL (e.g., `https://mindmetric-backend.onrender.com`).

5. **Update Vercel** – Go back to your Vercel project → Settings → Environment Variables → set `VITE_API_URL` to your Render URL, then **redeploy**.

> **Render free tier note:** The service spins down after inactivity. The first request after idle takes ~30-60s to wake up. Upgrade to a paid plan for always-on.

---

## Deployment Checklist

- [ ] **Backend deployed on Render** and health check returns `{"status": "ok"}` at `https://your-backend.onrender.com/`
- [ ] **`ALLOWED_ORIGINS`** set on Render to your Vercel frontend URL
- [ ] **Frontend deployed on Vercel** with root directory set to `frontend`
- [ ] **`VITE_API_URL`** set on Vercel to your Render backend URL
- [ ] **Both services redeployed** after setting env vars
- [ ] **SPA routing works** – refreshing on `/assessment` or `/results` does NOT return 404
- [ ] **API calls work** – submitting the assessment form returns a prediction

---

## Common Production Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Blank page or 404 on page refresh | Missing SPA rewrite rules | Ensure `vercel.json` exists in `frontend/` with rewrites |
| `CORS error` / `blocked by CORS policy` | Backend `ALLOWED_ORIGINS` doesn't include your Vercel URL | Set `ALLOWED_ORIGINS=https://your-app.vercel.app` on Render |
| `Failed to connect to backend` | `VITE_API_URL` not set or wrong | Set `VITE_API_URL=https://your-backend.onrender.com` on Vercel and redeploy |
| `502 Bad Gateway` on Render | Backend crashed on startup | Check Render logs; ensure `Mental_Health_Model.pkl` is in the repo |
| Slow first request on Render | Free tier spin-down | Wait 30-60s or upgrade to paid plan |

---

## Environment Variables Reference

| Variable | Where | Default | Description |
|----------|-------|---------|-------------|
| `VITE_API_URL` | frontend `.env` | `http://127.0.0.1:8000` | Base URL of the FastAPI backend |
| `ALLOWED_ORIGINS` | backend `.env` | `http://localhost:5173,...` | Comma-separated list of allowed frontend origins |

---

## Build Output

```
dist/
├── index.html
└── assets/
    ├── react-*.js        (~137 kB / 45 kB gzip)
    ├── recharts-*.js     (~355 kB / 94 kB gzip)
    ├── motion-*.js       (~108 kB)
    ├── router-*.js       (~21 kB)
    ├── index-*.js        (app code)
    ├── index-*.css       (styles)
    └── bunty*.png        (avatar assets)
```
