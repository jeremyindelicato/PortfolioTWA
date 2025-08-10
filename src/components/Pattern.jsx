import React from 'react';
import backgroundVideo from '../assets/autre/background-video.mp4';
import backgroundVideoWhite from '../assets/autre/background-video-white.mp4';
import { useTheme } from '../contexts/ThemeContext';

const Pattern = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none transition-all duration-700" style={{ zIndex: -1 }}>
      {/* Vidéo d'arrière-plan */}
      <video
        key={isDarkMode ? 'dark-video' : 'light-video'}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={isDarkMode ? backgroundVideo : backgroundVideoWhite} type="video/mp4" />
        {/* Fallback en cas d'échec de chargement de la vidéo */}
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>
      
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