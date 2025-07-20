import React, { useEffect, useState } from "react";
import { binarySearchAlgorithm } from "./algorithms/binarySearch.ts";
import Controls from "./components/Controls.tsx";
import DisplayArray from "./components/displayArray.tsx";
import DisplayBars from "./components/DisplayBars.tsx";


const BinarySearch: React.FC = () => {
    const generateSortedArray = (size: number): number[] => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
        return (arr.sort((a, b) => a - b))
    };

    const [arraySize] = useState<number>(15);
    const [array, setArray] = useState<number[]>(generateSortedArray(arraySize));
    const [low, setLow] = useState<number>(-1);
    const [mid, setMid] = useState<number>(-1);
    const [high, setHigh] = useState<number>(-1);
    const [foundIndex, setFoundIndex] = useState<number>(-1);
    const [message, setMessage] = useState<string>('');
    const [target, setTarget] = useState('');
    const [speed, setSpeed] = useState<number>(1); // Speed control from 1x to 6x
    const speedRef = React.useRef<number>(1); // Speed reference for real-time updates

    // an objeect is being used in useRef as objects pass by reference and we can track the latest value across renders
    const isPausedRef = React.useRef<{ value: boolean }>({ value: false }); // to track latest value accross renders
    const [isPaused, setIsPaused] = useState<boolean>(false); // to re-render button state
    const isTerminatedRef = React.useRef<{ value: boolean }>({ value: true }); // This can be used to control termination of the search
    const [isTerminated, setIsTerminated] = useState<boolean>(true); // to re-render button state

    useEffect(() => {
        setArray(generateSortedArray(arraySize));
    }, [arraySize]);

    useEffect(() => {
        isPausedRef.current.value = isPaused;
    }, [isPaused]);

     useEffect(() => {
        isTerminatedRef.current.value = isTerminated;
    }, [isTerminated]);

    useEffect(() => {
        speedRef.current = speed; // Update speed reference when speed changes
    }, [speed]);

    const runBinarySearch = async () => {
        setIsTerminated(false);
        isTerminatedRef.current.value = false; // Set the termination state to false
        setFoundIndex(-1);
        setMessage('');
        // calback is executed when the search is terminated or completed
        const callBack = (completed: boolean) => {
            if (completed) {
                setIsTerminated(true);
                setIsPaused(false);
                return;
            } 

            setIsTerminated(true);
            setLow(-1);
            setMid(-1);
            setHigh(-1);
            setFoundIndex(-1);
            setIsPaused(false);

        }
        await binarySearchAlgorithm({ array, target: Number(target), setLow, setMid, setHigh, setFoundIndex, setMessage, isPaused: isPausedRef.current, isTerminated: isTerminatedRef.current, callBack, speedRef });
    };

    const generateArray = (size: number) => {
        const newArray = generateSortedArray(size);
        setArray(newArray);
        // setLow(-1);
        // setMid(-1);
        // setHigh(-1);
        // setFoundIndex(-1);
        // setMessage('');
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
        isPausedRef.current.value = !isPausedRef.current.value; // Toggle pause state
    };

    return (
        <section>
            <div className="container">
                <input type="number" className="digit" value={target}
                    onChange={(e) => setTarget(e.target.value)} placeholder="0" />

                                <Controls 
                    start={runBinarySearch}
                    generateArray={generateArray}
                    size={arraySize}
                    flowControls={{
                        togglePause: togglePause
                    }}
                    isPaused={isPaused}
                    terminate={(value: boolean) => {
                        isTerminatedRef.current.value = value;
                        setIsTerminated(value);
                    }}
                    isTerminated={isTerminated}
                    speed={speed}
                    onSpeedChange={setSpeed}
                />

                <p className="message">{message}</p>

                <DisplayArray array={array} low={low} mid={mid} high={high} foundIndex={foundIndex} />
                <DisplayBars array={array} low={low} mid={mid} high={high} foundIndex={foundIndex} />


            </div>

        </section>
    )
}


export default BinarySearch