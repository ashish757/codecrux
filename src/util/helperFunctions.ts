export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const getSpeedDelay = (speedLevel: number): number => {
    return 800 - (speedLevel * 100);
};