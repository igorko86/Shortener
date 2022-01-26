import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(<NodeJS.Timeout>timeoutId);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
