const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">MindMetric AI</h3>
            <p className="footer-text">AI-powered Student Mental Health Score Prediction</p>
            <p className="footer-text small">Educational ML Project</p>
          </div>

          <div>
            <h4 className="footer-heading">Overview</h4>
            <ul className="footer-links">
              <li>Assessment</li>
              <li>Insights</li>
              <li>Wellness profile</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Important</h4>
            <p className="footer-text small">Not a medical diagnosis.</p>
            <p className="footer-text small">© 2026 MindMetric AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
