export const arrayConsecutive = (statues: number[]) => {
  const map = new Map();

  let min = statues[0];
  let max = 0;

  for (let i = 0; i < statues.length; i++) {
    const statue = statues[i];
    min = Math.min(min, statue);
    max = Math.max(max, statue);
    map.set(statue, i);
  }
  let result = 0;

  for (let i = min; i !== max; i++) {
    if (!map.has(i)) {
      result++;
    }
  }
  return result;
};
