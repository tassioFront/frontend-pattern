export const arrayConsecutive = (statues: number[]) => {
  const start = Math.min(...statues);
  const end = Math.max(...statues);
  let result = 0;

  if (start === end) {
    return result;
  }

  for (let i = start; i !== end; i++) {
    if (statues.findIndex((statue) => statue === i) === -1) {
      result++;
    }
  }

  return result;
};
