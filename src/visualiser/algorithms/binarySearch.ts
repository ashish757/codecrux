export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface args {
  isPaused: { value: boolean };
  array: number[];
  target: number;
  setLow: (arg0: number) => void;
  setMid: (arg0: number) => void;
  setHigh: (arg0: number) => void;
  setFoundIndex: (arg0: number) => void;
  setMessage: (arg0: string) => void;
}


export const binarySearchAlgorithm = async ({array, target, setLow, setMid, setHigh, setFoundIndex, setMessage, isPaused}: args) => {

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
