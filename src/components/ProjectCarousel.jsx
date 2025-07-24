import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import des images
import institutCorailLogo from '../assets/institut-corail/logoinstitutcorail.png';
import ascLogo from '../assets/asc/asclogo.png';
import lxpLogo from '../assets/lxp/lxplogo.png';
import irisLogo from '../assets/iris/irislogo.png';
import spacedriverLogo from '../assets/spacedriver/spacedriverlogo.png';
import iamcryptoLogo from '../assets/iamcrypto/iamcryptologo.png';
import maisonlicLogo from '../assets/maisonlic/logo.png';
import orapiLogo from '../assets/orapi/orapilogo.png';

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Institut Corail",
      image: institutCorailLogo,
      description: "Plateforme de recherche marine et de conservation des récifs coralliens",
      category: "Recherche & Environnement"
    },
    {
      id: 2,
      name: "ASC",
      image: ascLogo,
      description: "Solution complète de gestion d'association sportive et culturelle",
      category: "Gestion & Sport"
    },
    {
      id: 3,
      name: "LXP",
      image: lxpLogo,
      description: "Plateforme d'apprentissage expérientiel nouvelle génération",
      category: "Éducation & Tech"
    },
    {
      id: 4,
      name: "Iris",
      image: irisLogo,
      description: "Assistant IA pour l'analyse et la reconnaissance visuelle",
      category: "Intelligence Artificielle"
    },
    {
      id: 5,
      name: "Space Driver",
      image: spacedriverLogo,
      description: "Jeu de simulation spatiale immersif en temps réel",
      category: "Gaming & Simulation"
    },
    {
      id: 6,
      name: "I AM CRYPTO",
      image: iamcryptoLogo,
      description: "Plateforme de trading et d'analyse de cryptomonnaies",
      category: "Fintech & Blockchain"
    },
    {
      id: 7,
      name: "Maison L.I.C",
      image: maisonlicLogo,
      description: "Site vitrine pour agence d'architecture d'intérieur haut de gamme",
      category: "Architecture & Design"
    },
    {
      id: 8,
      name: "Orapi",
      image: orapiLogo,
      description: "Solution e-commerce B2B pour produits chimiques industriels",
      category: "E-commerce & Industrie"
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span style={{ color: '#3F8391' }}>Projets</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations, alliant créativité et expertise technique
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px]">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                  
                  {/* Gradient Overlay - Only on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    hoveredProject === project.id 
                      ? 'from-black/80 via-black/40 to-transparent opacity-100' 
                      : 'opacity-0'
                  }`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-8">
                    <motion.div 
                      className={`transform transition-all duration-500 ${
                        hoveredProject === project.id 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-4 opacity-0'
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={hoveredProject === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-gray-200 mb-4 max-w-md">{project.description}</p>
                        <button 
                          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, #3F8391 0%, #5ba3b0 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 16px rgba(63, 131, 145, 0.3)'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectsPageClick();
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(63, 131, 145, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 16px rgba(63, 131, 145, 0.3)';
                          }}
                        >
                          Voir mes projets & expérience
                          <Eye size={16} />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Project Title (Always Visible) */}
                  <div className="absolute top-8 left-8">
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                      {project.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`} />
          </div>
        </motion.div>

        {/* Project Counter */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400">
            {currentIndex + 1} / {projects.length}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectCarousel;