# 🚀 Quick Start - Frontend Setup (2 Minutes)

## Prerequisites
- Backend running: `http://127.0.0.1:8000` ✅
- Node.js installed (v16+)

---

## Step 1: Install Dependencies
```powershell
cd frontend
npm install
```
⏱️ Takes 2-5 minutes

---

## Step 2: Start Development Server
```powershell
npm run dev
```

**Output should show**:
```
  ➜  Local:   http://localhost:5173/
```

---

## Step 3: Open in Browser
- Click link or go to: **http://localhost:5173**
- You should see the landing page with "MindScore AI"

---

## ✅ That's It!

### Quick Test
1. Click "Start Assessment"
2. Fill in the 4-step form
3. Submit and see your ML-predicted score

---

## 📁 All Files Created

**23 files** in `frontend/` directory:

**Configuration**: package.json, vite.config.js, tailwind.config.js, postcss.config.js, .env, .env.example, .gitignore

**Source Code**: App.jsx, main.jsx, index.css, and 9 components + 3 pages + 1 service

**Documentation**: README.md

---

## 🐛 If Something Goes Wrong

### Error: "Cannot find module"
```powershell
rm -r node_modules package-lock.json
npm install
```

### Error: "Cannot connect to backend"
Check: Is http://127.0.0.1:8000 running?
```powershell
# In another terminal, from project root:
uvicorn backend.main:app --reload
```

### Error: "Port already in use"
```powershell
npm run dev -- --port 5174
```

---

## 📞 Full Details

See **SETUP_FRONTEND.md** in the project root for complete setup guide and troubleshooting.

---

## 🎯 Backend URL

The frontend expects the backend at:
```
http://127.0.0.1:8000
```

This is configured in `frontend/.env`:
```
VITE_API_URL=http://127.0.0.1:8000
```

Change if your backend runs on a different port.

---

## ✨ Features

✅ 3 pages (Home, Assessment, Results)  
✅ 4-step form with validation  
✅ Score visualization with Recharts  
✅ Fully responsive (mobile/tablet/desktop)  
✅ Smooth animations  
✅ Professional UI with Tailwind CSS  

---

Happy coding! 🎉
