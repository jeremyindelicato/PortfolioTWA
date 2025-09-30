import React, { useState, useEffect } from 'react';
import backgroundDarkGif from '../assets/autre/backgrounddark.gif';
import backgroundLightGif from '../assets/autre/backgroundlight.gif';
import { useTheme } from '../contexts/ThemeContext';

const Pattern = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Styles adaptatifs selon la taille d'écran
  const getResponsiveStyles = () => {
    if (isMobile) {
      return {
        objectFit: 'cover',
        objectPosition: 'center center',
        transform: 'scale(1.1)', // Légèrement zoomé sur mobile pour éviter les bords
        filter: 'blur(0.5px)', // Légère atténuation pour la performance
      };
    } else if (isTablet) {
      return {
        objectFit: 'cover',
        objectPosition: 'center center',
        transform: 'scale(1.05)',
      };
    }
    return {
      objectFit: 'cover',
      objectPosition: 'center center',
    };
  };

  // Overlay adaptatif selon la taille d'écran
  const getOverlayOpacity = () => {
    if (isMobile) {
      return isDarkMode ? 'bg-black/70' : 'bg-white/40'; // Plus opaque sur mobile
    } else if (isTablet) {
      return isDarkMode ? 'bg-black/65' : 'bg-white/35';
    }
    return isDarkMode ? 'bg-black/60' : 'bg-white/30'; // Desktop
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none transition-all duration-700" style={{ zIndex: -1 }}>
      {/* GIF d'arrière-plan responsive */}
      <img
        key={isDarkMode ? 'dark-gif' : 'light-gif'}
        src={isDarkMode ? backgroundDarkGif : backgroundLightGif}
        alt="Background animation"
        className="w-full h-full transition-opacity duration-700"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...getResponsiveStyles(),
        }}
        loading="eager" // Chargement prioritaire pour le background
        decoding="async" // Décodage asynchrone pour la performance
      />
      
      {/* Overlay adaptatif responsive */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-700 ${getOverlayOpacity()}`}
        style={{
          mixBlendMode: 'normal'
        }}
      />

      {/* Gradient supplémentaire pour mobile pour améliorer la lisibilité */}
      {isMobile && (
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%)'
              : 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.2) 70%)',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default Pattern;