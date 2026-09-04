import { motion } from 'framer-motion';
import { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
// Import des images d'inspiration
import img1 from '../assets/inspirations/Adam-Scott-Severance.webp';
import img2 from '../assets/inspirations/Quand-la-machine-apprend.webp';
import img3 from '../assets/inspirations/elden-ring.webp';
import img4 from '../assets/inspirations/mbdtf.webp';
import img5 from '../assets/inspirations/miyamoto.webp';
import img6 from '../assets/inspirations/sanji.webp';
import img7 from '../assets/inspirations/spderman.webp';
import img8 from '../assets/inspirations/zinedine-zidane.webp';

const InspirationMarquee = () => {
  const { t } = useLanguage();

  // Structure du contenu avec alternance images/texte
  const content = [
    { type: 'image', content: img1 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img2 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img3 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img4 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img5 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img6 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img7 },
    { type: 'text', content: t(translations.inspiration.text) },
    { type: 'image', content: img8 },
    { type: 'text', content: t(translations.inspiration.text) }
  ];

  // Créer plusieurs copies pour un défilement vraiment infini
  const renderContent = (startIndex) => 
    content.map((item, itemIndex) => {
      const uniqueKey = `${startIndex}-${itemIndex}`;
      
      if (item.type === 'image') {
        return (
          <motion.div
            key={uniqueKey}
            className="flex-shrink-0 mx-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.content}
              alt="Inspiration"
              className={`w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-28 object-cover rounded-xl border transition-all duration-300 border-gray-300/30`}
            />
          </motion.div>
        );
      } else {
        return (
          <div
            key={uniqueKey}
            className={`flex-shrink-0 text-xl md:text-2xl lg:text-3xl font-light italic tracking-wide mx-4 transition-colors duration-500 text-gray-800/90`}
          >
            {item.content}
          </div>
        );
      }
    });

  // Générer beaucoup de copies pour que le défilement soit vraiment infini
  const infiniteContent = [];
  for (let i = 0; i < 10; i++) {
    infiniteContent.push(...renderContent(i));
  }


  return (
    <div className="w-full relative overflow-hidden">

      {/* Conteneur principal avec design liquid glass */}
      <div 
        className={`h-32 rounded-2xl border overflow-hidden relative mx-4 transition-all duration-500 border-gray-300/30`}
        style={{
          background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(255, 255, 255, 0.85) 100%
            )`,
          backdropFilter: 'blur(24px)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.1)
          `
        }}
      >
        {/* Effets de fade sur les bords */}
        <div
          className="absolute left-0 top-0 w-16 h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.15), transparent)'
          }}
        />
        <div
          className="absolute right-0 top-0 w-16 h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(255,255,255,0.3), rgba(255,255,255,0.15), transparent)'
          }}
        />
        
        {/* Animation marquee */}
        <div className="flex items-center h-full animate-infinite-scroll">
          {infiniteContent}
        </div>
      </div>
      
      {/* Styles CSS pour l'animation */}
      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 150s linear infinite;
          width: max-content;
        }
        
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 120s linear infinite;
          }
        }
        
        @media (max-width: 480px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 90s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(InspirationMarquee);