import { motion } from 'framer-motion';
import bunty1 from '../assets/bunty1.png';
import bunty2 from '../assets/bunty2.png';
import bunty3 from '../assets/bunty3.png';

const AVATAR_MAP = {
  bunty1,
  bunty2,
  bunty3,
};

const Nova = ({ state = 'landing', message = '', compact = false, avatar = 'bunty1' }) => {
  const selectedAvatar = AVATAR_MAP[avatar] || bunty1;

  const bubbleText = message || {
    landing: "Hi! I'm Nova 👋\nLet's understand your daily patterns.",
    thinking: 'Take your time 💙',
    loading: 'Analyzing your responses...',
    results: 'Your results are ready! 💙',
    encouraging: 'You are doing great. Keep going.',
    error: "Oops! I couldn't connect.",
  }[state];

  const isBubbleShown = message || ['landing', 'thinking', 'loading', 'results', 'encouraging', 'error'].includes(state);

  return (
    <div className={`nova-wrap ${compact ? 'nova-compact' : ''}`} aria-label="Nova avatar">
      {isBubbleShown && (
        <motion.div
          className="nova-bubble"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {bubbleText.split('\n').map((line, index) => (
            <span key={index} className="nova-bubble-line">{line}</span>
          ))}
        </motion.div>
      )}

      <motion.div
        className="nova-scene"
        animate={
          state === 'landing'
            ? { y: [0, -10, 0], rotate: [0, 2, 0] }
            : state === 'loading'
              ? { rotate: [0, 2, -2, 0] }
              : state === 'results'
                ? { y: [0, -8, 0] }
                : state === 'error'
                  ? { y: [0, 4, 0] }
                  : { y: [0, -6, 0] }
        }
        transition={{
          duration: state === 'loading' ? 2.2 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="nova-aura" aria-hidden="true" />
        <div className="nova-orbit nova-orbit-one" aria-hidden="true" />
        <div className="nova-orbit nova-orbit-two" aria-hidden="true" />
        <div className="nova-spark nova-spark-one" aria-hidden="true" />
        <div className="nova-spark nova-spark-two" aria-hidden="true" />
        <div className="nova-spark nova-spark-three" aria-hidden="true" />
        <div className="nova-avatar">
          <div className="nova-image-frame">
            <img className="nova-image" src={selectedAvatar} alt="Nova assistant avatar" />
          </div>
          <div className="nova-shadow" />
        </div>
      </motion.div>
    </div>
  );
};

export default Nova;
