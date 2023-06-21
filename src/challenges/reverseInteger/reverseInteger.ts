export const reverseInteger = (x: number) => {
  let sign = 1;
  let result = 0;

  if (x < 0) {
    sign = -1;
    x = Math.abs(x);
  }

  while (x > 0) {
    const lastNumber = x % 10;
    result = result * 10 + lastNumber;
    x = Math.floor(x / 10);
  }

  result *= sign;

  // challenge constraints
  if (result < -Math.pow(2, 31) || result > Math.pow(2, 31) - 1) {
    return 0;
  }

  return result;
};
