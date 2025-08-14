import { useState, useEffect, memo } from 'react';
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
    
    // Masquer le curseur sur tous les éléments (version renforcée)
    const hideDefaultCursor = () => {
      const style = document.createElement('style');
      style.id = 'custom-cursor-style';
      style.innerHTML = `
        /* Force sur TOUS les éléments possibles */
        *, *::before, *::after, *::backdrop {
          cursor: none !important;
        }
        
        /* Ciblage spécifique des éléments interactifs */
        html, body, div, span, p, h1, h2, h3, h4, h5, h6,
        a, button, input, textarea, select, option, label,
        form, fieldset, legend, table, tr, td, th,
        ul, ol, li, dl, dt, dd, nav, header, footer,
        section, article, aside, main, figure, figcaption,
        img, svg, canvas, video, audio, iframe, embed, object,
        [role="button"], [tabindex], [onclick], [onmouseover],
        .cursor-pointer, .clickable, .interactive,
        [data-cursor], [aria-expanded], [aria-controls] {
          cursor: none !important;
        }
        
        /* États spéciaux */
        :hover, :focus, :active, :visited, :link,
        input:focus, textarea:focus, select:focus,
        button:hover, a:hover, [role="button"]:hover,
        button:active, a:active, [role="button"]:active,
        button:focus, a:focus, [role="button"]:focus {
          cursor: none !important;
        }
        
        /* Pseudo-éléments et contenus générés */
        ::before, ::after, ::first-letter, ::first-line,
        ::selection, ::backdrop, ::placeholder {
          cursor: none !important;
        }
        
        /* Classes CSS courantes */
        .btn, .button, .link, .nav-link, .menu-item,
        .card, .modal, .dropdown, .tooltip, .popover {
          cursor: none !important;
        }
        
        /* Framework CSS (Bootstrap, etc.) */
        .btn-primary, .btn-secondary, .btn-success,
        .btn-danger, .btn-warning, .btn-info, .btn-light,
        .btn-dark, .btn-outline-primary, .btn-outline-secondary {
          cursor: none !important;
        }
        
        /* Tailwind/DaisyUI classes */
        .btn, .button, .link, .card, .modal, .dropdown {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      return style;
    };
    
    const styleElement = hideDefaultCursor();

    // Observer les mutations DOM pour forcer cursor: none sur les nouveaux éléments
    const observerCallback = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Forcer cursor: none sur le nouvel élément et ses enfants
              node.style.cursor = 'none';
              const children = node.querySelectorAll('*');
              children.forEach(child => {
                child.style.cursor = 'none';
              });
            }
          });
        }
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          // Réappliquer cursor: none si un style change
          const target = mutation.target;
          if (target && target.style) {
            target.style.cursor = 'none';
          }
        }
      });
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Forcer cursor: none périodiquement (dernier recours)
    const forceCursorInterval = setInterval(() => {
      document.body.style.cursor = 'none';
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.style.cursor !== 'none') {
          el.style.cursor = 'none';
        }
      });
    }, 1000);

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
      
      // Nettoyer les observateurs et intervalles
      observer.disconnect();
      clearInterval(forceCursorInterval);
      
      // Restaurer le curseur par défaut
      document.body.style.cursor = 'auto';
      document.body.style.userSelect = 'auto';
      
      // Restaurer cursor: auto sur tous les éléments
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.cursor = 'auto';
      });
      
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
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      <motion.img
        src={isHovering ? cursorHover : cursorDefault}
        alt="Curseur personnalisé"
        className="absolute pointer-events-none w-6 h-6"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
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

export default memo(CustomCursor);