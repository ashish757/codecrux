import React, {useState} from "react";
import {binarySearchVisualizer} from "./algorithms/binarySearch.ts";
import Controls from "./controls.tsx";
import DisplayArray from "./components/displayArray.tsx";


const generateSortedArray = (size: number): number[] => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return arr.sort((a, b) => a - b);
};

const BinarySearch: React.FC = () => {

    const [array, setArray] = useState<number[]>(generateSortedArray(15));
    const [low, setLow] = useState<number>(-1);
    const [mid, setMid] = useState<number>(-1);
    const [high, setHigh] = useState<number>(-1);
    const [foundIndex, setFoundIndex] = useState<number>(-1);
    const [message, setMessage] = useState<string>('');

    const startSearch = async (target: number) => {
        setFoundIndex(-1);
        setMessage('');
        await binarySearchVisualizer(array, target, setLow, setMid, setHigh, setFoundIndex, setMessage);
    };

    return (
        <>
            <h1 className="sub-heading">Binary Search</h1>
            <DisplayArray array={array} low={low} mid={mid} high={high} foundIndex={foundIndex} />

            <p className="message">{message}</p>

            <Controls onStart={startSearch} />

            <button className="button sec" onClick={() => setArray(generateSortedArray(15))}>
                Generate New Array
            </button>
        </>
    )
}


export default BinarySearch