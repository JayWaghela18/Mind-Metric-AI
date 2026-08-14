import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Gauge, Sparkles, Users, Zap } from 'lucide-react';
import Nova from '../components/Nova';

const features = [
  {
    icon: Brain,
    title: 'ML Prediction',
    text: 'Generate a machine-learning based score from the provided information.',
  },
  {
    icon: Users,
    title: 'Digital Habits',
    text: 'Analyze reported social-media usage patterns.',
  },
  {
    icon: BookOpen,
    title: 'Academic Lifestyle',
    text: 'Consider study and academic information.',
  },
  {
    icon: Gauge,
    title: 'Wellness Factors',
    text: 'Consider sleep, physical activity and stress.',
  },
];

const pipeline = [
  { label: 'User Input', icon: '✍️' },
  { label: 'Data Validation', icon: '✅' },
  { label: 'Feature Processing', icon: '⚙️' },
  { label: 'ML Model', icon: '🧠' },
  { label: 'Predicted Score', icon: '📊' },
  { label: 'Wellness Insights', icon: '💡' },
];

const Home = () => {
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-grid">
            <div>
              <div className="badge-pill">
                <Sparkles size={14} />
                AI-powered Student Mental Health Score Prediction
              </div>

              <h1 className="hero-title">
                Understand Your <br /> Mental Health Score
              </h1>

              <p className="hero-subtitle">
                An ML-powered assessment that analyzes lifestyle, academic and social-media patterns to generate an estimated mental health score.
              </p>

              <div className="hero-actions">
                <Link to="/assessment" className="btn-primary">
                  Start Assessment <ArrowRight size={16} />
                </Link>
                <a href="#how-it-works" className="btn-secondary">
                  How It Works
                </a>
              </div>

              <div className="disclaimer-box">
                Educational ML assessment — not a medical diagnosis.
              </div>
            </div>

            <div className="flex justify-center">
              <Nova state="landing" avatar="bunty1" />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-head">Features</h2>
        </motion.div>

        <motion.div
          className="feature-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {features.map(({ icon: Icon, title, text }) => (
            <motion.div key={title} className="feature-card" variants={item}>
              <div className="feature-icon"><Icon size={22} /></div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-text">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-head">How It Works</h2>
          <p className="subtle-copy">This application sends the assessment data to the FastAPI backend, which generates the prediction using the trained ML model.</p>
        </motion.div>

        <div className="pipeline-grid">
          {pipeline.map((step, index) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="pipeline-step">
                <div className="icon-wrap">{step.icon}</div>
                <strong>{step.label}</strong>
              </div>
              {index < pipeline.length - 1 && <div className="pipeline-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-28">
        <div className="glass-panel card" style={{ padding: '1.8rem' }}>
          <div className="hero-grid">
            <div>
              <h3 className="section-head" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>MindMetric AI</h3>
              <p className="subtle-copy" style={{ lineHeight: 1.8 }}>
                MindMetric AI is an educational machine-learning project for estimating a mental health score from user-provided lifestyle, academic, social media and stress-related inputs.
              </p>
              <p className="subtle-copy" style={{ marginTop: '1rem', lineHeight: 1.8 }}>
                It is designed for project demonstration and learning, not medical diagnosis.
              </p>
            </div>
            <div className="flex justify-center">
              <Nova state="encouraging" compact avatar="bunty2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
