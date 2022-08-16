import { useState, useEffect } from 'react';

export const useMobileView = (maxMobileWidth: number) => {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

  useEffect(() => {
    function handleWindowResize() {
      setIsMobileView(window.innerWidth < maxMobileWidth);
    }

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [maxMobileWidth]);

  return isMobileView;
};

// export default useMobileView;
