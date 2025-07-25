const red = '#ff6b6b'; //red
const green = '#51cf66'; //green
const orange = '#ffa41bff'; //orange
const purple = '#9b27b0'; //purple
const lightGrey = '#aaaaaad4'; //light grey
const lightBlue = '#5b99e1bd'; //light blue

// const blue = '#5b99e1'; //blue
// const grey = '#aaaaaa'; //grey
// const yellow = '#ffeb3b'; //yellow
// const darkBlue = '#0d47a1'; //dark blue
// const lightGreen = '#c8e6c9'; //light green


export const quickSortLegend = [
    { color: purple, description: 'Pivot Element' },
    { color: red, description: 'Current Element' },
    { color: orange, description: 'Swapping Element' },
    { color: lightGrey, description: 'In Partition' },
    { color: lightBlue, description: 'Sorted in Partition' },
    { color: green, description: 'Sorted Element' },
];

export const bubbleSortLegend = [
    { color: red, description: 'Current Pair Being Compared' },
    { color: orange, description: 'Swapping Pair' },
    { color: green, description: 'Sorted Element' },
];


export const binarySearchLegend = [
    { color: red, description: 'Currently Element' },
    { color: orange, description: 'Low & High Boundary of Search' },
    { color: green, description: 'Element Being Searched, Found' },
]

export const mergeSortLegend = [
    { color: red, description: 'Elements Being Compared' },
    { color: orange, description: 'Elements Being Merged' },
    { color: green, description: 'Sorted Element' },
    { color: lightGrey, description: 'Current Merge Range' },

];
