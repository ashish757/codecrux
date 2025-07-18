import React from 'react';
import "./algorithmVisualizer.css";
import BinarySearch from "../visualiser/BinarySearch.tsx";


const AlgorithmVisualizer: React.FC = () => {

    return (
        <main>
            <h1 className="heading">Algorithm Visualizer</h1>

            <BinarySearch />

        </main>
    );
};

export default AlgorithmVisualizer;
