import { motion } from 'framer-motion';
import { Code2, Database, Smartphone, Shield, Search, ShoppingCart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Import des logos technologies
import reactLogo from '../assets/software/React-logo.png';
import pythonLogo from '../assets/software/python-logo.png';
import htmlCssJsLogo from '../assets/software/HTML-CSS-JS-Logo.png';
import vuejsLogo from '../assets/software/Logo-Vuejs.png';
import sqlLogo from '../assets/software/sql-logo.png';
import figmaLogo from '../assets/software/figma-logo.png';
import gitLogo from '../assets/software/git-logo.png';
import blenderLogo from '../assets/software/Blender-logo.png';
import adobeLogo from '../assets/software/adobesuite-logo.png';
import pandasLogo from '../assets/software/Pandas_logo.svg.png';
import pytorchLogo from '../assets/software/Pytorch_logo.png';
import scikitLearnLogo from '../assets/software/Scikit_learn_logo.png';
import threejsLogo from '../assets/software/threejs.png';
import supabaseLogo from '../assets/software/supabase-logo.png';
import shopifyLogo from '../assets/software/shopify-logo.png';
import powerBiLogo from '../assets/software/PowerBI-logo.png';
import hostingerLogo from '../assets/software/hostinger-logo.png';
import sageX3Logo from '../assets/software/logo-erp-sage-x3.png';
import wordpressLogo from '../assets/software/wordpress-logo.png';
import analyticsLogo from '../assets/software/analytics-logo.png';
import institutCorailMockup from '../assets/institut-corail/Mockup.png';

const WebDevSection = ({ className = "" }) => {
  const { isDarkMode } = useTheme();
  const features = [
    {
      icon: Code2,
      title: "Code Clean",
      description: "Architecture moderne et maintenable"
    },
    {
      icon: Database,
      title: "Base de Données",
      description: "Gestion optimisée des données"
    },
    {
      icon: Smartphone,
      title: "Responsive",
      description: "Adapté à tous les écrans"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Protection avancée des données"
    },
    {
      icon: Search,
      title: "SEO Optimisé",
      description: "Visibilité maximale sur Google"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Solutions de vente en ligne"
    }
  ];


  return (
    <div className={`relative w-full py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <motion.h2 
          className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Développement{' '}
          <span style={{ color: '#3F8391' }}>Web</span>
        </motion.h2>
        <motion.p 
          className={`text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Des sites web modernes, performants et sécurisés. De la conception 
          à la mise en ligne, je crée des expériences digitales exceptionnelles 
          qui convertissent vos visiteurs en clients.
        </motion.p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
        
        {/* Section Visual/Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main Image Container */}
          <div 
            className={`relative h-[500px] rounded-3xl overflow-hidden border transition-all duration-500 ${
              isDarkMode ? 'border-white/10' : 'border-gray-300/30'
            }`}
            style={{
              background: isDarkMode ? `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                )
              ` : `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(255, 255, 255, 0.85) 50%, 
                  rgba(255, 255, 255, 0.9) 100%
                )
              `,
              backdropFilter: 'blur(20px)',
              boxShadow: isDarkMode ? `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              ` : `
                0 20px 50px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `
            }}
          >
            {/* Image */}
            <motion.img
              src={institutCorailMockup}
              alt="Institut Corail - Projet de développement web"
              className="w-full h-full object-cover rounded-3xl"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Overlay gradient for better text visibility */}
            <div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.2) 0%, 
                    rgba(0, 0, 0, 0.1) 50%, 
                    rgba(63, 131, 145, 0.1) 100%
                  )
                `
              }}
            />
          </div>

        </motion.div>

        {/* Section Features */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group cursor-pointer ${
                  isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-300/30 hover:border-gray-400/40'
                }`}
                style={{
                  background: isDarkMode ? `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(0, 0, 0, 0.1) 100%
                    )
                  ` : `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(255, 255, 255, 0.8) 50%, 
                      rgba(255, 255, 255, 0.85) 100%
                    )
                  `,
                  boxShadow: isDarkMode ? `
                    0 4px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  ` : `
                    0 4px 16px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8)
                  `
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, rgba(63, 131, 145, 0.3) 0%, transparent 70%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(63, 131, 145, 0.3) 0%, 
                          rgba(63, 131, 145, 0.1) 100%
                        )
                      `
                    }}
                  >
                    <feature.icon size={20} color="#3F8391" />
                  </div>
                  <h4 className={`font-semibold mb-1 text-sm transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Technologies Marquee - Full Width */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4 className={`text-lg font-semibold mb-6 text-center transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Technologies maîtrisées
        </h4>
        
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

            .marquee:hover .marquee__group {
              animation-play-state: paused;
            }

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
              <div className="tech-logo-container">
                <img src={reactLogo} alt="React" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pythonLogo} alt="Python" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={htmlCssJsLogo} alt="HTML CSS JS" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={vuejsLogo} alt="Vue.js" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={sqlLogo} alt="SQL" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={figmaLogo} alt="Figma" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={gitLogo} alt="Git" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={blenderLogo} alt="Blender" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={adobeLogo} alt="Adobe Suite" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pandasLogo} alt="Pandas" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pytorchLogo} alt="PyTorch" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={scikitLearnLogo} alt="Scikit-learn" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={threejsLogo} alt="Three.js" loading="lazy" />
              </div>
            </div>

            <div aria-hidden="true" className="marquee__group">
              <div className="tech-logo-container">
                <img src={reactLogo} alt="React" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pythonLogo} alt="Python" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={htmlCssJsLogo} alt="HTML CSS JS" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={vuejsLogo} alt="Vue.js" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={sqlLogo} alt="SQL" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={figmaLogo} alt="Figma" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={gitLogo} alt="Git" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={blenderLogo} alt="Blender" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={adobeLogo} alt="Adobe Suite" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pandasLogo} alt="Pandas" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={pytorchLogo} alt="PyTorch" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={scikitLearnLogo} alt="Scikit-learn" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={threejsLogo} alt="Three.js" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="marquee marquee--reverse">
            <div className="marquee__group">
              <div className="tech-logo-container">
                <img src={supabaseLogo} alt="Supabase" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={shopifyLogo} alt="Shopify" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={powerBiLogo} alt="Power BI" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={hostingerLogo} alt="Hostinger" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={sageX3Logo} alt="Sage X3" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={wordpressLogo} alt="WordPress" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={analyticsLogo} alt="Analytics" loading="lazy" />
              </div>
            </div>

            <div aria-hidden="true" className="marquee__group">
              <div className="tech-logo-container">
                <img src={supabaseLogo} alt="Supabase" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={shopifyLogo} alt="Shopify" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={powerBiLogo} alt="Power BI" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={hostingerLogo} alt="Hostinger" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={sageX3Logo} alt="Sage X3" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={wordpressLogo} alt="WordPress" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src={analyticsLogo} alt="Analytics" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default WebDevSection;