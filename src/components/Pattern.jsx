import React from 'react';

const Pattern = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Vidéo d'arrière-plan */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="/src/assets/autre/background.video.mp4" type="video/mp4" />
        {/* Fallback en cas d'échec de chargement de la vidéo */}
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>
      
      {/* Overlay sombre pour améliorer la lisibilité du contenu */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(0, 0, 0, 0.6)', // Overlay sombre semi-transparent
          mixBlendMode: 'normal'
        }}
      />
    </div>
  );
};

export default Pattern;