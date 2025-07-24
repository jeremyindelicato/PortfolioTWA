import React, { useEffect, useState } from 'react';

const Pattern = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: Math.max(window.innerHeight, document.documentElement.scrollHeight)
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Observer pour détecter les changements de contenu
    const observer = new MutationObserver(updateSize);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      observer.disconnect();
    };
  }, []);

  const getGapSize = () => {
    if (windowSize.width <= 480) return 40; // 2em = 32px environ
    if (windowSize.width <= 768) return 60; // 3em = 48px environ
    return 80; // 5em = 80px environ
  };

  const gap = getGapSize();

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        minHeight: '100vh',
        height: `${Math.max(windowSize.height, 2000)}px`,
        zIndex: -1,
        backgroundColor: 'rgb(25, 25, 25)', // Fond sombre
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${gap}px ${gap}px`
      }}
    />
  );
};

export default Pattern;