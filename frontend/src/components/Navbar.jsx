import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Assessment', path: '/assessment' },
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'About', path: '/#about' },
];

const Navbar = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return false;
    }
    return location.pathname === path;
  };

  return (
    <nav className="topbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="brand-mark">
            <div className="brand-icon"><Brain size={18} /></div>
            <span>MindMetric AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <button
              className="md:hidden nav-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
