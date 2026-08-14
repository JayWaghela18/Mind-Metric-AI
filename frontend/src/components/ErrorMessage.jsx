import { AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-4"
    >
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Error</h3>
        <p className="text-red-700 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-900 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
