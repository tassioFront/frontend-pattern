export const century = (year: number) => {
  const ref = Math.floor(year / 100);
  const rest = year % 100 === 0 ? 0 : 1;
  return ref + rest;
};
