export const fakeApi = async <T>(value: T): Promise<T> =>
  await new Promise((resolve) => {
    setTimeout(() => resolve(value), 500);
  });
