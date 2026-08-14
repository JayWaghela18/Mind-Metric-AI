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

## Production Build

### 1. Set environment variables

**`frontend/.env`**
```
VITE_API_URL=https://your-backend-domain.com
```

**`backend/.env`**
```
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 2. Build the frontend
```bash
cd frontend
npm run build          # outputs to frontend/dist/
npm run preview        # test the production bundle locally → http://localhost:4173
```

### 3. Deploy the `dist/` folder

| Platform | Steps |
|----------|-------|
| **Vercel** | `npm i -g vercel && vercel --prod` from the `frontend/` dir |
| **Netlify** | Drag-and-drop the `dist/` folder at app.netlify.com |
| **GitHub Pages** | Push `dist/` contents to `gh-pages` branch |
| **NGINX** | Serve `dist/` as the root; add `try_files $uri /index.html` for SPA routing |

> **SPA routing note:** All platforms must redirect non-asset 404s to `index.html` so React Router works on page refresh.

### 4. Deploy the backend

The FastAPI backend can be deployed to any server running Python 3.9+:

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2
```

Platforms: **Railway**, **Render**, **Fly.io**, **AWS EC2**, **Google Cloud Run**.

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
