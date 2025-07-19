export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
 interface args {
  setIsSorting: (arg0: boolean) => void;
  setArray: (arg0: number[]) => void;    
    setSortedIndices: (arg0: number[]) => void;
    setcurrentBarPair: (arg0: [number, number] | null) => void;
    isPausedRef: { current: boolean };
    array: number[];
}



export const bubbleSort = async ({array, setIsSorting, setArray, setSortedIndices, setcurrentBarPair, isPausedRef} : args) => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {

        while (isPausedRef.current) {
          await sleep(100); // Wait until not paused
        }   
            
        setcurrentBarPair([j, j + 1]);

        await sleep(100);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
      sorted.unshift(n - i - 1);
      setSortedIndices([...sorted]);
    }

    setcurrentBarPair(null);
    setIsSorting(false);
  };
