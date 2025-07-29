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
        'perfectionne votre SEO',
        'gère vos bases de données',
        'design vos interfaces',
        'donne vie à votre marque',
        'développe votre e-commerce',
        'rédige vos mentions légales',
        'rédige votre conformité RGPD',
        'gère votre hébergement web',
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