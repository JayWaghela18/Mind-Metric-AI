import { motion } from 'framer-motion';

const LoadingState = ({ message = 'Loading...' }) => {
  const messages = [
    'Analyzing your responses...',
    'Processing data...',
    'Running ML prediction...',
    'Calculating your score...',
  ];

  const displayMessage = message || messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-6">
        <motion.div
          className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <motion.p
        className="text-slate-600 font-medium text-lg text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {displayMessage}
      </motion.p>
    </div>
  );
};

export default LoadingState;
