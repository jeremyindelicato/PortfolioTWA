import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import rocketSimple from '../assets/rocket/rocket-simple.webp';
import rocketFire from '../assets/rocket/rocket-fire.webp';

const GrowthMarketingSection = () => {
  const { isDarkMode } = useTheme();
  const [hoveredRocket, setHoveredRocket] = useState(null);
  const competences = [
    {
      title: "Analytics Avancée",
      description: "Analyse approfondie des données pour optimiser les performances",
      icon: "📊"
    },
    {
      title: "Ciblage Précis", 
      description: "Identification et segmentation des audiences cibles",
      icon: "🎯"
    },
    {
      title: "Communication",
      description: "Stratégies de communication multicanales engageantes",
      icon: "💬"
    },
    {
      title: "Automatisation",
      description: "Automatisation des processus marketing et workflows",
      icon: "⚡"
    },
    {
      title: "Scrapping",
      description: "Extraction intelligente de données pour la veille concurrentielle",
      icon: "🔍"
    },
    {
      title: "Génération de Leads",
      description: "Acquisition et nurturing de prospects qualifiés",
      icon: "🎪"
    },
  ];

  return (
    <div className="w-full py-20">
      {/* Header avec fusée */}
      <motion.div 
        className="text-center mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.img
            src={hoveredRocket === 'header-left' ? rocketFire : rocketSimple}
            alt="Growth Rocket"
            className="w-12 h-12 md:w-16 md:h-16 cursor-pointer transition-all duration-200"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            onMouseEnter={() => setHoveredRocket('header-left')}
            onMouseLeave={() => setHoveredRocket(null)}
          />
          <h2 className={`text-4xl md:text-5xl font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{ fontFamily: 'LEMONMILK, sans-serif' }}>
            GROWTH <span style={{ color: '#3F8391' }}>MARKETING</span>
          </h2>
          <motion.img
            src={hoveredRocket === 'header-right' ? rocketFire : rocketSimple}
            alt="Growth Rocket"
            className="w-12 h-12 md:w-16 md:h-16 scale-x-[-1] cursor-pointer transition-all duration-200"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            onMouseEnter={() => setHoveredRocket('header-right')}
            onMouseLeave={() => setHoveredRocket(null)}
          />
        </div>
        
        <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Propulsez votre croissance avec des stratégies marketing data-driven 
          et des outils d'automatisation avancés
        </p>
      </motion.div>

      {/* Grille des compétences */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {competences.map((competence, index) => (
          <motion.div
            key={competence.title}
            className="relative group"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div 
              className={`relative rounded-2xl p-6 h-full overflow-hidden border transition-all duration-300 group-hover:border-[#3F8391]/50 ${
                isDarkMode ? '' : 'border-gray-300/30'
              }`}
              style={{
                background: isDarkMode ? `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.02) 50%, 
                    rgba(63, 131, 145, 0.05) 100%
                  )
                ` : `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(255, 255, 255, 0.85) 50%, 
                    rgba(63, 131, 145, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3F8391]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <div className="relative z-10">
                {/* Icône */}
                <div className="text-4xl mb-4 flex items-center justify-between">
                  <span>{competence.icon}</span>
                  {/* Mini fusée qui apparaît au hover */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onMouseEnter={() => setHoveredRocket(`card-${index}`)}
                    onMouseLeave={() => setHoveredRocket(null)}
                  >
                    <img 
                      src={hoveredRocket === `card-${index}` ? rocketFire : rocketSimple} 
                      alt="rocket" 
                      className="w-6 h-6 transition-all duration-200" 
                    />
                  </motion.div>
                </div>
                
                {/* Titre */}
                <h3 className={`text-xl font-semibold mb-3 group-hover:text-[#3F8391] transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {competence.title}
                </h3>
                
                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {competence.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default GrowthMarketingSection;