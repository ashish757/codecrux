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


const binarySearchAlgorithm = async (array: number[], target: number,
setLow: (arg0 : number) => void, setMid: (arg0 : number) => void, setHigh: (arg0 : number) => void, 
setFoundIndex: (arg0 : number) => void, setMessage: (arg0 : string) => void, isPaused: {value:boolean}) => {

    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
            while (isPaused.value) {
                await sleep(600);
            }

        const mid = Math.floor((low + high) / 2);

        setLow(low);
        setMid(mid);
        setHigh(high);
        setMessage(`Searching...`);
        await sleep(600);

        if (array[mid] === target) {
            setMessage(`Found ${target} at index ${mid}`);
            setFoundIndex(mid);
            return;
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    setMessage(`Number ${target} not found`);
    setLow(-1);
    setMid(-1);
    setHigh(-1);
};
