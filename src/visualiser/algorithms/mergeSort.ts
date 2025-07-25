import { sleep, getSpeedDelay } from '../../util/helperFunctions';

interface args {
  setArray: (arg0: number[]) => void;
  setSortedIndices: (arg0: number[]) => void;
  setCurrentBarPair: (arg0: [number, number] | null) => void;
  setMergingPair: (arg0: [number, number] | null) => void;
  setMergeRange: (arg0: [number, number] | null) => void;
  setLeftSubarray: (arg0: number[] | null) => void;
  setRightSubarray: (arg0: number[] | null) => void;
  isPausedRef: { current: { value: boolean } };
  isTerminatedRef: { current: { value: boolean } };
  callBack: (arg0: boolean) => void;
  array: number[];
  speedRef: { current: number };
}

export const mergeSort = async ({
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
}: args) => {
  const arr = [...array];
  const sorted: number[] = [];

  const merge = async (left: number, middle: number, right: number) => {
    const leftArr = arr.slice(left, middle + 1);
    const rightArr = arr.slice(middle + 1, right + 1);

    // Initialize temporary array visualization
    setMergeRange([left, right]);

    await sleep(getSpeedDelay(speedRef.current));

    let i = 0; // Index for left subarray
    let j = 0; // Index for right subarray
    let k = left; // Index for merged array

    while (i < leftArr.length && j < rightArr.length) {
      // Check for termination
      if (isTerminatedRef.current.value) {
        return;
      }

      // Wait until not paused
      while (isPausedRef.current.value) {
        if (isTerminatedRef.current.value) {
          return;
        }
        await sleep(100);
      }

      // Highlight the elements being compared
      setCurrentBarPair([left + i, middle + 1 + j]);
      await sleep(getSpeedDelay(speedRef.current));

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        setMergingPair([k, middle + 1 + j]);
        j++;
      }

      await sleep(getSpeedDelay(speedRef.current));
      // Clear highlighting
      setCurrentBarPair(null);
      setMergingPair(null);

      setArray([...arr]);

      k++;
    }

    // Copy remaining elements of leftArr
    while (i < leftArr.length) {
      if (isTerminatedRef.current.value) {
        return;
      }

      while (isPausedRef.current.value) {
        if (isTerminatedRef.current.value) {
          return;
        }
        await sleep(100);
      }

      arr[k] = leftArr[i];

      i++;
      k++;
    }

    // Copy remaining elements of rightArr
    while (j < rightArr.length) {
      if (isTerminatedRef.current.value) {
        return;
      }

      while (isPausedRef.current.value) {
        if (isTerminatedRef.current.value) {
          return;
        }
        await sleep(100);
      }

      arr[k] = rightArr[j];

      j++;
      k++;
    }

    setArray([...arr]);

    // Mark this range as sorted
    for (let idx = left; idx <= right; idx++) {
      sorted.push(idx);
    }
    setSortedIndices([...sorted]);
  };

  const mergeSortHelper = async (left: number, right: number) => {
    if (left >= right) {
      return;
    }

    // Check for termination
    if (isTerminatedRef.current.value) {
      return;
    }

    const middle = Math.floor((left + right) / 2);

    // Recursively sort both halves
    await mergeSortHelper(left, middle);
    await mergeSortHelper(middle + 1, right);

    // Merge the sorted halves
    await merge(left, middle, right);
  };

  // Start the merge sort process
  await mergeSortHelper(0, arr.length - 1);

  // Clear all highlighting
  setCurrentBarPair(null);
  setMergingPair(null);
  setMergeRange(null);
  setLeftSubarray(null);
  setRightSubarray(null);

  // Callback to indicate sorting is complete
  callBack(true);
};
