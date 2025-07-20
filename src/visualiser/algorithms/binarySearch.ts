import { sleep, getSpeedDelay } from '../../util/helperFunctions';

interface args {
  isPaused: { value: boolean };
  array: number[];
  target: number;
  setLow: (arg0: number) => void;
  setMid: (arg0: number) => void;
  setHigh: (arg0: number) => void;
  setFoundIndex: (arg0: number) => void;
  setMessage: (arg0: string) => void;
  isTerminated: { value: boolean };
  callBack: (arg0: boolean) => void;
  speedRef: { current: number }; // Speed reference for real-time updates
}


export const binarySearchAlgorithm = async ({array, target, setLow, setMid, setHigh, setFoundIndex, setMessage, isPaused, isTerminated, callBack, speedRef}: args) => {

    // Convert speed (1x-6x) to delay in milliseconds (600ms-100ms)
    

    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        if (isTerminated.value) {
            setMessage('search terminated');
            callBack(false);
            return;
        }
        while (isPaused.value) {
            if (isTerminated.value) {
                setMessage('search terminated');
                callBack(false);
                return;
            }
            await sleep(getSpeedDelay(speedRef.current));
        }

        const mid = Math.floor((low + high) / 2);

        setLow(low);
        setMid(mid);
        setHigh(high);
        setMessage(`Searching...`);
        await sleep(getSpeedDelay(speedRef.current));

        if (array[mid] === target) {
            setMessage(`Found ${target} at index ${mid}`);
            setFoundIndex(mid);
            callBack(true);
            return;
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    setMessage(`Number ${target} not found`);
    callBack(true);
};
