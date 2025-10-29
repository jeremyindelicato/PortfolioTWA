import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Users,
  Monitor,
  Clock,
  Star,
  Bot
} from 'lucide-react';

const CredibilityDashboard = ({ className = "" }) => {
  const { isDarkMode } = useTheme();
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    websites: 0,
    mobileApps: 0,
    deliveryTime: 0,
    rating: 0,
    aiProjects: 0
  });

  const finalValues = {
    clients: 12,
    websites: 16,
    mobileApps: 2,
    deliveryTime: 9,
    rating: 4.6,
    aiProjects: 6
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setAnimatedValues({
          clients: Math.floor(finalValues.clients * easeProgress),
          websites: Math.floor(finalValues.websites * easeProgress),
          mobileApps: Math.floor(finalValues.mobileApps * easeProgress),
          deliveryTime: Math.floor(finalValues.deliveryTime * easeProgress),
          rating: Math.floor(finalValues.rating * easeProgress * 10) / 10,
          aiProjects: Math.floor(finalValues.aiProjects * easeProgress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues(finalValues);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  const deliveryData = [5, 8, 6, 9, 7];

  return (
    <motion.section 
      className={`w-full py-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{ fontFamily: 'LEMONMILK, sans-serif' }}>
            MES <span style={{ color: '#3F8391' }}>RÉSULTATS</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Des données concrètes qui témoignent de mon expertise et de la satisfaction de mes clients
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <div 
          className={`rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 ${
            isDarkMode ? 'border-white/10' : 'border-gray-300/30'
          }`}
          style={{
            background: isDarkMode ? `
              linear-gradient(135deg,
                rgb(30, 30, 30) 0%,
                rgb(20, 20, 20) 50%,
                rgb(25, 25, 25) 100%
              ),
              radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.3) 0%, transparent 50%)
            ` : `
              linear-gradient(135deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(248, 248, 248, 1) 50%,
                rgba(252, 252, 252, 1) 100%
              ),
              radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.2) 0%, transparent 50%)
            `,
            boxShadow: isDarkMode ? `
              0 20px 50px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            ` : `
              0 20px 50px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `
          }}
        >
          {/* Métriques principales - Version simplifiée */}
          <motion.div
            className={`p-6 rounded-2xl mb-8 transition-all duration-500 ${
              isDarkMode ? 'border-white/10' : 'border-gray-300/30'
            }`}
            style={{
              background: isDarkMode ? `
                linear-gradient(135deg,
                  rgb(35, 35, 35) 0%,
                  rgb(28, 28, 28) 100%
                )
              ` : `
                linear-gradient(135deg,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(250, 250, 250, 1) 100%
                )
              `,
              boxShadow: isDarkMode ? '0 4px 16px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.12)'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={`text-xl font-bold mb-6 text-center transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Vue d'Ensemble</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <motion.div
                className={`text-center p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#3F8391] mb-1 group-hover:text-[#5aa4b3]"
                >
                  3 mois
                </motion.div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>Maintenance Offerte</div>
                <motion.div
                  className="mt-2 h-1 bg-gradient-to-r from-[#3F8391] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
              <motion.div 
                className={`text-center p-4 rounded-xl cursor-pointer transition-all duration-300 group ${ 
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#F59E0B] mb-1 group-hover:text-[#fbbf24]"
                >
                  {animatedValues.websites + animatedValues.mobileApps}
                </motion.div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>Projets Livrés</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#F59E0B] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((animatedValues.websites + animatedValues.mobileApps) / (finalValues.websites + finalValues.mobileApps)) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </motion.div>
              <motion.div 
                className={`text-center p-4 rounded-xl cursor-pointer transition-all duration-300 group ${ 
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#10B981] mb-1 group-hover:text-[#34d399]"
                >
                  {animatedValues.deliveryTime}j
                </motion.div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>Délai Moyen</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#10B981] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(animatedValues.deliveryTime / finalValues.deliveryTime) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
              </motion.div>
              <motion.div
                className={`text-center p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#8B5CF6] mb-1 group-hover:text-[#a78bfa] flex items-center justify-center gap-1"
                >
                  100%
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Star size={20} fill="currentColor" />
                  </motion.div>
                </motion.div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                }`}>Clients Satisfaits</div>
                <motion.div
                  className="mt-2 h-1 bg-gradient-to-r from-[#8B5CF6] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Graphiques détaillés - Focus sur les visualisations */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {/* Graphique en barres - Délais de livraison */}
            <motion.div
              className={`p-6 rounded-xl transition-all duration-500 ${
                isDarkMode ? 'border-white/10' : 'border-gray-300/30'
              }`}
              style={{
                background: isDarkMode ? `rgb(40, 35, 30)` : `rgba(245, 158, 11, 0.30)`,
                borderColor: '#F59E0B'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Monitor size={20} color="#F59E0B" />
                Délais de Livraison - 5 Derniers Projets
              </h4>
              <div className="flex items-end justify-center h-32 gap-6">
                {deliveryData.map((days, index) => {
                  // Palette de 2 couleurs alternées
                  const colors = [
                    { bg: '#3F8391', shadow: 'rgba(63, 131, 145, 0.3)', shadowHover: 'rgba(63, 131, 145, 0.5)' }, // Turquoise
                    { bg: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.3)', shadowHover: 'rgba(139, 92, 246, 0.5)' }  // Violet
                  ];
                  const color = colors[index % 2];

                  return (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center group cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex-1 flex items-end" style={{ width: '40px' }}>
                        <motion.div
                          className="rounded-t-lg shadow-lg relative overflow-hidden"
                          style={{
                            backgroundColor: color.bg,
                            boxShadow: `0 4px 12px ${color.shadow}`,
                            minHeight: '20px',
                            width: '40px'
                          }}
                          initial={{ height: '20px' }}
                          animate={{ height: `${Math.max(20, (days / 15) * 120)}px` }}
                          transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                          title={`${days} jours`}
                          whileHover={{
                            boxShadow: `0 8px 24px ${color.shadowHover}`,
                            y: -2
                          }}
                        >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scaleY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{ originY: 1 }}
                        />
                        <motion.div
                          className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                          animate={{ 
                            y: [0, -5, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: index * 0.2 
                          }}
                        />
                      </motion.div>
                    </div>
                    <motion.span 
                      className={`text-sm mt-2 font-medium transition-colors duration-500 ${
                        isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      P{index + 1}
                    </motion.span>
                    <motion.span
                      className={`text-xs font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-white group-hover:text-yellow-300' : 'text-gray-800 group-hover:text-yellow-600'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {days}j
                    </motion.span>
                  </motion.div>
                  );
                })}
              </div>
              <div className={`text-sm mt-4 text-center transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Moyenne: 9 jours | Objectif: &lt;15 jours | 🎯 Performance excellente
              </div>
            </motion.div>

          </div>

          {/* Graphiques de performance */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-6 sm:mt-8">
            {/* Timeline IA - Enrichie avec détails */}
            <motion.div
              className={`p-6 rounded-xl transition-all duration-500 ${
                isDarkMode ? 'border-white/10' : 'border-gray-300/30'
              }`}
              style={{
                background: isDarkMode ? `rgb(40, 30, 30)` : `rgba(239, 68, 68, 0.30)`,
                borderColor: '#EF4444'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <Bot size={20} color="#EF4444" />
                Automatisations IA - Déploiements 2025
              </h4>
              
              {/* Statistiques IA */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <motion.div 
                  className={`text-center p-2 rounded-lg cursor-pointer group relative overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-white/90'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(239, 68, 68, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="text-lg font-bold text-red-400 relative z-10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 1.6
                    }}
                  >
                    6
                  </motion.div>
                  <div className={`text-xs relative z-10 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`}>Déployées</div>
                </motion.div>
                <motion.div 
                  className={`text-center p-2 rounded-lg cursor-pointer group relative overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-white/90'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="text-lg font-bold text-orange-400 relative z-10"
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1.8
                    }}
                  >
                    2
                  </motion.div>
                  <div className={`text-xs relative z-10 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`}>En cours</div>
                </motion.div>
                <motion.div 
                  className={`text-center p-2 rounded-lg cursor-pointer group relative overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-white/90'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(34, 197, 94, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="text-lg font-bold text-green-400 relative z-10 flex items-center justify-center gap-1"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 2
                    }}
                  >
                    95%
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="text-xs"
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                  <div className={`text-xs relative z-10 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`}>Succès</div>
                </motion.div>
              </div>
              
              {/* Graphique timeline amélioré */}
              <div className="relative h-16 mb-4">
                <svg className="w-full h-full" viewBox="0 0 120 64">
                  {/* Area chart avec dégradé */}
                  <defs>
                    <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  <motion.path
                    d="M10,50 L30,60 L50,30 L70,40 L90,60 L110,30 L110,60 L10,60 Z"
                    fill="url(#aiGradient)"
                    stroke="#EF4444" strokeWidth="3"
                    initial={{ pathLength: 0, fillOpacity: 0 }}
                    animate={{ pathLength: 1, fillOpacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  />
                  
                  {/* Points de données */}
                  {[30, 50, 70, 90, 110].map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x} cy={[60, 30, 40, 60, 30][i]}
                      r="3" fill="#EF4444"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.1 }}
                    />
                  ))}
                </svg>
              </div>
              
              {/* Liste des IA déployées */}
              <motion.div 
                className={`rounded-lg p-3 mb-4 ${
                  isDarkMode ? 'bg-black/20' : 'bg-white/60'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <motion.div 
                  className={`text-xs mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  animate={{ 
                    color: [isDarkMode ? "#9CA3AF" : "#6B7280", "#3F8391", isDarkMode ? "#9CA3AF" : "#6B7280"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  IA Déployées:
                </motion.div>
                <div className="space-y-1 text-xs">
                  <motion.div 
                    className="flex justify-between p-1 rounded cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)", x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.4 }}
                  >
                    <span className={`transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`}>• ChatBot Support Client</span>
                    <motion.span 
                      className="text-green-400 flex items-center gap-1"
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ✓
                      </motion.div>
                      Actif
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-1 rounded cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)", x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.6 }}
                  >
                    <span className={`transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`}>• Analyse Sentiment</span>
                    <motion.span 
                      className="text-green-400 flex items-center gap-1"
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2.7 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ✓
                      </motion.div>
                      Actif
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-1 rounded cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)", x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.8 }}
                  >
                    <span className={`transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`}>• Recommandations Produits</span>
                    <motion.span 
                      className="text-green-400 flex items-center gap-1"
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2.9 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ✓
                      </motion.div>
                      Actif
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-1 rounded cursor-pointer group"
                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.1)", x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.0 }}
                  >
                    <span className={`transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`}>• Classification Documents</span>
                    <motion.span 
                      className="text-orange-400 flex items-center gap-1"
                      animate={{ 
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⚠
                      </motion.div>
                      En cours
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
              
              <div className={`text-sm text-center transition-colors duration-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                🤖 Gain productivité: +73% • ⏱️ Temps économisé: 120h/mois
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default CredibilityDashboard;