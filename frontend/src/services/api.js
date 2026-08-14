// Base URL is set via .env  →  VITE_API_URL=https://your-backend.com
// Falls back to the local FastAPI dev server if the variable is absent.
const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

/**
 * Predict a mental-health score from the provided assessment data.
 * @param {Object} assessmentData  – matches the FastAPI StudentData schema
 * @returns {Promise<{ predicted_mental_health_score: number }>}
 */
export const predictMentalHealth = async (assessmentData) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000); // 15 s timeout

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assessmentData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let detail = `HTTP ${response.status}`;
      try {
        const err = await response.json();
        detail = err.detail || JSON.stringify(err);
      } catch (_) { /* ignore JSON parse errors */ }
      throw new Error(detail);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check the backend is running and try again.');
    }

    throw new Error(
      err.message || 'Failed to connect to the backend. Please ensure the FastAPI server is running.'
    );
  }
};
