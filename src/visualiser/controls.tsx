
import './components/controls.css';

interface props {
    size: number;
    start: () => void ;
    generateArray : ((arg0: number) => void) | (() => void); // Support both patterns
    flowControls: {
        togglePause: () => void;
    };
    isPaused: boolean;
    terminate: (arg0: boolean) => void;
    isTerminated: boolean;
    speed?: number; // Speed from 1x to 6x
    onSpeedChange?: (speed: number) => void;
}
// isTerminated = !ongoing

const Controls = ({ start, generateArray, size, flowControls, isPaused, terminate, isTerminated, speed = 1, onSpeedChange } : props) => {

    const handleGenerateArray = () => {
        // Check if generateArray expects a parameter
        if (generateArray.length > 0) {
            (generateArray as (arg0: number) => void)(size);
        } else {
            (generateArray as () => void)();
        }
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseInt(event.target.value);
        if (onSpeedChange) {
            onSpeedChange(newSpeed);
        }
    };

    return (
        <div className="controls">
            <div className="controls-row">
                <button 
                    className={`control-btn start-terminate-btn ${isTerminated ? "start-btn" : "terminate-btn"}`} 
                    onClick={() => isTerminated ? start() : terminate(true)}
                >
                    {isTerminated ? "Start" : "Terminate"}
                </button>

                <div className={`control-flow ${isPaused ? 'expanded' : ''}`}>
                    {isPaused && (
                        <button className="control-btn nav-btn left-nav" onClick={() => console.log('Previous step')}>
                            &lt;
                        </button>
                    )}
                    
                    <button 
                        className={`control-btn pause-btn ${isPaused ? 'paused' : ''}`}
                        onClick={() => flowControls.togglePause()}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    
                    {isPaused && (
                        <button className="control-btn nav-btn right-nav" onClick={() => console.log('Next step')}>
                            &gt;
                        </button>
                    )}
                </div>

                <div className="speed-control">
                    <label htmlFor="speed-slider">Speed: {speed}x</label>
                    <input
                        id="speed-slider"
                        type="range"
                        min="1"
                        max="6"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="speed-slider"
                    />
                    <div className="speed-labels">
                        <span>1x</span>
                        <span>6x</span>
                    </div>
                </div>

                <button className="control-btn generate-btn" onClick={handleGenerateArray}>
                    Generate New Array
                </button>
            </div>
        </div>
    );
};

export default Controls;
