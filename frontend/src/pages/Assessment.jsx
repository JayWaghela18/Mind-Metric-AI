import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FormInput,
  SelectInput,
  RangeInput,
  ButtonGroup,
  ProgressBar,
  LoadingState,
  ErrorMessage,
} from '../components';
import { predictMentalHealth } from '../services/api';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    country: '',
    academic_level: '',
    most_used_platform: '',
    purpose_of_use: '',
    avg_daily_usage_hours: '',
    daily_unlocks: '',
    study_hours: '',
    physical_activity_hours: '',
    sleep_hours_per_night: '',
    stress_level: '',
  });

  const [errors, setErrors] = useState({});

  const platforms = [
    'Facebook',
    'LinkedIn',
    'Instagram',
    'Snapchat',
    'Twitter',
    'YouTube',
    'TikTok',
    'LINE',
    'KakaoTalk',
    'VKontakte',
    'WhatsApp',
    'WeChat',
  ];

  const purposes = ['Networking', 'Education', 'Entertainment', 'News'];
  const academicLevels = ['Undergraduate', 'Graduate', 'High School'];
  const genders = ['Male', 'Female'];
  const stressLevels = ['Low', 'Medium', 'High', 'Very High'];
  const countries = ['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other'];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.age || formData.age < 10 || formData.age > 100) {
        newErrors.age = 'Age must be between 10 and 100';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.academic_level) newErrors.academic_level = 'Academic level is required';
    }

    if (step === 2) {
      if (!formData.most_used_platform) newErrors.most_used_platform = 'Platform is required';
      if (!formData.purpose_of_use) newErrors.purpose_of_use = 'Purpose is required';
      if (!formData.avg_daily_usage_hours || formData.avg_daily_usage_hours < 0 || formData.avg_daily_usage_hours > 24) {
        newErrors.avg_daily_usage_hours = 'Usage hours must be between 0 and 24';
      }
      if (formData.daily_unlocks === '' || formData.daily_unlocks < 0) {
        newErrors.daily_unlocks = 'Daily unlocks must be 0 or greater';
      }
    }

    if (step === 3) {
      if (formData.study_hours === '' || formData.study_hours < 0 || formData.study_hours > 24) {
        newErrors.study_hours = 'Study hours must be between 0 and 24';
      }
      if (formData.physical_activity_hours === '' || formData.physical_activity_hours < 0 || formData.physical_activity_hours > 24) {
        newErrors.physical_activity_hours = 'Physical activity hours must be between 0 and 24';
      }
      if (formData.sleep_hours_per_night === '' || formData.sleep_hours_per_night < 0 || formData.sleep_hours_per_night > 24) {
        newErrors.sleep_hours_per_night = 'Sleep hours must be between 0 and 24';
      }
    }

    if (step === 4) {
      if (!formData.stress_level) newErrors.stress_level = 'Stress level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError('');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setIsLoading(true);
    setError('');

    try {
      // Convert string values to appropriate types
      const payload = {
        age: parseInt(formData.age),
        gender: formData.gender,
        country: formData.country,
        academic_level: formData.academic_level,
        most_used_platform: formData.most_used_platform,
        purpose_of_use: formData.purpose_of_use,
        avg_daily_usage_hours: parseFloat(formData.avg_daily_usage_hours),
        daily_unlocks: parseInt(formData.daily_unlocks),
        study_hours: parseFloat(formData.study_hours),
        physical_activity_hours: parseFloat(formData.physical_activity_hours),
        sleep_hours_per_night: parseFloat(formData.sleep_hours_per_night),
        stress_level: formData.stress_level,
      };

      const response = await predictMentalHealth(payload);

      // Navigate to results with the score and original form data
      navigate('/results', {
        state: {
          score: response.predicted_mental_health_score,
          formData: payload,
        },
      });
    } catch (err) {
      setError(
        err.message || 'Failed to predict score. Please ensure the backend is running at http://127.0.0.1:8000'
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card">
            <ProgressBar currentStep={currentStep} totalSteps={4} />

            {error && (
              <ErrorMessage
                message={error}
                onDismiss={() => setError('')}
              />
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: About You */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">About You</h2>
                    <p className="text-slate-600">Let's start with some basic information.</p>
                  </div>

                  <FormInput
                    label="Age"
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="10"
                    max="100"
                    error={errors.age}
                    required
                  />

                  <SelectInput
                    label="Gender"
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange({ target: { name: 'gender', value: e.target.value } })}
                    options={genders}
                    error={errors.gender}
                    required
                  />

                  <SelectInput
                    label="Country"
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange({ target: { name: 'country', value: e.target.value } })}
                    options={countries}
                    error={errors.country}
                    required
                  />

                  <SelectInput
                    label="Academic Level"
                    id="academic_level"
                    value={formData.academic_level}
                    onChange={(e) => handleInputChange({ target: { name: 'academic_level', value: e.target.value } })}
                    options={academicLevels}
                    error={errors.academic_level}
                    required
                  />
                </motion.div>
              )}

              {/* Step 2: Social Media */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Social Media</h2>
                    <p className="text-slate-600">Tell us about your social media habits.</p>
                  </div>

                  <SelectInput
                    label="Most Used Platform"
                    id="most_used_platform"
                    value={formData.most_used_platform}
                    onChange={(e) => handleInputChange({ target: { name: 'most_used_platform', value: e.target.value } })}
                    options={platforms}
                    error={errors.most_used_platform}
                    required
                  />

                  <SelectInput
                    label="Purpose of Use"
                    id="purpose_of_use"
                    value={formData.purpose_of_use}
                    onChange={(e) => handleInputChange({ target: { name: 'purpose_of_use', value: e.target.value } })}
                    options={purposes}
                    error={errors.purpose_of_use}
                    required
                  />

                  <RangeInput
                    label="Average Daily Usage Hours"
                    id="avg_daily_usage_hours"
                    value={formData.avg_daily_usage_hours}
                    onChange={(e) => handleInputChange({ target: { name: 'avg_daily_usage_hours', value: e.target.value } })}
                    min="0"
                    max="24"
                    step="0.5"
                    unit="hours"
                    error={errors.avg_daily_usage_hours}
                    required
                  />

                  <FormInput
                    label="Daily Unlocks"
                    id="daily_unlocks"
                    type="number"
                    value={formData.daily_unlocks}
                    onChange={handleInputChange}
                    min="0"
                    error={errors.daily_unlocks}
                    required
                  />
                </motion.div>
              )}

              {/* Step 3: Lifestyle */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Lifestyle</h2>
                    <p className="text-slate-600">Share your daily habits and routines.</p>
                  </div>

                  <RangeInput
                    label="Study Hours"
                    id="study_hours"
                    value={formData.study_hours}
                    onChange={(e) => handleInputChange({ target: { name: 'study_hours', value: e.target.value } })}
                    min="0"
                    max="24"
                    step="0.5"
                    unit="hours"
                    error={errors.study_hours}
                    required
                  />

                  <RangeInput
                    label="Physical Activity Hours"
                    id="physical_activity_hours"
                    value={formData.physical_activity_hours}
                    onChange={(e) => handleInputChange({ target: { name: 'physical_activity_hours', value: e.target.value } })}
                    min="0"
                    max="24"
                    step="0.5"
                    unit="hours"
                    error={errors.physical_activity_hours}
                    required
                  />

                  <RangeInput
                    label="Sleep Hours Per Night"
                    id="sleep_hours_per_night"
                    value={formData.sleep_hours_per_night}
                    onChange={(e) => handleInputChange({ target: { name: 'sleep_hours_per_night', value: e.target.value } })}
                    min="0"
                    max="24"
                    step="0.5"
                    unit="hours"
                    error={errors.sleep_hours_per_night}
                    required
                  />
                </motion.div>
              )}

              {/* Step 4: Stress */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Stress Level</h2>
                    <p className="text-slate-600">How would you describe your current stress level?</p>
                  </div>

                  <ButtonGroup
                    label="Stress Level"
                    value={formData.stress_level}
                    onChange={(value) => handleInputChange({ target: { name: 'stress_level', value } })}
                    options={stressLevels}
                    error={errors.stress_level}
                    required
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-900">
                      ⚠️ <strong>Disclaimer:</strong> This assessment provides educational insights based on ML modeling. Please consult a healthcare professional for medical concerns.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex-1"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Predicting...' : 'Predict My Score'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment;
