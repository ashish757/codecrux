import React from 'react';
import BubbleSortVisualizer from '../visualiser/BubbleSort';
import Navbar from '../components/Navbar';

const BubbleSortPage: React.FC = () => {
  return (
    <div>
      <Navbar showBackToVisualizer={true} />
      
      <div className="page-content">
        <div className="algorithm-info algorithm-info-bubble">
          <h2>Bubble Sort Algorithm</h2>
          <p>
            A simple sorting algorithm that repeatedly steps through the list and swaps adjacent elements. Time complexity: O(n²)
          </p>
        </div>
        
        <BubbleSortVisualizer />
      </div>
    </div>
  );
};

export default BubbleSortPage;
