import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # python-dotenv not installed; rely on OS env vars

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal
from pathlib import Path

# ─── Model ────────────────────────────────────────────────────────────────────
MODEL_PATH = Path(__file__).resolve().parent / 'Mental_Health_Model.pkl'
model = joblib.load(MODEL_PATH)

TOP_COUNTRIES = [
    'Other', 'India', 'USA', 'Canada',
    'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France',
]

# ─── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="MindMetric AI – Backend",
    description="FastAPI backend that runs the mental-health score prediction model.",
    version="1.0.0",
)

# ─── CORS ─────────────────────────────────────────────────────────────────────
# Read allowed origins from the environment variable ALLOWED_ORIGINS.
# Supply a comma-separated list in production, e.g.:
#   ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.com
# Defaults to allowing localhost for local development.
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


# ─── Schemas ──────────────────────────────────────────────────────────────────
class StudentData(BaseModel):
    age:                     int   = Field(..., ge=10, le=100)
    gender:                  Literal['Male', 'Female']
    country:                 str
    academic_level:          Literal['Undergraduate', 'Graduate', 'High School']
    most_used_platform:      Literal[
                                 'Facebook', 'LinkedIn', 'Instagram', 'Snapchat',
                                 'Twitter', 'YouTube', 'TikTok', 'LINE',
                                 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat',
                             ]
    purpose_of_use:          Literal['Networking', 'Education', 'Entertainment', 'News']
    avg_daily_usage_hours:   float = Field(..., ge=0, le=24)
    daily_unlocks:           int   = Field(..., ge=0)
    study_hours:             float = Field(..., ge=0, le=24)
    physical_activity_hours: float = Field(..., ge=0, le=24)
    sleep_hours_per_night:   float = Field(..., ge=0, le=24)
    stress_level:            Literal['Medium', 'Low', 'Very High', 'High']


class PredictionResponse(BaseModel):
    predicted_mental_health_score: float


# ─── Routes ───────────────────────────────────────────────────────────────────
@app.get('/', tags=['Health'])
def health_check():
    return {"status": "ok", "message": "MindMetric AI backend is running."}


@app.post('/predict', response_model=PredictionResponse, tags=['Prediction'])
def predict(data: StudentData):
    country_group = data.country if data.country in TOP_COUNTRIES else "Other"

    input_row = pd.DataFrame([{
        'Age':                    data.age,
        'Gender':                 data.gender,
        'Country':                data.country,
        'Academic_Level':         data.academic_level,
        'Most_Used_Platform':     data.most_used_platform,
        'Purpose_Of_Use':         data.purpose_of_use,
        'Avg_Daily_Usage_Hours':  data.avg_daily_usage_hours,
        'Daily_Unlocks':          data.daily_unlocks,
        'Study_Hours':            data.study_hours,
        'Physical_Activity_Hours': data.physical_activity_hours,
        'Sleep_Hours_Per_Night':  data.sleep_hours_per_night,
        'Stress_Level':           data.stress_level,
        'Grouped_Country':        country_group,
    }])

    prediction = model.predict(input_row)[0]
    return PredictionResponse(predicted_mental_health_score=round(float(prediction), 2))