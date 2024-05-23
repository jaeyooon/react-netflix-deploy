import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);  // delay 시간 이후에 value로 debounceValue state을 변경해줌

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debounceValue;

};