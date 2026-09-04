import { motion } from 'framer-motion';
import { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
// Import des logos technologies
import reactLogo from '../assets/software/React-logo.webp';
import pythonLogo from '../assets/software/python-logo.webp';
import htmlCssJsLogo from '../assets/software/HTML-CSS-JS-Logo.webp';
import vuejsLogo from '../assets/software/Logo-Vuejs.webp';
import sqlLogo from '../assets/software/sql-logo.webp';
import figmaLogo from '../assets/software/figma-logo.webp';
import gitLogo from '../assets/software/git-logo.webp';
import pandasLogo from '../assets/software/Pandas_logo.svg.webp';
import pytorchLogo from '../assets/software/Pytorch_logo.webp';
import scikitLearnLogo from '../assets/software/Scikit_learn_logo.webp';
import supabaseLogo from '../assets/software/supabase-logo.webp';
import powerBiLogo from '../assets/software/PowerBI-logo.webp';
import sageX3Logo from '../assets/software/logo-Sage-X3-1.webp';
import analyticsLogo from '../assets/software/analytics-logo.webp';
import dbtLogo from '../assets/software/dbt-logo.webp';
import azureLogo from '../assets/software/Microsoft_Azure_Logo.svg.webp';
import databricksLogo from '../assets/software/databricks-logo.webp';
import gsapLogo from '../assets/software/GSAP_2023.webp';

const TechnologiesSection = () => {
  const { t } = useLanguage();

  // Rangée 1 - Technologies Web & Frontend
  const technologiesRow1 = [
    { logo: reactLogo, name: 'React' },
    { logo: htmlCssJsLogo, name: 'HTML CSS JS' },
    { logo: vuejsLogo, name: 'Vue.js' },
    { logo: figmaLogo, name: 'Figma' },
    { logo: gitLogo, name: 'Git' },
    { logo: gsapLogo, name: 'GSAP' },
    { logo: supabaseLogo, name: 'Supabase' }
  ];

  // Rangée 2 - Technologies Data & BI (complètement différente)
  const technologiesRow2 = [
    { logo: pythonLogo, name: 'Python' },
    { logo: sqlLogo, name: 'SQL' },
    { logo: pandasLogo, name: 'Pandas' },
    { logo: pytorchLogo, name: 'PyTorch' },
    { logo: scikitLearnLogo, name: 'Scikit-learn' },
    { logo: powerBiLogo, name: 'Power BI' },
    { logo: azureLogo, name: 'Azure' },
    { logo: databricksLogo, name: 'Databricks' },
    { logo: dbtLogo, name: 'dbt' },
    { logo: analyticsLogo, name: 'Analytics' },
    { logo: sageX3Logo, name: 'Sage X3' }
  ];

  return (
    <motion.section
      className="w-full py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h3 className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-colors duration-500 text-gray-900`} style={{ fontFamily: 'LEMONMILK, sans-serif' }}>
          {t(translations.technologies.title)}
        </h3>

        {/* Marquee Container */}
        <div className="marquee-container py-8 sm:py-12">
          <style>{`
            .marquee-container {
              --size: clamp(4rem, 1rem + 15vmin, 6rem);
              --gap: calc(var(--size) / 8);
              --duration: 30s;
              --scroll-start: 0;
              --scroll-end: calc(-100% - var(--gap));

              width: 100%;
              max-width: 100%;
            }

            .marquee {
              display: flex;
              overflow: hidden;
              user-select: none;
              gap: var(--gap);
              mask-image: linear-gradient(
                to right,
                transparent,
                black 10%,
                black 90%,
                transparent
              );
              -webkit-mask-image: linear-gradient(
                to right,
                transparent,
                black 10%,
                black 90%,
                transparent
              );
              margin-bottom: var(--gap);
            }

            .marquee__group {
              flex-shrink: 0;
              display: flex;
              align-items: center;
              gap: var(--gap);
              min-width: 100%;
              animation: scroll-x var(--duration) linear infinite;
            }

            /* Animation continue même au survol - désactivé */
            /* .marquee:hover .marquee__group {
              animation-play-state: paused;
            } */

            .marquee--reverse .marquee__group {
              animation-direction: reverse;
              animation-delay: -3s;
            }

            @keyframes scroll-x {
              from {
                transform: translateX(var(--scroll-start));
              }
              to {
                transform: translateX(var(--scroll-end));
              }
            }

            .tech-logo-container {
              width: var(--size);
              height: calc(var(--size) * 0.8);
              border-radius: 16px;
              backdrop-filter: blur(20px) saturate(180%);
              -webkit-backdrop-filter: blur(20px) saturate(180%);
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow:
                0 4px 16px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: calc(var(--size) / 12);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }

            .tech-logo-container::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(63, 131, 145, 0.3),
                transparent
              );
              transition: left 0.5s ease;
            }

            .tech-logo-container:hover {
              transform: translateY(-4px) scale(1.05);
              background: linear-gradient(135deg, rgba(63, 131, 145, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
              box-shadow:
                0 8px 24px rgba(63, 131, 145, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
              border-color: rgba(63, 131, 145, 0.4);
            }

            .tech-logo-container:hover::before {
              left: 100%;
            }

            .tech-logo-container img {
              width: 80%;
              height: 80%;
              object-fit: contain;
              filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
              transition: filter 0.3s ease;
            }

            .tech-logo-container:hover img {
              filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
            }

            @media (prefers-reduced-motion: reduce) {
              .marquee__group {
                animation-play-state: paused;
              }

              .tech-logo-container {
                transition: none;
              }

              .tech-logo-container:hover {
                transform: none;
              }
            }

            @media (max-width: 640px) {
              .marquee-container {
                --size: 4.5rem;
                --duration: 40s;
              }

              .marquee {
                gap: calc(var(--size) / 6);
              }
            }

            @media (max-width: 475px) {
              .marquee-container {
                --size: 4rem;
                --duration: 45s;
              }
            }
          `}</style>

          <div className="marquee">
            <div className="marquee__group">
              {technologiesRow1.map((tech, index) => (
                <div key={index} className="tech-logo-container">
                  <img src={tech.logo} alt={tech.name} loading="lazy" />
                </div>
              ))}
            </div>

            <div aria-hidden="true" className="marquee__group">
              {technologiesRow1.map((tech, index) => (
                <div key={`dup-${index}`} className="tech-logo-container">
                  <img src={tech.logo} alt={tech.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="marquee marquee--reverse">
            <div className="marquee__group">
              {technologiesRow2.map((tech, index) => (
                <div key={index} className="tech-logo-container">
                  <img src={tech.logo} alt={tech.name} loading="lazy" />
                </div>
              ))}
            </div>

            <div aria-hidden="true" className="marquee__group">
              {technologiesRow2.map((tech, index) => (
                <div key={`dup-${index}`} className="tech-logo-container">
                  <img src={tech.logo} alt={tech.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(TechnologiesSection);
