import { motion } from 'framer-motion';
import { Code2, Database, Smartphone, Globe, Shield, Zap, Search, ShoppingCart } from 'lucide-react';

const WebDevSection = ({ className = "" }) => {
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
    <div className={`relative w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Développement{' '}
          <span style={{ color: '#3F8391' }}>Web</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
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
        
        {/* Section Features */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 group cursor-pointer"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(0, 0, 0, 0.1) 100%
                    )
                  `,
                  boxShadow: `
                    0 4px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
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
                  <h4 className="font-semibold text-white mb-1 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Visual/Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main Image Container */}
          <div 
            className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                )
              `,
              backdropFilter: 'blur(20px)',
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            {/* Image */}
            <motion.img
              src="src/assets/institut-corail/Mockup.png"
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
      </div>

      {/* Technologies Marquee - Full Width */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4 className="text-lg font-semibold text-white mb-6 text-center">
          Technologies maîtrisées
        </h4>
        
        {/* Marquee Container */}
        <div className="marquee-container">
          <style>{`
            .marquee-container {
              --size: clamp(4rem, 1rem + 15vmin, 8rem);
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
          `}</style>

          <div className="marquee">
            <div className="marquee__group">
              <div className="tech-logo-container">
                <img src="src/assets/software/React-logo.png" alt="React" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/python-logo.png" alt="Python" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/HTML-CSS-JS-Logo.png" alt="HTML CSS JS" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Logo-Vuejs.png" alt="Vue.js" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/sql-logo.png" alt="SQL" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/figma-logo.png" alt="Figma" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/git-logo.png" alt="Git" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Blender-logo.png" alt="Blender" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/adobesuite-logo.png" alt="Adobe Suite" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Pandas_logo.svg.png" alt="Pandas" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Pytorch_logo.png" alt="PyTorch" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Scikit_learn_logo.png" alt="Scikit-learn" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/threejs.png" alt="Three.js" loading="lazy" />
              </div>
            </div>

            <div aria-hidden="true" className="marquee__group">
              <div className="tech-logo-container">
                <img src="src/assets/software/React-logo.png" alt="React" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/python-logo.png" alt="Python" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/HTML-CSS-JS-Logo.png" alt="HTML CSS JS" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Logo-Vuejs.png" alt="Vue.js" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/sql-logo.png" alt="SQL" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/figma-logo.png" alt="Figma" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/git-logo.png" alt="Git" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Blender-logo.png" alt="Blender" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/adobesuite-logo.png" alt="Adobe Suite" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Pandas_logo.svg.png" alt="Pandas" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Pytorch_logo.png" alt="PyTorch" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/Scikit_learn_logo.png" alt="Scikit-learn" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/threejs.png" alt="Three.js" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="marquee marquee--reverse">
            <div className="marquee__group">
              <div className="tech-logo-container">
                <img src="src/assets/software/supabase-logo.png" alt="Supabase" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/shopify-logo.png" alt="Shopify" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/PowerBI-logo.png" alt="Power BI" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/hostinger-logo.png" alt="Hostinger" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/logo-erp-sage-x3.png" alt="Sage X3" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/wordpress-logo.png" alt="WordPress" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/analytics-logo.png" alt="Analytics" loading="lazy" />
              </div>
            </div>

            <div aria-hidden="true" className="marquee__group">
              <div className="tech-logo-container">
                <img src="src/assets/software/supabase-logo.png" alt="Supabase" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/shopify-logo.png" alt="Shopify" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/PowerBI-logo.png" alt="Power BI" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/hostinger-logo.png" alt="Hostinger" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/logo-erp-sage-x3.png" alt="Sage X3" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/wordpress-logo.png" alt="WordPress" loading="lazy" />
              </div>
              <div className="tech-logo-container">
                <img src="src/assets/software/analytics-logo.png" alt="Analytics" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WebDevSection;