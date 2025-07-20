import React, { useEffect, useState, useRef } from 'react';
import DisplayBars from './components/DisplayBars.tsx';
import { bubbleSort } from './algorithms/bubbleSort.ts';
import Controls from './components/Controls.tsx';

const BubbleSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentBarPair, setcurrentBarPair] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(1); // Speed control from 1x to 6x
  const speedRef = useRef<number>(1); // Speed reference for real-time updates

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef<{ value: boolean }>({ value: false }); // Use object similar to BinarySearch
  const isTerminatedRef = useRef<{ value: boolean }>({ value: true }); // Track termination state
  const [isTerminated, setIsTerminated] = useState<boolean>(true); // UI state for termination


  useEffect(() => {
    generateRandomArray();
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

  const generateRandomArray = () => {
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(arr);
    setSortedIndices([]);
    setcurrentBarPair(null);
    setIsPaused(false);
    isPausedRef.current.value = false; // Reset pause state
    setIsTerminated(true);
    isTerminatedRef.current.value = true; // Reset termination state
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    isPausedRef.current.value = !isPausedRef.current.value; // Toggle pause state
  };

  const runBubbleSort = async () => {
    setIsTerminated(false);
    isTerminatedRef.current.value = false; // Set the termination state to false
    
    // Callback is executed when the sort is terminated or completed
    const callBack = (completed: boolean) => {
      if (completed) {
        setIsTerminated(true);
        // setcurrentBarPair(null);
        // setSortedIndices([]);
        setIsPaused(false);
        return;
      }

      setIsTerminated(true);
      setcurrentBarPair(null);
      setSortedIndices([]);
      setIsPaused(false);

    };
    
    await bubbleSort({
      array,
      setArray,
      setSortedIndices,
      setcurrentBarPair,
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
          generateArray={generateRandomArray}
          size={15}
          speed={speed}
          onSpeedChange={setSpeed}
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
