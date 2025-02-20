import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    const mappedItem = initialValue.map(item => item);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }
    return mappedItem;
  });

  ///Must put setStoredValue before if statement because it will cause the stored value to be an JSON string versus an object.
  const setValue = value => {
    setStoredValue(value);
    if (typeof value !== "string") value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
};
