import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Monitor, 
  Clock, 
  Star, 
  Bot,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const CredibilityDashboard = ({ className = "" }) => {
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    websites: 0,
    mobileApps: 0,
    deliveryTime: 0,
    trafficGrowth: 0,
    leadsMultiplier: 0,
    rating: 0,
    aiProjects: 0
  });

  const finalValues = {
    clients: 12,
    websites: 16,
    mobileApps: 2,
    deliveryTime: 9,
    trafficGrowth: 43,
    leadsMultiplier: 3,
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
          trafficGrowth: Math.floor(finalValues.trafficGrowth * easeProgress),
          leadsMultiplier: Math.floor(finalValues.leadsMultiplier * easeProgress * 10) / 10,
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

  const metrics = [
    {
      id: 'clients',
      title: 'Clients servis',
      value: animatedValues.clients,
      suffix: '+',
      icon: Users,
      color: '#3F8391',
      description: 'Projets livrés avec succès',
      chartType: 'bar'
    },
    {
      id: 'projects',
      title: 'Sites & apps livrés',
      value: animatedValues.websites + animatedValues.mobileApps,
      suffix: ' projets',
      icon: Monitor,
      color: '#F59E0B',
      description: 'Total sites & applications',
      chartType: 'donut'
    },
    {
      id: 'delivery',
      title: 'Délai moyen',
      value: animatedValues.deliveryTime,
      suffix: ' jours',
      icon: Clock,
      color: '#10B981',
      description: 'Temps de livraison',
      chartType: 'radial'
    },
    {
      id: 'growth',
      title: 'Croissance client',
      value: `+${animatedValues.trafficGrowth}% / x${animatedValues.leadsMultiplier}`,
      suffix: '',
      icon: TrendingUp,
      color: '#8B5CF6',
      description: 'Trafic / leads générés',
      chartType: 'line'
    },
    {
      id: 'rating',
      title: 'Note moyenne',
      value: animatedValues.rating,
      suffix: ' / 5',
      icon: Star,
      color: '#F59E0B',
      description: 'Évaluations clients',
      chartType: 'stars'
    },
    {
      id: 'ai',
      title: 'IA déployées',
      value: animatedValues.aiProjects,
      suffix: ' sur-mesure',
      icon: Bot,
      color: '#EF4444',
      description: 'Automatisations IA',
      chartType: 'timeline'
    }
  ];

  const deliveryData = [5, 12, 8, 15, 6, 9, 11, 7];
  const trafficData = [100, 115, 125, 132, 128, 143];
  const leadsData = [10, 12, 18, 22, 28, 30];
  const ratingsData = [0, 1, 0, 2, 9]; // Distribution des notes 1-5 étoiles
  const aiTimelineData = [1, 0, 2, 1, 0, 2]; // Projets IA par mois

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mes <span style={{ color: '#3F8391' }}>Résultats</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Des données concrètes qui témoignent de mon expertise et de la satisfaction de mes clients
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <div 
          className="rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0.1) 100%
              ),
              radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.08) 0%, transparent 50%)
            `,
            boxShadow: `
              0 20px 50px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          {/* Métriques principales - Version simplifiée */}
          <motion.div
            className="p-6 rounded-2xl border border-white/10 mb-8"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.08) 0%, 
                  rgba(255, 255, 255, 0.02) 100%
                )
              `,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">Vue d'Ensemble</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <motion.div 
                className="text-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-[#3F8391] mb-1 group-hover:text-[#5aa4b3]"
                  animate={{ 
                    textShadow: animatedValues.clients > 0 ? "0 0 10px rgba(63, 131, 145, 0.5)" : "none"
                  }}
                >
                  +{animatedValues.clients}
                </motion.div>
                <div className="text-sm text-gray-300 group-hover:text-white">Clients Servis</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#3F8391] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(animatedValues.clients / finalValues.clients) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-[#F59E0B] mb-1 group-hover:text-[#fbbf24]"
                  animate={{ 
                    textShadow: (animatedValues.websites + animatedValues.mobileApps) > 0 ? "0 0 10px rgba(245, 158, 11, 0.5)" : "none"
                  }}
                >
                  {animatedValues.websites + animatedValues.mobileApps}
                </motion.div>
                <div className="text-sm text-gray-300 group-hover:text-white">Projets Livrés</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#F59E0B] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((animatedValues.websites + animatedValues.mobileApps) / (finalValues.websites + finalValues.mobileApps)) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-[#10B981] mb-1 group-hover:text-[#34d399]"
                  animate={{ 
                    textShadow: animatedValues.deliveryTime > 0 ? "0 0 10px rgba(16, 185, 129, 0.5)" : "none"
                  }}
                >
                  {animatedValues.deliveryTime}j
                </motion.div>
                <div className="text-sm text-gray-300 group-hover:text-white">Délai Moyen</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#10B981] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(animatedValues.deliveryTime / finalValues.deliveryTime) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-[#8B5CF6] mb-1 group-hover:text-[#a78bfa] flex items-center justify-center gap-1"
                  animate={{ 
                    textShadow: animatedValues.rating > 0 ? "0 0 10px rgba(139, 92, 246, 0.5)" : "none"
                  }}
                >
                  {animatedValues.rating}/5
                  <motion.div
                    animate={{ rotate: animatedValues.rating > 4 ? [0, 15, -15, 0] : 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Star size={20} fill="currentColor" />
                  </motion.div>
                </motion.div>
                <div className="text-sm text-gray-300 group-hover:text-white">Note Moyenne</div>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-[#8B5CF6] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(animatedValues.rating / finalValues.rating) * 100}%` }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Graphiques détaillés - Focus sur les visualisations */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {/* Graphique en barres - Délais de livraison */}
            <motion.div
              className="p-6 rounded-xl border border-white/10"
              style={{
                background: `rgba(245, 158, 11, 0.05)`,
                borderColor: '#F59E0B'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor size={20} color="#F59E0B" />
                Délais de Livraison - 8 Derniers Projets
              </h4>
              <div className="flex items-end justify-between h-32 gap-2">
                {deliveryData.map((days, index) => (
                  <motion.div 
                    key={index} 
                    className="flex-1 flex flex-col items-center group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex-1 flex items-end w-full">
                      <motion.div
                        className="w-full rounded-t-lg shadow-lg relative overflow-hidden"
                        style={{ 
                          backgroundColor: days <= 9 ? '#F59E0B' : '#EF4444',
                          boxShadow: `0 4px 12px ${days <= 9 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          minHeight: '20px'
                        }}
                        initial={{ height: '20px' }}
                        animate={{ height: `${Math.max(20, (days / 15) * 120)}px` }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                        title={`${days} jours`}
                        whileHover={{ 
                          boxShadow: `0 8px 24px ${days <= 9 ? 'rgba(245, 158, 11, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
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
                      className="text-sm text-gray-300 mt-2 font-medium group-hover:text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      P{index + 1}
                    </motion.span>
                    <motion.span 
                      className="text-xs text-white font-bold group-hover:text-yellow-300"
                      whileHover={{ scale: 1.2 }}
                    >
                      {days}j
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-gray-400 mt-4 text-center">
                Moyenne: 9 jours | Objectif: &lt;15 jours | 🎯 Performance excellente
              </div>
            </motion.div>

          </div>

          {/* Graphiques de performance */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-6 sm:mt-8">
            {/* Graphique linéaire - Croissance trafic/leads enrichi */}
            <motion.div
              className="p-6 rounded-xl border border-white/10"
              style={{
                background: `rgba(139, 92, 246, 0.05)`,
                borderColor: '#8B5CF6'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} color="#8B5CF6" />
                Croissance Marketing - 6 Derniers Mois
              </h4>
              
              {/* Métriques principales */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div 
                  className="text-center p-3 bg-black/20 rounded-lg cursor-pointer group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(139, 92, 246, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="text-xl font-bold text-purple-400 relative z-10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      textShadow: ["0 0 0px rgba(139, 92, 246, 0)", "0 0 10px rgba(139, 92, 246, 0.8)", "0 0 0px rgba(139, 92, 246, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    +43%
                  </motion.div>
                  <div className="text-xs text-gray-300 relative z-10 group-hover:text-white">Trafic Web</div>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-black/20 rounded-lg cursor-pointer group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(245, 158, 11, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="text-xl font-bold text-yellow-400 relative z-10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      textShadow: ["0 0 0px rgba(245, 158, 11, 0)", "0 0 10px rgba(245, 158, 11, 0.8)", "0 0 0px rgba(245, 158, 11, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.7 }}
                  >
                    x3
                  </motion.div>
                  <div className="text-xs text-gray-300 relative z-10 group-hover:text-white">Leads Générés</div>
                </motion.div>
              </div>
              
              {/* Graphique amélioré */}
              <div className="relative h-20 mb-4">
                <svg className="w-full h-full" viewBox="0 0 120 80">
                  {/* Grille de fond */}
                  <defs>
                    <pattern id="grid-purple" width="20" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 16" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-purple)" />
                  
                  {/* Ligne trafic */}
                  <motion.polyline
                    points="10,65 30,60 50,50 70,48 90,52 110,40"
                    fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                  {/* Ligne leads */}
                  <motion.polyline
                    points="10,55 30,53 50,42 70,38 90,32 110,25"
                    fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.7 }}
                  />
                  
                  {/* Points de données */}
                  <motion.circle cx="110" cy="40" r="4" fill="#8B5CF6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
                  <motion.circle cx="110" cy="25" r="4" fill="#F59E0B" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.7 }} />
                </svg>
              </div>
              
              {/* Légende détaillée */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"/>
                    <span className="text-gray-300">Trafic Organique</span>
                  </div>
                  <span className="text-purple-400 font-semibold">+43%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <span className="text-gray-300">Leads Qualifiés</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">300%</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mt-4 text-center">
                📈 Objectif 2024: +50% trafic • 🎯 Performance sur la bonne voie
              </div>
            </motion.div>


            {/* Timeline IA - Enrichie avec détails */}
            <motion.div
              className="p-6 rounded-xl border border-white/10"
              style={{
                background: `rgba(239, 68, 68, 0.05)`,
                borderColor: '#EF4444'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bot size={20} color="#EF4444" />
                Automatisations IA - Déploiements 2024
              </h4>
              
              {/* Statistiques IA */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <motion.div 
                  className="text-center p-2 bg-black/20 rounded-lg cursor-pointer group relative overflow-hidden"
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
                  <div className="text-xs text-gray-300 relative z-10 group-hover:text-white">Déployées</div>
                </motion.div>
                <motion.div 
                  className="text-center p-2 bg-black/20 rounded-lg cursor-pointer group relative overflow-hidden"
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
                      y: [0, -3, 0],
                      textShadow: ["0 0 0px rgba(249, 115, 22, 0)", "0 0 8px rgba(249, 115, 22, 0.8)", "0 0 0px rgba(249, 115, 22, 0)"]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 1.8
                    }}
                  >
                    2
                  </motion.div>
                  <div className="text-xs text-gray-300 relative z-10 group-hover:text-white">En cours</div>
                </motion.div>
                <motion.div 
                  className="text-center p-2 bg-black/20 rounded-lg cursor-pointer group relative overflow-hidden"
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
                      scale: [1, 1.1, 1],
                      textShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 10px rgba(34, 197, 94, 0.8)", "0 0 0px rgba(34, 197, 94, 0)"]
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
                  <div className="text-xs text-gray-300 relative z-10 group-hover:text-white">Succès</div>
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
                className="bg-black/20 rounded-lg p-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <motion.div 
                  className="text-xs text-gray-400 mb-2"
                  animate={{ 
                    color: ["#9CA3AF", "#3F8391", "#9CA3AF"]
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
                    <span className="text-gray-300 group-hover:text-white">• ChatBot Support Client</span>
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
                    <span className="text-gray-300 group-hover:text-white">• Analyse Sentiment</span>
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
                    <span className="text-gray-300 group-hover:text-white">• Recommandations Produits</span>
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
                    <span className="text-gray-300 group-hover:text-white">• Classification Documents</span>
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
              
              <div className="text-sm text-gray-400 text-center">
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