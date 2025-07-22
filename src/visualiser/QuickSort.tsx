import React, { useEffect, useState, useRef } from 'react';
import DisplayBars from './components/DisplayBars.tsx';
import { quickSort } from './algorithms/quickSort.ts';
import Controls from './components/Controls.tsx';

const QuickSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentBarPair, setCurrentBarPair] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [swappingPair, setSwappingPair] = useState<[number, number] | null>(null);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [partitionRange, setPartitionRange] = useState<[number, number] | null>(null);
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
    setCurrentBarPair(null);
    setSwappingPair(null);
    setPivotIndex(null);
    setPartitionRange(null);
    setIsPaused(false);
    isPausedRef.current.value = false; // Reset pause state
    setIsTerminated(true);
    isTerminatedRef.current.value = true; // Reset termination state
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    isPausedRef.current.value = !isPausedRef.current.value; // Toggle pause state
  };

  const runQuickSort = async () => {
    setIsTerminated(false);
    isTerminatedRef.current.value = false; // Set the termination state to false

    // Callback is executed when the sort is terminated or completed
    const callBack = (completed: boolean) => {
      if (completed) {
        setIsTerminated(true);
        setSwappingPair(null);
        setPivotIndex(null);
        setPartitionRange(null);
        setCurrentBarPair(null);
        setIsPaused(false);
        return;
      }

      setIsTerminated(true);
      setCurrentBarPair(null);
      setSwappingPair(null);
      setPivotIndex(null);
      setPartitionRange(null);
      setSortedIndices([]);
      setIsPaused(false);
    };

    await quickSort({
      array,
      setArray,
      setSortedIndices,
      setCurrentBarPair,
      setSwappingPair,
      setPivotIndex,
      setPartitionRange,
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
          start={runQuickSort}
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
          swappingPair={swappingPair}
          pivotIndex={pivotIndex}
          partitionRange={partitionRange}
        />
      </div>
    </section>
  );
};

export default QuickSortVisualizer;
