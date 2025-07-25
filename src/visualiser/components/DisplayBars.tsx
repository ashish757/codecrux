import React from 'react';
import './DisplayBars.css';

interface Props {
  array: number[];
  low?: number;
  mid?: number;
  high?: number; 
  foundIndex?: number | null;
  sortedIndices?: number[];
  currentBarPair?: [number, number] | null;
  swappingPair?: [number, number] | null;
  pivotIndex?: number | null;
  partitionRange?: [number, number] | null;
  sortedInPartition?: number[];
}

const BinarySearchVisualizer: React.FC<Props> = (props :Props) => {

  return (
    <div className="container">

      <div className="bar-container">

        {props.array.map((value, index) => {
          let className = '';
          const barHeight = value*2; // Default to 0 if height is not defined

          if (index === props?.mid) className += ' mid';
          else if (index === props?.low) className += ' low';
          else if (index === props?.high) className += ' high';
          if (index === props?.foundIndex) className += ' found';
          if (props.sortedIndices?.includes(index)) className += ' sorted';
          if (props.currentBarPair?.includes(index)) className += ' current';
          
          // Handle swapping animation
          if (props.swappingPair?.includes(index)) {
            className += ' swapping';
            const [leftIndex, rightIndex] = props.swappingPair;
            if (index === leftIndex) {
              className += ' swap-right';
            } else if (index === rightIndex) {
              className += ' swap-left';
            }
          }

          // Highlight pivot and partition range for QuickSort
          if (index === props?.pivotIndex) className += ' pivot';
          if (props.partitionRange && index >= props.partitionRange[0] && index <= props.partitionRange[1]) {
            className += ' in-partition';
          }

          // Highlight sorted indices in the current partition
          if (props.sortedInPartition?.includes(index)) {
            className += ' sorted-in-partition';
          }

          return (
            <div
              key={index}
              className={`bar ${className}`}
              style={{ 
                height: `${barHeight}px`
              }}
              title={value.toString()}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
