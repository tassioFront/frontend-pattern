export const countSalutes = (str: string) => {
  let leftArrows = [];
  let rightArrows = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '<') {
      leftArrows.push(i);
    } else if (char === '>') {
      rightArrows.push(i);
    }
  }
  let pairs = 0;
  for (const rightIdx of rightArrows) {
    for (const leftIdx of leftArrows) {
      if (leftIdx < rightIdx) {
        continue;
      }
      pairs++;
    }
  }
  return pairs * 2;
};
