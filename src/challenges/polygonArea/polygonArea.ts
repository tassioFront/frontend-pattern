export const polygonArea = (n: number) => {
  // polygons has larger sides and shorter one. See the image:
  // https://codesignal.s3.amazonaws.com/uploads/1664318501/area.png?raw=true
  const larger = n * n;
  const shorter = (n - 1) * (n - 1);
  return larger + shorter;
};
