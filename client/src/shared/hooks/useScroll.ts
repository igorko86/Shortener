import { RefObject, useRef } from 'react';

const useScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (elRef.current) {
      elRef.current.scrollIntoView({
        block: 'center',
      });
    }
  };

  return [executeScroll, elRef];
};

export default useScroll;
