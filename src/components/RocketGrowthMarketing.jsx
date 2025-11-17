import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import rocketSimple from '../assets/rocket/rocket-simple.webp';
import rocketFire from '../assets/rocket/rocket-fire.webp';

const RocketGrowthMarketing = () => {
  const [currentService, setCurrentService] = useState(0);
  const [score, setScore] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ x: 50, y: 50 });
  const gameAreaRef = useRef(null);

  // Mots-clés des compétences intégrés dans les services
  const services = [
    "Analytics Avancée",
    "Ciblage Précis", 
    "Communication Digitale",
    "Automatisation Marketing",
    "Web Scraping",
    "Génération de Leads",
    "Stratégie Growth",
    "Intelligence Artificielle",
    "Data Science",
    "Machine Learning"
  ];

  // Gestion du mouvement de la souris
  const handleMouseMove = (e) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setRocketPosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
    }
  };

  // Gestion des clics
  const handleMouseDown = () => {
    setIsPressed(true);
    
    // Progression des services
    setScore(prev => {
      const newScore = prev + 1;
      const serviceIndex = Math.floor(newScore / 3) % services.length;
      setCurrentService(serviceIndex);
      return newScore;
    });
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  // Effet de particules d'étoiles
  const StarField = () => {
    const stars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 3
    }));

    return (
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + star.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Growth <span style={{ color: '#3F8391' }}>Marketing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explorez mes compétences en Growth Marketing, Data Science et Intelligence Artificielle. 
            Pilotez la fusée pour débloquer tous mes services !
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Services Panel - Left side */}
          <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
            {/* Current Service */}
            <div 
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.12) 0%, 
                    rgba(255, 255, 255, 0.04) 25%, 
                    rgba(63, 131, 145, 0.08) 50%,
                    rgba(255, 255, 255, 0.02) 75%, 
                    rgba(0, 0, 0, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Service Actuel</h3>
                  <div 
                    className="text-sm px-4 py-2 rounded-full border animate-pulse"
                    style={{
                      background: 'rgba(63, 131, 145, 0.2)',
                      color: '#3F8391',
                      borderColor: 'rgba(63, 131, 145, 0.3)'
                    }}
                  >
                    Score: {score}
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#3F8391] to-[#5BA3B0] bg-clip-text mb-4 animate-bounce">
                  {services[currentService]}
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>Progression</span>
                    <span>{currentService + 1}/{services.length}</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-[#3F8391] to-[#5BA3B0] transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${((currentService + 1) / services.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div 
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.04) 50%, 
                    rgba(0, 0, 0, 0.06) 100%
                  )
                `,
                backdropFilter: 'blur(25px) saturate(150%)',
                WebkitBackdropFilter: 'blur(25px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="relative z-10">
                <h4 className="text-white font-semibold mb-4">Compétences Débloquées</h4>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service, index) => (
                    <div
                      key={service}
                      className={`p-4 rounded-xl text-center transition-all duration-500 transform relative overflow-hidden ${
                        index <= currentService
                          ? 'bg-gradient-to-r from-[#3F8391]/30 to-black/30 text-white border border-[#3F8391]/50 scale-105 shadow-lg'
                          : 'bg-black/20 text-white/40 border border-white/10 scale-95 hover:scale-100 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className="font-medium transition-all duration-300">{service}</span>
                        {index <= currentService && (
                          <div className="relative">
                            <div className="w-3 h-3 bg-[#3F8391] rounded-full animate-ping"></div>
                            <div 
                              className="absolute inset-0 w-3 h-3 bg-[#5BA3B0] rounded-full animate-pulse"
                              style={{animationDelay: '1s'}}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Game Container - Right side */}
          <div className="flex-1 h-[600px] lg:h-[700px] relative">
            <div 
              ref={gameAreaRef}
              className="absolute inset-0 rounded-3xl overflow-hidden cursor-crosshair select-none"
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(20, 40, 80, 0.4) 0%, 
                    rgba(10, 20, 40, 0.6) 50%, 
                    rgba(0, 0, 0, 0.9) 100%
                  )
                `,
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Champ d'étoiles */}
              <StarField />
              
              {/* Fusée */}
              <motion.img
                src={isPressed ? rocketFire : rocketSimple}
                alt="Rocket"
                className="absolute w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none"
                style={{
                  left: `${rocketPosition.x}%`,
                  top: `${rocketPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 0 10px rgba(63, 131, 145, 0.5))'
                }}
                animate={{
                  scale: isPressed ? [1, 1.2, 1.1] : [1, 1.05, 1],
                  rotate: isPressed ? [0, 5, -5, 0] : 0
                }}
                transition={{
                  duration: isPressed ? 0.3 : 2,
                  repeat: isPressed ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Effet de propulsion quand on appuie */}
              {isPressed && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    left: `${rocketPosition.x}%`,
                    top: `${rocketPosition.y + 8}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 100, 0, 0.8) 0%, rgba(255, 200, 0, 0.4) 50%, transparent 100%)',
                    width: '40px',
                    height: '40px'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [1, 0.5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
              
              {/* Effets de particules lors du clic */}
              {isPressed && (
                <div className="absolute inset-0">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 bg-[#3F8391] rounded-full"
                      style={{
                        left: `${rocketPosition.x + (Math.random() - 0.5) * 20}%`,
                        top: `${rocketPosition.y + (Math.random() - 0.5) * 20}%`
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [1, 0.8, 0],
                        y: [0, -50],
                        x: [(Math.random() - 0.5) * 100]
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketGrowthMarketing;