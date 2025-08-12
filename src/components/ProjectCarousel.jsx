import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

// Import des images
import institutCorailLogo from '../assets/institut-corail/logoinstitutcorail.png';
import ascLogo from '../assets/asc/asclogo.png';
import lxpLogo from '../assets/lxp/lxplogo.png';
import irisLogo from '../assets/iris/irislogo.png';
import spacedriverLogo from '../assets/spacedriver/spacedriverlogo.png';
import iamcryptoLogo from '../assets/iamcrypto/mockup-mac.png';
import maisonlicLogo from '../assets/maisonlic/logo.png';
import orapiLogo from '../assets/orapi/orapilogo.png';

const ProjectCarousel = () => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Institut Corail",
      image: institutCorailLogo,
      description: "Institut de beauté et soins esthétiques haut de gamme",
      category: "Site Web, E-commerce & SEO"
    },
    {
      id: 2,
      name: "ASC",
      image: ascLogo,
      description: "Stage de 7 mois chez Advanced Silicone Coating (Groupe Hartmann), une entreprise spécialisée dans les solutions de pansements",
      category: "Site Web, Growth Marketing & Design"
    },
    {
      id: 3,
      name: "LXP",
      image: lxpLogo,
      description: "Jeu vidéo éducatif pour l'apprentissage des langues",
      category: "Jeu Vidéo & Site Web"
    },
    {
      id: 4,
      name: "Iris",
      image: irisLogo,
      description: "Machine Learning pour la prédiction de la largeur de sépale",
      category: "Intelligence Artificielle"
    },
    {
      id: 5,
      name: "Space Driver",
      image: spacedriverLogo,
      description: "Simulateur de conduite spatiale",
      category: "Jeu Vidéo"
    },
    {
      id: 6,
      name: "I AM CRYPTO",
      image: iamcryptoLogo,
      description: "Récolte les cryptomonnaies en jouant Playboi Carti",
      category: "Jeu Vidéo"
    },
    {
      id: 7,
      name: "Maison L.I.C",
      image: maisonlicLogo,
      description: "Art floral et décoration d'intérieur",
      category: "Site Web & SEO"
    },
    {
      id: 8,
      name: "Orapi",
      image: orapiLogo,
      description: "Gestion de données et ChatBot intelligent pour le support client",
      category: "Data Engineering & IA",
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const navigate = useNavigate();

  const handleProjectsPageClick = () => {
    navigate('/projects');
  };

  return (
    <motion.section 
      className="w-full py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Mes <span style={{ color: '#3F8391' }}>Projets</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Découvrez une sélection de projets que j'ai réalisé au cours de ma carrière.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl border border-white/10 max-w-4xl mx-auto"
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
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Main Carousel */}
          <div className="relative h-64 sm:h-72 md:h-80">
            <div 
              className="flex transition-transform duration-700 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-w-full h-full relative group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectsPageClick()}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredProject === project.id ? 1.05 : 1,
                        filter: hoveredProject === project.id ? "brightness(0.7)" : "brightness(1)"
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Gradient Overlay - Only on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <motion.div 
                      initial={{ y: 30, opacity: 0 }}
                      animate={hoveredProject === project.id ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div 
                        className="backdrop-blur-lg rounded-lg p-3 sm:p-2 border border-white/10 max-w-72 sm:max-w-64"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <motion.div 
                          className="flex items-center gap-2 mb-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={hoveredProject === project.id ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <span 
                            className="px-2 py-1 rounded-md text-xs font-medium border"
                            style={{
                              backgroundColor: 'rgba(63, 131, 145, 0.15)',
                              color: '#3F8391',
                              borderColor: 'rgba(63, 131, 145, 0.2)'
                            }}
                          >
                            {project.category}
                          </span>
                        </motion.div>
                        
                        <motion.p 
                          className="text-gray-300 text-xs leading-relaxed"
                          initial={{ x: -10, opacity: 0 }}
                          animate={hoveredProject === project.id ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                        >
                          {project.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Project Title (Always Visible) */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
                      animate={{
                        textShadow: hoveredProject === project.id 
                          ? "0 0 20px rgba(63, 131, 145, 0.8)" 
                          : "0 2px 4px rgba(0, 0, 0, 0.8)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.name}
                    </motion.h3>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Plus minimalistes */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-3 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-6 sm:h-6 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/70 transition-all duration-200 touch-manipulation"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: 'rgba(63, 131, 145, 0.1)',
              color: '#3F8391'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ChevronLeft size={14} />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-3 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-6 sm:h-6 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/70 transition-all duration-200 touch-manipulation"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: 'rgba(63, 131, 145, 0.1)',
              color: '#3F8391'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ChevronRight size={14} />
          </motion.button>

          {/* Dots Indicator */}
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? '#3F8391' : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === currentIndex ? '0 0 8px rgba(63, 131, 145, 0.4)' : 'none'
                }}
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: '#3F8391'
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.1 : 1
                }}
              />
            ))}
          </motion.div>

          {/* Auto-play Indicator */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isAutoPlaying ? '#10B981' : '#6B7280'
              }}
              animate={{
                scale: isAutoPlaying ? [1, 1.2, 1] : 1,
                opacity: isAutoPlaying ? [1, 0.5, 1] : 0.7
              }}
              transition={{
                duration: 2,
                repeat: isAutoPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Bouton Voir mes projets */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={handleProjectsPageClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #3F8391 0%, #5ba3b0 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px rgba(63, 131, 145, 0.2)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 6px 20px rgba(63, 131, 145, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} />
            Voir mes projets
          </motion.button>
        </motion.div>
        
        {/* Project Counter */}
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-400 text-sm">
            {currentIndex + 1} / {projects.length}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectCarousel;