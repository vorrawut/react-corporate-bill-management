// src/utils/localStorageHelper.ts
export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? (JSON.parse(storedValue) as T) : null;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
