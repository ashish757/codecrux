import React, { useEffect, useState } from "react";
import { binarySearchAlgorithm } from "./algorithms/binarySearch.ts";
import Controls from "./controls.tsx";
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
    const isPausedRef = React.useRef<{ value: boolean }>({ value: false });
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [target, setTarget] = useState('');



    useEffect(() => {
        setArray(generateSortedArray(arraySize));
    }, [arraySize]);

    useEffect(() => {
        isPausedRef.current.value = isPaused;
        console.log(`Paused: ${isPaused}`);
        console.log(`Paused Ref: ${isPausedRef.current}`);
    }, [isPaused]);



    const runBinarySearch = async () => {
        setFoundIndex(-1);
        setMessage('');
        await binarySearchAlgorithm({ array, target: Number(target), setLow, setMid, setHigh, setFoundIndex, setMessage, isPaused: isPausedRef.current });
    };

    const generateArray = (size: number) => {
        const newArray = generateSortedArray(size);
        setArray(newArray);
        setLow(-1);
        setMid(-1);
        setHigh(-1);
        setFoundIndex(-1);
        setMessage('');
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

                <Controls onStart={runBinarySearch} flowControls={{ isPaused, togglePause }} generateArray={generateArray} size={arraySize} />

                <p className="message">{message}</p>

                <DisplayArray array={array} low={low} mid={mid} high={high} foundIndex={foundIndex} />
                <DisplayBars array={array} low={low} mid={mid} high={high} foundIndex={foundIndex} />


            </div>

        </section>
    )
}


export default BinarySearch