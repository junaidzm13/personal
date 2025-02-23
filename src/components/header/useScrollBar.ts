import { useCallback, useLayoutEffect, useState } from 'react';

export function useScrollBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const totalScrollableHeight = documentHeight - windowHeight;
    const percentage = (scrollTop / totalScrollableHeight) * 100;

    setScrollPercentage(Math.min(Math.max(percentage, 0), 100));
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return { scrollPercentage };
}
