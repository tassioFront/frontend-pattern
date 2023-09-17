export const calcTodoProgress = ({
  total,
  done,
  inProgress,
}: {
  total: number;
  done: number;
  inProgress: number;
}) => {
  const result = Math.round(
    ((done / total + inProgress / total / 2) / 1) * 100
  );
  return Number.isNaN(result) ? 0 : result;
};
