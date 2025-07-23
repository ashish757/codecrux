import { sleep, getSpeedDelay } from '../../util/helperFunctions';

interface args {
  setArray: (arg0: number[]) => void;
  setSortedIndices: (arg0: number[]) => void;
  setSortedInPartition: (arg0: (arg0 : number[]) => number[]) => void;
  setCurrentBarPair: (arg0: [number, number] | null) => void;
  setSwappingPair: (arg0: [number, number] | null) => void;
  setPivotIndex: (arg0: number | null) => void;
  setPartitionRange: (arg0: [number, number] | null) => void;
  isPausedRef: { current: { value: boolean } };
  isTerminatedRef: { current: { value: boolean } };
  callBack: (arg0: boolean) => void;
  array: number[];
  speedRef: { current: number }; // Speed reference for real-time updates
}

export const quickSort = async ({
  array, 
  setArray,
  setSortedIndices,
  setSortedInPartition,
  setCurrentBarPair,
  setSwappingPair,
  setPivotIndex,
  setPartitionRange,
  isPausedRef,
  isTerminatedRef,
  callBack,
  speedRef
}: args) => {
  const arr = [...array];
  const sorted: number[] = [];

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    setPivotIndex(high);
    setPartitionRange([low, high]);

    await sleep(getSpeedDelay(speedRef.current));

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Check for termination
      if (isTerminatedRef.current.value) {
        return -1;
      }

      // Wait until not paused
      while (isPausedRef.current.value) {
        await sleep(100);
        if (isTerminatedRef.current.value) {
          return -1;
        }
      }
      setSortedInPartition((p: number[]) => [...p, i]);
       // Update sorted in partition
      setCurrentBarPair([j, high]);
      await sleep(getSpeedDelay(speedRef.current));

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          // Start swap animation
          setSwappingPair([i, j]);
          await sleep(getSpeedDelay(speedRef.current) / 2);

          // Perform the actual swap
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);

          // End swap animation
          setSwappingPair(null);
          await sleep(getSpeedDelay(speedRef.current) / 4);
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      setSwappingPair([i + 1, high]);
      await sleep(getSpeedDelay(speedRef.current) / 2);

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);

      setSwappingPair(null);
    }

    setCurrentBarPair(null);
    setPivotIndex(null);
    setPartitionRange(null);

    return i + 1;
  };

  const quickSortRecursive = async (low: number, high: number): Promise<void> => {
    if (low < high) {

      // Check for termination
      if (isTerminatedRef.current.value) {
        return;
      }

      const pi = await partition(low, high);

      if (pi === -1) return; // Termination occurred during partition

      // Mark pivot as sorted
      setSortedInPartition((_p: number[]) => []);
      sorted.push(pi);
      setSortedIndices([...sorted]);

      await sleep(getSpeedDelay(speedRef.current)); // note for later changes: reduce speed for next partition

      await quickSortRecursive(low, pi - 1);
      await quickSortRecursive(pi + 1, high);
    } else if (low === high) {
      // Single element is sorted
      sorted.push(low);
      setSortedIndices([...sorted]);
    }
  };

  try {
    await quickSortRecursive(0, arr.length - 1);

    // Mark all elements as sorted if completed successfully
    if (!isTerminatedRef.current.value) {
      const allIndices = Array.from({ length: arr.length }, (_, i) => i);
      setSortedIndices(allIndices);
      callBack(true);
    } else {
      callBack(false);
    }
  } catch (error) {
    callBack(false);
  }
};
