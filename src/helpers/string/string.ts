export const createIdByString = (text: string): string =>
  text
    .split(' ')
    .join('-')
    .replaceAll(/,|\.|\(|\)|:/g, '')
    .toLowerCase();
