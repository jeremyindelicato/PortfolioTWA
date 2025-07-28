import { motion } from 'framer-motion';

// Import des images d'inspiration
import img1 from '../assets/inspirations/Adam-Scott-Severance.jpg';
import img2 from '../assets/inspirations/Quand-la-machine-apprend.png';
import img3 from '../assets/inspirations/elden-ring.jpg';
import img4 from '../assets/inspirations/mbdtf.jpg';
import img5 from '../assets/inspirations/miyamoto.jpg';
import img6 from '../assets/inspirations/sanji.webp';
import img7 from '../assets/inspirations/spderman.jpg';
import img8 from '../assets/inspirations/zinedine-zidane.jpg';

const InspirationMarquee = () => {
  // Structure du contenu avec alternance images/texte
  const content = [
    { type: 'image', content: img1 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img2 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img3 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img4 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img5 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img6 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img7 },
    { type: 'text', content: 'ce sont mes inspirations' },
    { type: 'image', content: img8 },
    { type: 'text', content: 'ce sont mes inspirations' }
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
              className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-28 object-cover rounded-xl border border-white/10 transition-all duration-300"
            />
          </motion.div>
        );
      } else {
        return (
          <div
            key={uniqueKey}
            className="flex-shrink-0 text-white/90 text-xl md:text-2xl lg:text-3xl font-light italic tracking-wide mx-4"
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
        className="h-32 rounded-2xl border border-white/10 overflow-hidden relative mx-4"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.05) 0%, 
              rgba(255, 255, 255, 0.02) 100%
            )
          `,
          backdropFilter: 'blur(24px)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.2)
          `
        }}
      >
        {/* Effets de fade sur les bords */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black/20 via-black/10 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black/20 via-black/10 to-transparent z-10 pointer-events-none" />
        
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
          animation: infinite-scroll 120s linear infinite;
          width: max-content;
        }
        
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 90s linear infinite;
          }
        }
        
        @media (max-width: 480px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 60s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default InspirationMarquee;