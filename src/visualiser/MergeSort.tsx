import React, { useEffect, useState, useRef } from 'react';
import DisplayBars from './components/DisplayBars.tsx';
import { mergeSort } from './algorithms/mergeSort.ts';
import Controls from './components/Controls.tsx';
import Legend from './components/Legend.tsx';
import { mergeSortLegend } from '../util/colors.ts';
import { generateRandomArray } from '../util/helperFunctions.ts';

const MergeSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentBarPair, setCurrentBarPair] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [mergingPair, setMergingPair] = useState<[number, number] | null>(null);
  const [mergeRange, setMergeRange] = useState<[number, number] | null>(null);
  // bs
  const [leftSubarray, setLeftSubarray] = useState<number[] | null>(null);
  const [rightSubarray, setRightSubarray] = useState<number[] | null>(null);

  const [speed, setSpeed] = useState<number>(1);
  const speedRef = useRef<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef<{ value: boolean }>({ value: false });
  const isTerminatedRef = useRef<{ value: boolean }>({ value: true });
  const [isTerminated, setIsTerminated] = useState<boolean>(true);
  // const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    isPausedRef.current.value = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (isTerminated) {
        setIsPaused(false);
        isPausedRef.current.value = false;
        setCurrentBarPair(null);
        setMergingPair(null);
        setMergeRange(null);
        setLeftSubarray(null);
        setRightSubarray(null);
        setSortedIndices([]);
    }
    isTerminatedRef.current.value = isTerminated;
  }, [isTerminated]);

  const generateArray = () => {
    const newArray = generateRandomArray(30, false, 1, 100);
    setArray(newArray);
    setSortedIndices([]);
    setCurrentBarPair(null);
    setMergingPair(null);
    setMergeRange(null);
    setLeftSubarray(null);
    setRightSubarray(null);
  };

  const startSorting = async () => {
    setIsTerminated(false);
    isTerminatedRef.current.value = false;
    setSortedIndices([]);
    setCurrentBarPair(null);
    setMergingPair(null);
    setMergeRange(null);
    setLeftSubarray(null);
    setRightSubarray(null);

    const callBack = (completed: boolean) => {
      if (completed) {
        setIsTerminated(true);
        isTerminatedRef.current.value = true;
      }
    }

    await mergeSort({
      array,
      setArray,
      setSortedIndices,
      setCurrentBarPair,
      setMergingPair,
      setMergeRange,
      setLeftSubarray,
      setRightSubarray,
      isPausedRef,
      isTerminatedRef,
      callBack,
      speedRef
    });
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    isPausedRef.current.value = !isPaused;
  };
  //
  // const terminateSort = () => {
  //   setIsTerminated(true);
  //   isTerminatedRef.current.value = true;
  //   setIsPaused(false);
  //   isPausedRef.current.value = false;
  //   setCurrentBarPair(null);
  //   setMergingPair(null);
  //   setMergeRange(null);
  //   setLeftSubarray(null);
  //   setRightSubarray(null);
  // };

  return (
    <div className="container merge-sort-visualizer">
      <div className="merge-sort-content">
          <Controls
              start={startSorting}
              generateArray={generateArray}
              size={30}
              flowControls={{
                  togglePause
              }}
              isPaused={isPaused}
              terminate={setIsTerminated}
              isTerminated={isTerminated}
              speed={speed}
              onSpeedChange={setSpeed}
          />

          <Legend items={mergeSortLegend} title="Merge Sort Legend" />

          {(leftSubarray || rightSubarray) && (
              <div className="subarrays-display">
                  {leftSubarray && (
                      <div className="subarray left-subarray">
                          <h4>Left Subarray</h4>
                          <div className="subarray-values">
                              {leftSubarray.map((value, index) => (
                                  <span key={index} className="subarray-value">{value}, </span>
                              ))}
                          </div>
                      </div>
                  )}
                  {rightSubarray && (
                      <div className="subarray right-subarray">
                          <h4>Right Subarray</h4>
                          <div className="subarray-values">
                              {rightSubarray.map((value, index) => (
                                  <span key={index} className="subarray-value">{value}, </span>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}

        <DisplayBars
          array={array}
          sortedIndices={sortedIndices}
          currentBarPair={currentBarPair}
          swappingPair={mergingPair}
          range={mergeRange}
          // barsRef={barsRef}
        />

      </div>
    </div>
  );
};

export default MergeSortVisualizer;
