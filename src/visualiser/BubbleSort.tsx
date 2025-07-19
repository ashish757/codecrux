import React, { useEffect, useState, useRef } from 'react';
import './BubbleSortVisualizer.css';
import DisplayBars from './components/DisplayBars.tsx';
import { bubbleSort } from './algorithms/bubbleSort.ts';
import Controls from './controls.tsx';

const BubbleSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentBarPair, setcurrentBarPair] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [_, setIsSorting] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef<boolean>(false); // Use a ref to avoid re-rendering on pause state change

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused; // Reset pause state
  }, [isPaused]);

  const generateRandomArray = () => {
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(arr);
    setSortedIndices([]);
    setcurrentBarPair(null);
    setIsSorting(false);
    setIsPaused(() => false);
    isPausedRef.current = false; // Reset pause state
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    isPausedRef.current = !isPausedRef.current; // Toggle pause state
  };

  const runBubbleSort = async () => {
    await bubbleSort({
      array,
      setIsSorting,
      setArray,
      setSortedIndices,
      setcurrentBarPair,
      isPausedRef
    });
  };


  return (
    <section>
      <div className="container">

        <Controls
          onStart={runBubbleSort}
          generateArray={generateRandomArray}
          size={15}
          flowControls={{
            isPaused,
            togglePause
          }}
        />

        <DisplayBars
          array={array}
          currentBarPair={currentBarPair}
          sortedIndices={sortedIndices}
        />

      </div>
    </section>
  );
};

export default BubbleSortVisualizer;
