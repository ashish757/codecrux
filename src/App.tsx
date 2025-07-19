import "./App.css";
import AlgorithmVisualizer from "./pages/AlgorithmVisualizerPage.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualiser/*" element={<AlgorithmVisualizer />} />
            </Routes>
        </Router>
    );
};

export default App;
