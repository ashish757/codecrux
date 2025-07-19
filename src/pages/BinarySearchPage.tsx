import React from 'react';
import BinarySearch from '../visualiser/BinarySearch';
import Navbar from '../components/Navbar';

const BinarySearchPage: React.FC = () => {
  return (
    <div>
      <Navbar showBackToVisualizer={true} />
      
      <div className="page-content">
        <div className="algorithm-info algorithm-info-binary">
          <h2>Binary Search Algorithm</h2>
          <p>
            Efficiently search through sorted arrays using divide and conquer. Time complexity: O(log n)
          </p>
        </div>
        
        <BinarySearch />
      </div>
    </div>
  );
};

export default BinarySearchPage;
