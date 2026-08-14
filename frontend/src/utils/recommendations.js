export const getWellnessRecommendations = ({
  sleep_hours_per_night,
  physical_activity_hours,
  avg_daily_usage_hours,
  daily_unlocks,
  study_hours,
  stress_level,
}) => {
  const recommendations = [];

  if (sleep_hours_per_night !== undefined && sleep_hours_per_night < 7) {
    recommendations.push({
      icon: '😴',
      title: 'Sleep Routine',
      text: 'You reported a relatively low amount of sleep. Consider maintaining a consistent sleep schedule and creating a relaxing routine before bedtime.'
    });
  }

  if (physical_activity_hours !== undefined && physical_activity_hours < 1) {
    recommendations.push({
      icon: '🏃',
      title: 'Movement',
      text: 'Consider adding short walks, stretching, or other light physical activity to your daily routine.'
    });
  }

  if (avg_daily_usage_hours !== undefined && avg_daily_usage_hours > 4) {
    recommendations.push({
      icon: '📱',
      title: 'Digital Breaks',
      text: 'Consider taking short screen-free breaks throughout your day to help create balance with your digital routine.'
    });
  }

  if (study_hours !== undefined && study_hours > 6) {
    recommendations.push({
      icon: '📚',
      title: 'Study Balance',
      text: 'Consider adding short breaks during longer study sessions to maintain focus and reduce mental fatigue.'
    });
  }

  if (daily_unlocks !== undefined && daily_unlocks > 40) {
    recommendations.push({
      icon: '🔔',
      title: 'Digital Rhythm',
      text: 'A high number of app unlocks may suggest frequent interruptions. Consider setting intentional check-in times instead of constant checking.'
    });
  }

  if (stress_level === 'High' || stress_level === 'Very High') {
    recommendations.push({
      icon: '🧘',
      title: 'Stress Management',
      text: 'Consider taking regular breaks, practicing relaxation techniques, or talking with someone you trust when stress feels high.'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      icon: '💙',
      title: 'Wellness Check-In',
      text: 'Your responses suggest a fairly balanced routine. Keep paying attention to sleep, movement, and digital habits as part of your daily wellness.'
    });
  }

  return recommendations.slice(0, 4);
};
