import "./App.css";
import AlgorithmVisualizer from "./pages/AlgorithmVisualizerPage.tsx";
import Home from "./pages/Home.tsx";
import MobileWarning from "./components/MobileWarning.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

const App: React.FC = () => {
    return (
        <Router basename="/codecrux">
            <MobileWarning />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualiser/*" element={<AlgorithmVisualizer />} />
            </Routes>
        </Router>
    );
};

export default App;
