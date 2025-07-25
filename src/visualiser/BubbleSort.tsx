import React, { useEffect, useState, useRef } from 'react';
import DisplayBars from './components/DisplayBars.tsx';
import { bubbleSort } from './algorithms/bubbleSort.ts';
import Controls from './components/Controls.tsx';
import Legend from './components/Legend.tsx';
import { bubbleSortLegend } from '../util/colors.ts';
import { generateRandomArray } from '../util/helperFunctions.ts';

const BubbleSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentBarPair, setcurrentBarPair] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [swappingPair, setSwappingPair] = useState<[number, number] | null>(null);
  const [speed, setSpeed] = useState<number>(1); // Speed control from 1x to 6x
  const speedRef = useRef<number>(1); // Speed reference for real-time updates

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef<{ value: boolean }>({ value: false }); // Use object similar to BinarySearch
  const isTerminatedRef = useRef<{ value: boolean }>({ value: true }); // Track termination state
  const [isTerminated, setIsTerminated] = useState<boolean>(true); // UI state for termination


  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    isPausedRef.current.value = isPaused; // Reset pause state
  }, [isPaused]);

  useEffect(() => {
    isTerminatedRef.current.value = isTerminated;
  }, [isTerminated]);

  useEffect(() => {
    speedRef.current = speed; // Update speed reference when speed changes
  }, [speed]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
    isPausedRef.current.value = !isPausedRef.current.value; // Toggle pause state
  };

  const generateArray = () => {
    const newArray = generateRandomArray(30, false, 10, 100);
    setArray(newArray);
    setcurrentBarPair(null);
    setSortedIndices([]);
    setSwappingPair(null);
  };

  const runBubbleSort = async () => {
    setIsTerminated(false);
    isTerminatedRef.current.value = false; // Set the termination state to false
    
    // Callback is executed when the sort is terminated or completed
    const callBack = (completed: boolean) => {
      if (completed) {
        setIsTerminated(true);
        setSwappingPair(null);
        setIsPaused(false);
        return;
      }

      setIsTerminated(true);
      setcurrentBarPair(null);
      setSwappingPair(null);
      setSortedIndices([]);
      setIsPaused(false);

    };
    
    await bubbleSort({
      array,
      setArray,
      setSortedIndices,
      setcurrentBarPair,
      setSwappingPair,
      isPausedRef,
      isTerminatedRef,
      callBack,
      speedRef
    });
  };


  return (
    <section>
      <div className="container">

        <Controls
          terminate={setIsTerminated}
          start={runBubbleSort}
          isTerminated={isTerminated}
          isPaused={isPaused}
          flowControls={{ togglePause }}
          generateArray={generateArray}
          size={15}
          speed={speed}
          onSpeedChange={setSpeed}
        />

        <Legend items={bubbleSortLegend} />

        <DisplayBars
          array={array}
          currentBarPair={currentBarPair}
          sortedIndices={sortedIndices}
          swappingPair={swappingPair}
        />

      </div>
    </section>
  );
};

export default BubbleSortVisualizer;
