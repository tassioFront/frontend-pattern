import { useRef, useState, useEffect } from 'react';

export const useObserver = ({
  onVisible,
}: {
  onVisible: (onVisible: boolean) => void;
}) => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  const observerElement = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    onVisible(isVisible);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (observerElement.current) observer.observe(observerElement.current);

    return () => {
      if (observerElement.current) observer.unobserve(observerElement.current);
    };
  }, [observerElement, options]);

  return [observerElement];
};
