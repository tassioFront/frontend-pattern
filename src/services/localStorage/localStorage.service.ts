export const storageService = {
  get: <T>(key: string): T | string => {
    const rawData = localStorage.getItem(key) as string;

    try {
      return JSON.parse(rawData) as T;
    } catch (_) {
      return rawData;
    }
  },
  set: <T>(key: string, data: T): void => {
    const stringifyData = JSON.stringify(data);

    localStorage.setItem(key, stringifyData);
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
