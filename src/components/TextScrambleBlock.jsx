import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Fonction pour créer l'effet SplitText (équivalent à SplitText.create)
const splitTextIntoChars = (element) => {
  const text = element.textContent;
  element.innerHTML = '';
  
  const chars = [];
  for (let i = 0; i < text.length; i++) {
    const char = document.createElement('span');
    char.className = 'char';
    char.textContent = text[i];
    char.style.willChange = 'transform';
    char.setAttribute('data-content', text[i]);
    element.appendChild(char);
    chars.push(char);
  }
  
  return { chars };
};

// Fonction pour l'effet scramble text amélioré
const scrambleText = (element, targetText, chars = '.:', speed = 0.5, duration = 1) => {
  let iteration = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.:!?@#$%&*";
  
  const interval = setInterval(() => {
    element.textContent = targetText
      .split('')
      .map((char, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        if (char === ' ') return ' '; // Préserver les espaces
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join('');
    
    if (iteration >= targetText.length) {
      element.textContent = targetText;
      clearInterval(interval);
    }
    
    iteration += speed;
  }, 50); // Plus fluide avec 50ms
};

const TextScrambleBlock = () => {
  const textBlockRef = useRef(null);
  const paragraphRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    if (!paragraphRef.current) return;

    // Diviser le texte en caractères
    const st = splitTextIntoChars(paragraphRef.current);
    charsRef.current = st.chars;

    // Gestionnaire de mouvement de la souris avec throttling
    let isAnimating = false;
    const handlePointerMove = (e) => {
      if (isAnimating) return;
      isAnimating = true;
      
      requestAnimationFrame(() => {
        charsRef.current.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) { // Rayon d'effet légèrement augmenté
            const originalText = char.getAttribute('data-content');
            const animationDuration = Math.max(0.3, 1.2 - dist / 120);
            
            // Utiliser notre fonction scramble custom
            scrambleText(char, originalText, '.:', 0.7, animationDuration);
          }
        });
        isAnimating = false;
      });
    };

    // Ajouter le gestionnaire d'événement
    if (textBlockRef.current) {
      textBlockRef.current.addEventListener('pointermove', handlePointerMove);
    }

    // Cleanup
    return () => {
      if (textBlockRef.current) {
        textBlockRef.current.removeEventListener('pointermove', handlePointerMove);
      }
    };
  }, []);

  return (
    <div 
      ref={textBlockRef}
      className="text-scramble-block relative"
      style={{
        maxWidth: '800px',
        fontFamily: '"Space Mono", monospace',
        fontWeight: 400,
        fontSize: 'clamp(18px, 3.5vw, 36px)',
        color: '#fff',
        cursor: 'crosshair',
        lineHeight: '1.6',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <p 
        ref={paragraphRef}
        style={{
          margin: 0,
          transition: 'all 0.3s ease'
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      
      {/* Effet de glow subtil */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(63, 131, 145, 0.05) 0%, transparent 60%)',
          borderRadius: '1rem'
        }}
      />
    </div>
  );
};

export default TextScrambleBlock;