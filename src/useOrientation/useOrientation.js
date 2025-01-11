import { useEffect, useState } from 'react';
import './index.css';

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: landscape)');

    const handleOrientationChange = (e) => {
      setIsLandscape(e.matches);
    };

    mediaQuery.addEventListener('change', handleOrientationChange);

    handleOrientationChange(mediaQuery);

    return () =>
      mediaQuery.removeEventListener('change', handleOrientationChange);
  }, []);

  return isLandscape;
};
