import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

gsap.registerPlugin(SplitText);

const SkillsSection = () => {
  const headlineRef = useRef(null);
  const animatedRef = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    const element = headlineRef.current;
    if (!element || animatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          // Attendre que les fonts soient chargées
          requestAnimationFrame(() => {
            gsap.set(element, { opacity: 1 });

            const headlineSplit = new SplitText(element, {
              type: "words",
              wordsClass: "skill-word++",
            });

            gsap.from(headlineSplit.words, {
              y: -100,
              opacity: 0,
              rotation: () => gsap.utils.random(-80, 80),
              stagger: 0.1,
              duration: 1,
              ease: "back.out(1.7)",
              clearProps: "all"
            });
          });
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full py-20">
      <style>{`
        .skills-headline {
          opacity: 0;
          font-family: 'LEMONMILK', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: bold;
          text-align: center;
          line-height: 1.6;
        }

        .skills-container {
          position: relative;
          width: 90vw;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 9px;
          padding: 0 1rem;
        }

        .skill-line {
          overflow: hidden;
        }

        .skill-word {
          display: inline-block;
          border: 1.5px dashed rgba(63, 131, 145, 0.3);
          background: linear-gradient(135deg, #3F8391 0%, #5ba3b0 100%);
          background-size: 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          min-height: 40px;
          padding: 0.5rem 0.8rem;
          border-radius: 10px;
          margin: 0.25rem;
          transition: all 0.3s ease;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
        }

        .skill-word:hover {
          border-color: rgba(63, 131, 145, 0.6);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(63, 131, 145, 0.2);
        }

        @media (max-width: 768px) {
          .skills-headline {
            font-size: clamp(0.85rem, 2.2vw, 1.1rem);
          }

          .skill-word {
            min-height: 36px;
            padding: 0.4rem 0.6rem;
            font-size: clamp(0.8rem, 1.8vw, 1rem);
            margin: 0.2rem;
          }
        }

        @media (max-width: 480px) {
          .skills-headline {
            font-size: clamp(0.75rem, 2vw, 0.95rem);
          }

          .skill-word {
            min-height: 32px;
            padding: 0.35rem 0.5rem;
            font-size: clamp(0.7rem, 1.6vw, 0.9rem);
          }
        }
      `}</style>

      <div className="skills-container">
        <h2 ref={headlineRef} className="skills-headline">
          {t(translations.skills.keywords)}
        </h2>
      </div>
    </section>
  );
};

export default SkillsSection;
