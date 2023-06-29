import { useState, useEffect } from "react";

export default function useLocalStorage(keyName, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(keyName);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(storedValue));
    } catch (err) {
      //? Handle errors
    }
  }, [keyName, storedValue]);

  const setValue = (newValue) => {
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}
