import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import cursorDefault from '../assets/cursor/cursor.png';
import cursorHover from '../assets/cursor/cursor-hover.png';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      setMousePosition({ x: e.clientX, y: e.clientY });
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
    
    // Masquer le curseur sur tous les éléments
    const hideDefaultCursor = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], 
        [tabindex], .cursor-pointer, [onclick] {
          cursor: none !important;
        }
        
        input:focus, textarea:focus, select:focus,
        button:hover, a:hover, [role="button"]:hover {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      return style;
    };
    
    const styleElement = hideDefaultCursor();

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
      
      // Supprimer le style personnalisé
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);


  // Ne pas afficher le curseur sur mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.img
        src={isHovering ? cursorHover : cursorDefault}
        alt="Curseur personnalisé"
        className="absolute pointer-events-none w-8 h-8"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.1 : 1,
          rotate: isClicking ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.1
        }}
      />
    </div>
  );
};

export default CustomCursor;