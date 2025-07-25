import React from 'react';
import BinarySearchPage from './BinarySearchPage.tsx';
import BubbleSortPage from './BubbleSortPage.tsx';
import Cards from '../components/Cards.tsx';
import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import QuickSortPage from "./QuickSortPage.tsx";
import MergeSortPage from "./MergeSortPage.tsx";

// Landing page component for /visualiser
const VisualizerHome: React.FC = () => {
    const cardData = [
        {
            id: '1',
            title: 'Binary Search',
            description: 'Efficiently search through sorted arrays using the divide and conquer approach. Time complexity: O(log n)',
            tags: ['Search', 'Divide & Conquer', 'O(log n)'],
            link: "/visualiser/binarysearch"
        },
        {
            id: '2',
            title: 'Bubble Sort',
            description: 'A simple sorting algorithm that repeatedly steps through the list and swaps adjacent elements if they are in the wrong order.',
            tags: ['Sorting', 'Comparison', 'O(n²)'],
            link: "/visualiser/bubblesort",
        },
        {
            id: '3',
            title: 'Quick Sort',
            description: 'An efficient divide-and-conquer sorting algorithm that picks a pivot element and partitions the array around it.',
            tags: ['Sorting', 'Divide & Conquer', 'O(n log n)'],
            link: "/visualiser/quicksort"
        },
        {
            id: '4',
            title: 'Merge Sort',
            description: 'A stable divide-and-conquer sorting algorithm that divides the array into halves and merges them back in sorted order.',
            tags: ['Sorting', 'Stable', 'O(n log n)'],
            link: "/visualiser/mergesort"
        }
    ];

    return (
        <main>
            <Navbar />
            
            <h1 className="heading">Algorithm Visualizer</h1>
            <p className="description">
                Choose an algorithm to explore and visualize how it works step by step
            </p>

            <Cards cards={cardData} />
        </main>
    );
};

// Main component with nested routing
const AlgorithmVisualizer: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<VisualizerHome />} />
            <Route path="/binarysearch" element={<BinarySearchPage />} />
            <Route path="/bubblesort" element={<BubbleSortPage />} />
            <Route path="/quicksort" element={<QuickSortPage />} />
            <Route path="/mergesort" element={<MergeSortPage />} />
        </Routes>
    );
};

export default AlgorithmVisualizer;
