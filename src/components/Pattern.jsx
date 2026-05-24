import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import DataScienceBackground from './DataScienceBackground';
import DataScienceBackgroundDark from './DataScienceBackgroundDark';

const Pattern = () => {
  const { isDarkMode } = useTheme();
  const [deviceType, setDeviceType] = useState('desktop');
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Détection du type d'appareil avec breakpoints plus précis
      if (width <= 480) {
        setDeviceType('mobile-small'); // iPhone SE, petits mobiles
      } else if (width <= 768) {
        setDeviceType('mobile'); // Mobiles standards
      } else if (width <= 1024) {
        setDeviceType('tablet'); // Tablettes
      } else {
        setDeviceType('desktop'); // Desktop
      }

      // Détection orientation
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);

  // Styles adaptatifs selon la taille d'écran et l'orientation
  const getResponsiveStyles = () => {
    const baseStyle = {
      objectFit: 'cover',
      objectPosition: 'center center',
    };

    // Petits mobiles (≤480px) - iPhone SE, petits Android
    if (deviceType === 'mobile-small') {
      return {
        ...baseStyle,
        transform: orientation === 'portrait' ? 'scale(1.3)' : 'scale(1.15)',
        filter: 'blur(1px)', // Plus de blur pour masquer les artéfacts sur petits écrans
        imageRendering: 'auto',
      };
    }

    // Mobiles standards (481-768px) - iPhone 12/13/14, Android standards
    if (deviceType === 'mobile') {
      return {
        ...baseStyle,
        transform: orientation === 'portrait' ? 'scale(1.2)' : 'scale(1.1)',
        filter: 'blur(0.8px)',
        imageRendering: 'auto',
      };
    }

    // Tablettes (769-1024px) - iPad, Galaxy Tab
    if (deviceType === 'tablet') {
      return {
        ...baseStyle,
        transform: orientation === 'portrait' ? 'scale(1.1)' : 'scale(1.05)',
        filter: 'blur(0.3px)',
      };
    }

    // Desktop - Aucune transformation
    return baseStyle;
  };

  // Overlay adaptatif selon la taille d'écran et le mode
  const getOverlayOpacity = () => {
    // Petits mobiles - Overlay très opaque pour meilleure lisibilité
    if (deviceType === 'mobile-small') {
      return isDarkMode ? 'bg-black/75' : 'bg-white/45';
    }

    // Mobiles standards - Overlay opaque
    if (deviceType === 'mobile') {
      return isDarkMode ? 'bg-black/70' : 'bg-white/40';
    }

    // Tablettes - Overlay intermédiaire
    if (deviceType === 'tablet') {
      return isDarkMode ? 'bg-black/65' : 'bg-white/35';
    }

    // Desktop - Overlay standard
    return isDarkMode ? 'bg-black/60' : 'bg-white/30';
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none transition-all duration-700" style={{ zIndex: -1 }}>
      {/* Background adaptatif selon le mode */}
      {isDarkMode ? (
        /* Background DataScience animé pour le mode sombre */
        <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a]">
          <DataScienceBackgroundDark />
        </div>
      ) : (
        /* Background DataScience animé pour le mode clair */
        <div className="absolute top-0 left-0 w-full h-full bg-[#fdfdfd]">
          <DataScienceBackground />
        </div>
      )}
      
      {/* Overlay adaptatif responsive */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-700 ${getOverlayOpacity()}`}
        style={{
          mixBlendMode: 'normal'
        }}
      />

      {/* Gradient supplémentaire pour mobile pour améliorer la lisibilité */}
      {(deviceType === 'mobile-small' || deviceType === 'mobile') && (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            background: isDarkMode
              ? deviceType === 'mobile-small'
                ? 'radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.4) 60%)' // Plus intense sur petits écrans
                : 'radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.35) 65%)'
              : deviceType === 'mobile-small'
                ? 'radial-gradient(ellipse at center, transparent 10%, rgba(255,255,255,0.25) 60%)'
                : 'radial-gradient(ellipse at center, transparent 15%, rgba(255,255,255,0.2) 65%)',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Vignette supplémentaire pour les bords sur mobile portrait */}
      {(deviceType === 'mobile-small' || deviceType === 'mobile') && orientation === 'portrait' && (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.15) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.1) 100%)',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default Pattern;