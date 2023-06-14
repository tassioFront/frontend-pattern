export const mergeStringsAlternately = (word1: string, word2: string) => {
  let extraLetters = '';
  const minLength = Math.min(word1.length, word2.length);
  extraLetters =
    word1.length > word2.length
      ? word1.slice(word2.length)
      : word2.slice(word1.length);

  let result = '';
  for (let index = 0; minLength > index; index++) {
    result += word1[index];
    result += word2[index];
  }

  result += extraLetters;

  return result;
};
