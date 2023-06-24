export const largestProduct = (inputArray: number[]) => {
  let result = -1000;
  for (let i = 0; inputArray.length - 1 > i; i++) {
    const current = inputArray[i] * inputArray[i + 1];
    result = Math.max(current, result);
  }
  return result;
};
