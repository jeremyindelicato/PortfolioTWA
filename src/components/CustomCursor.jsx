import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMobile, setIsMobile] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);

  useEffect(() => {
    // Détection des appareils mobiles/tactiles
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768; // Breakpoint md de Tailwind
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      return isTouchDevice || isSmallScreen || hasCoarsePointer;
    };

    const currentIsMobile = checkIsMobile();
    setIsMobile(currentIsMobile);

    // Si c'est mobile, ne pas initialiser du tout le curseur personnalisé
    if (currentIsMobile) {
      // S'assurer que le curseur par défaut est restauré
      document.body.style.cursor = 'auto';
      document.body.style.userSelect = 'auto';
      
      // Cleanup complet - ne rien faire d'autre
      return () => {
        document.body.style.cursor = 'auto';
        document.body.style.userSelect = 'auto';
      };
    }

    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Mettre à jour la traînée fine
      setTrailPositions(prevTrail => {
        const newTrail = [newPosition, ...prevTrail];
        return newTrail.slice(0, 8); // Garder seulement 8 points pour une traînée fine
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Détection des éléments interactifs
    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.type === 'submit' ||
        target.role === 'button' ||
        target.style.cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.type === 'submit' ||
        target.role === 'button' ||
        target.style.cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    // Event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Masquer le curseur par défaut seulement sur desktop
    document.body.style.cursor = 'none';
    document.body.style.userSelect = 'none';

    // Surveiller les changements de taille d'écran (seulement sur desktop)
    const handleResize = () => {
      const newIsMobile = checkIsMobile();
      if (newIsMobile !== currentIsMobile) {
        // Forcer un refresh complet du composant si le statut change
        window.location.reload();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'auto';
      document.body.style.userSelect = 'auto';
    };
  }, []);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: '#3F8391',
      mixBlendMode: 'normal',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 20px rgba(63, 131, 145, 0.6), 0 0 40px rgba(63, 131, 145, 0.3)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(63, 131, 145, 0.8)',
      mixBlendMode: 'difference',
      border: '3px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 0 30px rgba(63, 131, 145, 0.8), 0 0 60px rgba(63, 131, 145, 0.4)',
    },
    click: {
      scale: 0.8,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
      border: '4px solid #3F8391',
      boxShadow: '0 0 25px rgba(255, 255, 255, 0.8), 0 0 50px rgba(63, 131, 145, 0.6)',
    }
  };

  const trailVariants = {
    default: {
      scale: 0.3,
      backgroundColor: 'rgba(63, 131, 145, 0.4)',
      opacity: 0.6,
    },
    hover: {
      scale: 0.8,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      opacity: 0.8,
    },
    click: {
      scale: 0.2,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      opacity: 1,
    }
  };

  const getCurrentVariant = () => {
    if (isClicking) return 'click';
    if (isHovering) return 'hover';
    return 'default';
  };

  // Ne pas afficher le curseur sur mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Curseur principal */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          width: 24,
          height: 24,
        }}
        animate={getCurrentVariant()}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          mass: 0.5
        }}
      >
        {/* Effet de pulsation au centre */}
        <motion.div
          className="absolute inset-1 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)'
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Traînée de particules */}
      <motion.div
        className="absolute rounded-full pointer-events-none blur-sm"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          width: 16,
          height: 16,
        }}
        animate={getCurrentVariant()}
        variants={trailVariants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
          delay: 0.02
        }}
      />

      {/* Deuxième traînée plus douce */}
      <motion.div
        className="absolute rounded-full pointer-events-none blur-md"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          width: 12,
          height: 12,
        }}
        animate={{
          ...trailVariants[getCurrentVariant()],
          scale: trailVariants[getCurrentVariant()].scale * 0.7,
          opacity: trailVariants[getCurrentVariant()].opacity * 0.5
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1,
          delay: 0.04
        }}
      />

      {/* Particules flottantes au hover */}
      <AnimatePresence>
        {isHovering && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: mousePosition.x + Math.cos(i * 60 * Math.PI / 180) * 30 - 2,
                  top: mousePosition.y + Math.sin(i * 60 * Math.PI / 180) * 30 - 2,
                  width: 4,
                  height: 4,
                  backgroundColor: 'rgba(63, 131, 145, 0.6)',
                  boxShadow: '0 0 10px rgba(63, 131, 145, 0.8)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: 360
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Effet de clic - Onde expansive */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="absolute rounded-full pointer-events-none border-2"
            style={{
              left: mousePosition.x - 20,
              top: mousePosition.y - 20,
              width: 40,
              height: 40,
              borderColor: 'rgba(63, 131, 145, 0.8)',
              backgroundColor: 'transparent'
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      {/* Effet de glow global */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          width: 80,
          height: 80,
          background: 'radial-gradient(circle, rgba(63, 131, 145, 0.1) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      />

      {/* Traînée fine supplémentaire */}
      {trailPositions.map((position, index) => (
        <motion.div
          key={`trail-${index}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: position.x - 2,
            top: position.y - 2,
            width: 4,
            height: 4,
            backgroundColor: `rgba(63, 131, 145, ${0.3 - (index * 0.035)})`,
            filter: 'blur(0.5px)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1 - (index * 0.1),
            opacity: 0.6 - (index * 0.075)
          }}
          transition={{
            type: "spring",
            stiffness: 400 - (index * 20),
            damping: 15 + index,
            mass: 0.3 + (index * 0.1)
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;