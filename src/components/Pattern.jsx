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
    if (windowSize.width <= 480) return '2em';
    if (windowSize.width <= 768) return '3em';
    return '5em';
  };

  const gap = getGapSize();

  const patternStyle = {
    background: 'rgb(41, 41, 41)',
    backgroundImage: `
      linear-gradient(-90deg, transparent calc(${gap} - 1px), rgba(255, 255, 255, 0.2) calc(${gap} - 1px + 1px), rgba(255, 255, 255, 0.2) ${gap}),
      linear-gradient(0deg, transparent calc(${gap} - 1px), rgba(255, 255, 255, 0.2) calc(${gap} - 1px + 1px), rgba(255, 255, 255, 0.2) ${gap})
    `,
    backgroundSize: `${gap} ${gap}`
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        height: `${Math.max(windowSize.height, 2000)}px`,
        zIndex: -1,
        ...patternStyle
      }}
    />
  );
};

export default Pattern; 