# Frontend Setup & Verification Guide

## Step 1: Verify Backend is Running ✅

Before starting the frontend, ensure the FastAPI backend is running:

```bash
# In your ML project root directory
cd c:\Users\dhruv\OneDrive\Desktop\JAY\ML

# The backend should be running on:
uvicorn backend.main:app --reload
# Expected output: INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Verify**: Open http://127.0.0.1:8000 in your browser. You should see:
```json
{"Welcome to Sheryians AI School Guys"}
```

---

## Step 2: Install Frontend Dependencies 📦

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies (Node.js 16+ required)
npm install
```

**Time**: Usually takes 2-5 minutes

---

## Step 3: Verify .env Configuration ⚙️

Check that `frontend/.env` contains:
```
VITE_API_URL=http://127.0.0.1:8000
```

If `.env` doesn't exist, create it:
```bash
cp .env.example .env
```

---

## Step 4: Start the Frontend Development Server 🚀

```bash
# From the frontend directory
npm run dev
```

**Expected output**:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**Open**: http://localhost:5173 in your browser

---

## Step 5: Verify Frontend is Working ✨

### Landing Page Check
- [ ] You see the "MindScore AI" logo in the navbar
- [ ] Hero section displays: "Understand Your Mental Health Score"
- [ ] "Start Assessment" button is clickable
- [ ] Features section is visible with 4 cards

### Assessment Page Check
- [ ] Click "Start Assessment" → you're on `/assessment`
- [ ] Step 1 progress bar shows "Step 1 of 4"
- [ ] All form fields appear: Age, Gender, Country, Academic Level
- [ ] "Next" button is visible

### Submit Assessment (Full Flow)
1. Fill Step 1: Age (20), Gender (Male), Country (USA), Academic (Undergraduate)
2. Fill Step 2: Platform (YouTube), Purpose (Entertainment), Usage (5), Unlocks (50)
3. Fill Step 3: Study (4), Physical (1), Sleep (7)
4. Fill Step 4: Stress (Medium)
5. Click "Predict My Score"
6. **Expected**: Results page with predicted score

---

## Complete Startup Checklist

### Terminal 1: FastAPI Backend
```bash
cd c:\Users\dhruv\OneDrive\Desktop\JAY\ML
# Make sure you have activated your venv if using one
uvicorn backend.main:app --reload
# Check: http://127.0.0.1:8000 returns {"Welcome..."}
```

### Terminal 2: React Frontend
```bash
cd c:\Users\dhruv\OneDrive\Desktop\JAY\ML\frontend
npm install  # First time only
npm run dev
# Check: http://localhost:5173 loads the landing page
```

---

## Backend Endpoint Verification 🔗

Test the `/predict` endpoint:

```bash
# Using PowerShell
$body = @{
    "age" = 22
    "gender" = "Male"
    "country" = "USA"
    "academic_level" = "Undergraduate"
    "most_used_platform" = "Instagram"
    "purpose_of_use" = "Entertainment"
    "avg_daily_usage_hours" = 5.5
    "daily_unlocks" = 75
    "study_hours" = 3
    "physical_activity_hours" = 1.5
    "sleep_hours_per_night" = 7
    "stress_level" = "Medium"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://127.0.0.1:8000/predict" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Response**:
```json
{
  "predicted_mental_health_score": 6.42
}
```

---

## Troubleshooting 🛠️

### Frontend won't connect to backend
**Error**: "Failed to connect to the backend"
**Solution**:
1. Check backend is running: `http://127.0.0.1:8000`
2. Check `.env` has `VITE_API_URL=http://127.0.0.1:8000`
3. Restart frontend: `npm run dev`

### Port already in use
**Error**: "Port 5173 is already in use"
**Solution**:
```bash
# Kill the process or use a different port
npm run dev -- --port 5174
```

### Dependencies not installed
**Error**: "Cannot find module 'react'"
**Solution**:
```bash
rm -r node_modules package-lock.json
npm install
```

### Backend model file not found
**Error**: FileNotFoundError: "Mental_Health_Model.pkl"
**Solution**: Ensure the model file exists at `backend/Mental_Health_Model.pkl`

---

## Project Architecture 🏗️

```
ML Project/
├── backend/
│   ├── main.py (FastAPI backend)
│   └── Mental_Health_Model.pkl (Trained model)
├── Student Social Media And Mental Health Impact.csv (Training data)
└── frontend/ (React + Vite)
    ├── src/
    │   ├── components/ (Reusable UI)
    │   ├── pages/ (Home, Assessment, Results)
    │   ├── services/ (API calls)
    │   └── App.jsx (Routing)
    └── package.json
```

---

## API Field Mapping 🔄

Frontend form fields → Backend expected fields:

| Frontend | Backend | Type | Example |
|----------|---------|------|---------|
| age | age | int | 22 |
| gender | gender | string | "Male" |
| country | country | string | "USA" |
| academic_level | academic_level | string | "Undergraduate" |
| most_used_platform | most_used_platform | string | "Instagram" |
| purpose_of_use | purpose_of_use | string | "Entertainment" |
| avg_daily_usage_hours | avg_daily_usage_hours | float | 5.5 |
| daily_unlocks | daily_unlocks | int | 75 |
| study_hours | study_hours | float | 3.0 |
| physical_activity_hours | physical_activity_hours | float | 1.5 |
| sleep_hours_per_night | sleep_hours_per_night | float | 7.0 |
| stress_level | stress_level | string | "Medium" |

**Response**: `{ "predicted_mental_health_score": 6.42 }`

---

## Development Tips 💡

### View React Components in DevTools
1. Open http://localhost:5173
2. Press `F12` to open DevTools
3. Install React Developer Tools extension for easier debugging

### Check Console for Errors
- Open DevTools → Console tab
- No red errors should appear during normal operation

### Hot Reload
- Save any `.jsx` or `.css` file
- Browser automatically updates (no manual refresh needed)

### Build for Production
```bash
npm run build
# Output in dist/ folder, ready to deploy
```

---

## Success Indicators ✅

- [ ] Backend running at http://127.0.0.1:8000
- [ ] Frontend running at http://localhost:5173
- [ ] Landing page loads with no console errors
- [ ] Assessment form has all 4 steps with proper validation
- [ ] Submitting the form returns a prediction score
- [ ] Results page displays the score with visualization
- [ ] All buttons and navigation work smoothly
- [ ] Mobile/tablet responsive design is visible

---

## Support

If you encounter issues:
1. Check console (F12) for error messages
2. Verify backend is running and responsive
3. Check `VITE_API_URL` in `.env`
4. Restart both backend and frontend
5. Clear browser cache: Ctrl+Shift+Delete

Enjoy your ML-powered mental health assessment application! 🎉
