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
}

const BinarySearchVisualizer: React.FC<Props> = (props :Props) => {

  return (
    <div className="container">

      <div className="bar-container">

        {props.array.map((value, index) => {
          let className = '';

          if (index === props?.mid) className += ' mid';
          else if (index === props?.low) className += ' low';
          else if (index === props?.high) className += ' high';
          if (index === props?.foundIndex) className += ' found';
          if (props.sortedIndices?.includes(index)) className += ' sorted';
          if (props.currentBarPair?.includes(index)) className += ' current';

          return (
            <div
              key={index}
              className={`bar ${className}`}
              style={{ height: `${value * 2}px` }}
              title={value.toString()}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
