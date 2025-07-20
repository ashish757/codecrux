import { sleep, getSpeedDelay } from '../../util/helperFunctions';
 interface args {
  setArray: (arg0: number[]) => void;    
    setSortedIndices: (arg0: number[]) => void;
    setcurrentBarPair: (arg0: [number, number] | null) => void;
    setSwappingPair: (arg0: [number, number] | null) => void;
    isPausedRef: { current: { value: boolean } };
    isTerminatedRef: { current: { value: boolean } };
    callBack: (arg0: boolean) => void;
    array: number[];
    speedRef: { current: number }; // Speed reference for real-time updates
}


export const bubbleSort = async ({array, setArray, setSortedIndices, setcurrentBarPair, setSwappingPair, isPausedRef, isTerminatedRef, callBack, speedRef} : args) => {
    const arr = [...array];
    const n = arr.length;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      // Check for termination
      if (isTerminatedRef.current.value) {
        callBack(false);
        return;
      }

      for (let j = 0; j < n - i - 1; j++) {
        // Check for termination
        if (isTerminatedRef.current.value) {
          callBack(false);
          return;
        }

        // Wait until not paused
        while (isPausedRef.current.value) {
          await sleep(100); 
          // Also check for termination while paused
          if (isTerminatedRef.current.value) {
            callBack(false);
            return;
          }
        }   
            
        setcurrentBarPair([j, j + 1]);

        await sleep(getSpeedDelay(speedRef.current)/2);

        if (arr[j] > arr[j + 1]) {
          // Start swap animation
          setSwappingPair([j, j + 1]);
          await sleep(getSpeedDelay(speedRef.current));
          
          // Perform the actual swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          
          // End swap animation
          setSwappingPair(null);
        }
      }
      sorted.unshift(n - i - 1);
      setSortedIndices([...sorted]);
    }

    callBack(true); // Call the callback when sorting is completed
  };
