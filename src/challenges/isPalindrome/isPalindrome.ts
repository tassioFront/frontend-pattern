export const isPalindrome = (string: string) => {
  const aNums = string.toLocaleLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '');
  if (aNums === '') return true;

  let start = 0;
  let end = aNums.length - 1;
  const middle = end / 2;
  let result = true;

  for (let index = start; middle > index; index++) {
    if (aNums[start] !== aNums[end]) {
      result = false;
      break;
    }
    start++;
    end--;
  }
  return result;
};
