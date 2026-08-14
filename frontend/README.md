# MindScore AI - Frontend

A modern React + Vite frontend for the ML-based Mental Health Score Prediction application.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Make sure the `VITE_API_URL` points to your FastAPI backend:
```
VITE_API_URL=http://127.0.0.1:8000
```

4. Start the development server:
```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FormInput.jsx
│   │   ├── SelectInput.jsx
│   │   ├── RangeInput.jsx
│   │   ├── ButtonGroup.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── index.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Assessment.jsx # Multi-step assessment form
│   │   ├── Results.jsx    # Results page with visualization
│   │   └── index.js
│   ├── services/
│   │   └── api.js         # API communication with backend
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS & custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                   # Environment variables (local)
├── .env.example           # Environment template
└── README.md
```

## 🎨 Features

- **Landing Page**: Attractive hero section with feature highlights
- **Multi-Step Assessment**: 4-step form with progress tracking
  - Step 1: Personal Information
  - Step 2: Social Media Usage
  - Step 3: Lifestyle Habits
  - Step 4: Stress Level
- **Validation**: Real-time form validation with friendly error messages
- **Results Page**: Beautiful visualization of predicted score with detailed summary
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Modern UI**: Tailwind CSS styling with consistent design system

## 🔧 Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Dependencies

- **React**: UI framework
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Recharts**: Chart and visualization library

## ⚙️ Backend Configuration

The frontend communicates with the FastAPI backend at:
- **Default**: `http://127.0.0.1:8000`
- **API Endpoint**: `POST /predict`

Ensure the backend server is running before using the assessment feature.

## 🎯 API Integration

The `api.js` service handles all backend communication:

```javascript
import { predictMentalHealth } from './services/api';

const response = await predictMentalHealth({
  age: 20,
  gender: 'Male',
  country: 'USA',
  // ... other fields
});
```

## 🔒 Security Notes

- Environment variables are prefixed with `VITE_` (public in Vite)
- No sensitive credentials should be stored in the frontend
- The backend URL is not hardcoded in components
- All form data is validated before sending to the backend

## 📝 Notes

- This is an educational project built as a portfolio piece
- The ML model predictions are for educational purposes only
- Always refer to healthcare professionals for medical concerns

## 🤝 Contributing

Feel free to enhance the UI, add more visualizations, or improve the UX!

## 📄 License

This project is part of a school AI/ML course.
