import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  title?: string;
  showBackToVisualizer?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title = "CodeCrux", 
  showBackToVisualizer = false 
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          🏠 Home
        </Link>
        {showBackToVisualizer && (
          <Link to="/visualiser" className="navbar-link">
            ← Back to Visualizer
          </Link>
        )}
      </div>
      <h1 className="navbar-title">
        {title}
      </h1>
    </nav>
  );
};

export default Navbar;
