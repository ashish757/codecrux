
interface props {
    size: number;
     onStart: () => void ;
     generateArray : (arg0: number) => void;
    flowControls: {
        isPaused: boolean;
        togglePause: () => void;
    };
}

const Controls = ({ onStart, generateArray, size, flowControls} : props) => {

    return (
        <div className="controls">
            <button onClick={() => onStart()} >
                Start
            </button>

            <button onClick={() => flowControls.togglePause()}>
                {flowControls.isPaused ? 'Resume' : 'Pause'}
            </button>

            <button className="button sec" onClick={() => generateArray(size)}>
                Generate New Array
            </button>
        </div>
    );
};

export default Controls;
