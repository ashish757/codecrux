import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Welcome to CodeCrux
      </h1>
      
      <p className="home-description">
        Your interactive platform for learning and visualizing algorithms. 
        Explore different sorting algorithms and see how they work step by step.
      </p>
      
      <div className="home-buttons">
        <Link to="/visualiser" className="home-button-primary">
          🔍 Algorithm Visualizer
        </Link>
        
        <button className="home-button-secondary">
          📚 Learn More
        </button>
      </div>
      
      <div className="featured-section">
        <h3>Featured Algorithms</h3>
        <div className="featured-algorithms">
          <div className="algorithm-tag">
            Bubble Sort
          </div>
          <div className="algorithm-tag">
            Binary Search
          </div>
          <div className="algorithm-tag">
            Quick Sort
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
