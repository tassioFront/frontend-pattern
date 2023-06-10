const checkExistsNext = (numbersSet: Set<number>, currentNum: number) =>
  numbersSet.has(currentNum + 1);

export function longestConsecutiveSequence(numbers: number[]) {
  const numbersSet = new Set(numbers);
  let longestSequence = 0;

  for (const num of numbers) {
    const isTheFistOne = !numbersSet.has(num - 1);
    if (isTheFistOne) {
      let currentNum = num;
      let currentStreak = 1;

      while (checkExistsNext(numbersSet, currentNum)) {
        currentNum += 1;
        currentStreak += 1;
      }
      longestSequence = Math.max(longestSequence, currentStreak);
    }
  }
  return longestSequence;
}
