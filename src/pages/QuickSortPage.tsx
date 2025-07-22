import React from 'react';
import QuickSortVisualizer from '../visualiser/QuickSort';
import Navbar from '../components/Navbar';

const QuickSortPage: React.FC = () => {
  return (
    <div>
      <Navbar showBackToVisualizer={true} />

      <div className="page-content">
        <div className="algorithm-info algorithm-info-quick">
          <h1 className='heading'>Quick Sort Algorithm</h1>
          <p className='description'>
            A divide-and-conquer sorting algorithm that picks a pivot element and partitions the array around it. Time complexity: O(n log n) average, O(n²) worst case.
          </p>
        </div>

        <QuickSortVisualizer />
      </div>
    </div>
  );
};

export default QuickSortPage;
