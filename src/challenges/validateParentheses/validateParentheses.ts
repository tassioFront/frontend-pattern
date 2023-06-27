export const validateParentheses = (str: string) => {
  let dep = 0;

  for (let i = 0; str.length > i; i++) {
    const char = str[i];

    if (char === '(') {
      dep++;
    }

    if (char === ')') {
      dep--;
      if (dep < 0) {
        return false;
      }
    }
  }

  return dep === 0;
};
