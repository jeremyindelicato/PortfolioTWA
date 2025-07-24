import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypewriterEffect = () => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'développe des sites web',
        'crée des applications mobiles', 
        'conçois des solutions IA',
        'optimise votre SEO',
        'gère vos bases de données',
        'design vos interfaces',
        'anime vos projets',
        'développe votre e-commerce',
        'rédige vos mentions légales',
        'assure votre conformité RGPD',
        'gère votre hébergement',
        'choisis votre nom de domaine',
        'booste votre croissance'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: true
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return <span ref={el}></span>;
};

export default TypewriterEffect;