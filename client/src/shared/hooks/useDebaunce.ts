import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState('');
  console.log('debaunce', value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('debaunce in', value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(<NodeJS.Timeout>timeoutId);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
