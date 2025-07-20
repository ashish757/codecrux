import './displayArray.css';

interface props {
    array: Array<number>
    low: number
    high: number
    mid: number
    foundIndex: number
}

const DisplayArray = ({ array, low, mid, high, foundIndex } : props) => {
    return (
        <div className="displayArray">

            {array.map((num, idx) => {
                let className: string = '';
                if (idx === mid) className = 'mid';
                if (idx === low) className = 'low';
                if (idx === high) className = 'high';
                if (idx === foundIndex) className = 'found';

                return (
                    <div key={idx} className={`number md-box ${className}`} >
                        {num}
                    </div>
                );
            })}

        </div>
    );
};

export default DisplayArray;
