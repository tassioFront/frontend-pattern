const ARRAY_EXTRA_CORRECTION = 1;
const DOUBLE_CENTER_START_CORRECTION = 1;
export function longestPalindrome(s: string) {
  let start = 0;
  let end = 0;

  for (let center = 0; s.length > center; center++) {
    const singleCenter = expandAroundCenter(s, center, center);
    const doubleCenter = expandAroundCenter(s, center, center + 1); // case it has a double center, such as abbc (bb)
    const largerLength = Math.max(singleCenter, doubleCenter);
    const hasDoubleCenter = doubleCenter > singleCenter;
    const isGreaterThanLastLength = largerLength > end - start;
    const divider = Math.floor(largerLength / 2);

    if (isGreaterThanLastLength) {
      start =
        center -
        divider +
        (hasDoubleCenter ? DOUBLE_CENTER_START_CORRECTION : 0);
      end = center + divider;
    }
  }

  return s.substring(start, end + ARRAY_EXTRA_CORRECTION);
}

// return how much it should expand from center. Like: if it return 2, 1 should be the used to left and to right from center to find the palindrome
function expandAroundCenter(s: string, left: number, right: number) {
  while (left >= 0 && s.length >= right && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - ARRAY_EXTRA_CORRECTION;
}
