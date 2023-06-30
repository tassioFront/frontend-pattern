export const twoSum = (numbers: number[], target: number) => {
  const result = [];
  const isOdd = target % 2 === 0;
  const numberOptions = Math.floor(target / 2);
  let currentLeftOptValue = numberOptions;
  let currentRightOptValue = isOdd ? numberOptions : numberOptions + 1;

  for (let index = numberOptions; result.length === 0; index++) {
    const hasSameValue = currentLeftOptValue && currentRightOptValue;
    const leftIndex = numbers.findIndex((num) => num === currentLeftOptValue);
    const rightIndex = hasSameValue
      ? numbers.lastIndexOf(currentRightOptValue)
      : numbers.findIndex((num) => num === currentRightOptValue);

    const novalid =
      leftIndex !== rightIndex && leftIndex !== -1 && rightIndex !== -1;
    if (result.length === 0 && novalid) {
      result.push(leftIndex, rightIndex);
    }
    currentLeftOptValue--;
    currentRightOptValue++;
  }

  return result;
};

// just to compare another option
export const twoSum2 = (nums: number[], target: number) => {
  const result: number[] = [];

  for (let index = 0; result.length === 0; index++) {
    for (let i = 0; nums.length > i; i++) {
      const isEqualTarget = nums[index] + nums[i] === target;
      if (i !== index && isEqualTarget) {
        result.push(index, i);
        break;
      }
    }
  }

  return result;
};
