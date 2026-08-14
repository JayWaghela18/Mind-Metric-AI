const API_URL = import.meta.env.VITE_API_URL;

export const predictMentalHealth = async (assessmentData) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || 'Failed to connect to the backend. Please ensure the FastAPI server is running.'
    );
  }
};
