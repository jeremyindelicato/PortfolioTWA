import React from 'react';
import backgroundDarkGif from '../assets/autre/backgrounddark.gif';
import backgroundLightGif from '../assets/autre/backgroundlight.gif';
import { useTheme } from '../contexts/ThemeContext';

const Pattern = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none transition-all duration-700" style={{ zIndex: -1 }}>
      {/* GIF d'arrière-plan */}
      <img
        key={isDarkMode ? 'dark-gif' : 'light-gif'}
        src={isDarkMode ? backgroundDarkGif : backgroundLightGif}
        alt="Background animation"
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* Overlay adaptatif pour améliorer la lisibilité du contenu */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-700 ${
          isDarkMode 
            ? 'bg-black/60' // Overlay sombre en dark mode
            : 'bg-white/30' // Overlay clair en light mode
        }`}
        style={{
          mixBlendMode: 'normal'
        }}
      />
    </div>
  );
};

export default Pattern;