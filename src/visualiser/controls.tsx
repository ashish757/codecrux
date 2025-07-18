import { useState } from 'react';

const Controls = ({ onStart} : {onStart: (arg0 : number) => void  } ) => {
    const [target, setTarget] = useState('');

    return (
        <div className="">
            <input
                type="number"
                className="digit"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="0"
            />
            <button
                className="pri"
                onClick={() => onStart(Number(target))}
            >
                Start Binary Search
            </button>
        </div>
    );
};

export default Controls;
