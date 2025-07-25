import React from 'react';
import MergeSortVisualizer from '../visualiser/MergeSort';
import Navbar from '../components/Navbar';

const MergeSortPage: React.FC = () => {
  return (
    <div>
      <Navbar showBackToVisualizer={true} />

      <div className="page-content" style={{paddingBottom: '3rem'}}>
        <div className="algorithm-info algorithm-info-merge" >
          <h1 className='heading'>Merge Sort Algorithm</h1>
          <p className='description'>
            A stable divide-and-conquer sorting algorithm that divides the array into halves, sorts them recursively, and merges them back in sorted order. Time complexity: O(n log n) in all cases.
          </p>
        </div>

        <MergeSortVisualizer />
      </div>
    </div>
  );
};

export default MergeSortPage;
