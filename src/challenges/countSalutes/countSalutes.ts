export const countSalutes = (str: string) => {
  let counter = 0;
  const arrowRight = [];

  for (let i = 0; str.length >= i; i++) {
    const char = str[i];
    if (char === '>') {
      arrowRight.push(i);
    }
    if (arrowRight.length && char === '<') {
      counter += arrowRight.length;
    }
  }
  return counter * 2;
};
