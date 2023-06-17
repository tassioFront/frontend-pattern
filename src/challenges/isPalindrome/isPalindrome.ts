export const isPalindrome = (string: string) => {
  const aNums = string.replace(/[^a-z0-9]/gi, '').toLowerCase();
  if (aNums === '') return true;

  for (let i = 0; aNums.length / 2 > i; i++) {
    if (aNums[i] !== aNums[aNums.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
