import { useEffect, useRef, useState, RefCallback } from 'react';

export function useInView<T extends HTMLElement>(threshold = 0.15): [RefCallback<T>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackRef: RefCallback<T> = (node) => {
    ref.current = node;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [callbackRef, isVisible];
}
