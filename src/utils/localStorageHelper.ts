export const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error('Error parsing localStorage value:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
