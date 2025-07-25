export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const getSpeedDelay = (speedLevel: number): number => {
    return 800 - (speedLevel * 100);
};


/**
 * Generates a random array of numbers
 * @param size - Number of elements in the array
 * @param sorted - Whether the array should be sorted (true) or random (false)
 * @param min - Minimum value for array elements (default: 1)
 * @param max - Maximum value for array elements (default: 100)
 * @returns Array of random numbers
 */
export const generateRandomArray = (
  size: number,
  sorted: boolean = false,
  min: number = 1,
  max: number = 100
): number[] => {
  const array = Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  return sorted ? array.sort((a, b) => a - b) : array;
};
