import { useEffect } from 'react';

export const useScroll = (callBack: () => void): void => {
  useEffect(() => {
    window.addEventListener('scroll', callBack);
    return () => {
      window.removeEventListener('scroll', callBack);
    };
  }, [callBack]);
};
