import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home, Assessment, Results } from './pages';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('mindmetric-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mindmetric-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-shell">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
