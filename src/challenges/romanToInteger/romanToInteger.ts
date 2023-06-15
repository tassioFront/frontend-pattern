const refer = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export const romanToInteger = (roman: string) => {
  let numbers2 = 0;
  roman.split('').forEach((s, index) => {
    const current: number = refer[roman[index] as keyof typeof refer];
    const next: number = refer[roman[index + 1] as keyof typeof refer] || 0;
    const isSum = current >= next;
    if (isSum) {
      numbers2 += current;
    } else {
      numbers2 -= current;
    }
  });

  return numbers2;
};
