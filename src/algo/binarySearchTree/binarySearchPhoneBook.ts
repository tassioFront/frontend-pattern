export const searchContactOnSortedList = (
  sortedList: string[],
  query: string
) => {
  let start = 0;
  let end = sortedList.length - 1;
  let middle;
  let contactIndex = null;

  while (contactIndex === null) {
    console.count(query); // just to calculate how many times it passes here
    middle = Math.floor((start + end) / 2);

    const currentQuery = sortedList[middle];
    if (currentQuery === query) {
      contactIndex = middle;
    }

    if (query.localeCompare(currentQuery) < 0) {
      end = middle - 1;
    }

    if (query.localeCompare(currentQuery) > 0) {
      start = middle + 1;
    }
  }
  return contactIndex;
};
