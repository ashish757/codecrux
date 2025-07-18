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
                let bgColor: string = 'bg-gray';
                if (idx === mid) bgColor = 'bg-yellow';
                if (idx === low) bgColor = 'bg-blue';
                if (idx === high) bgColor = 'bg-red';
                if (idx === foundIndex) bgColor = 'bg-green';

                return (
                    <div key={idx} className={`number md-box ${bgColor}`} >
                        {num}
                    </div>
                );
            })}

        </div>
    );
};

export default DisplayArray;
