import { useState } from 'react';

const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const useLocalStorage = (key: string, initialValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => getItemFromLocalStorage(key) ?? initialValue);

  const setValue = (value: unknown) => {
    try {
      const valueToStore = JSON.stringify(value);
      setStoredValue(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const clearValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, clearValue];
};
