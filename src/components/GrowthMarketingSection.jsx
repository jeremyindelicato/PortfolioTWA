import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Users, Zap, Eye, DollarSign, Rocket } from 'lucide-react';

const GrowthMarketingSection = ({ className = "" }) => {
  const strategies = [
    {
      icon: Target,
      title: "Ciblage Précis",
      description: "Identification et segmentation des audiences les plus rentables",
      metrics: "+250% conversions"
    },
    {
      icon: BarChart3,
      title: "Analytics Avancés",
      description: "Suivi et analyse des KPIs pour optimiser les performances",
      metrics: "ROI +180%"
    },
    {
      icon: Users,
      title: "A/B Testing",
      description: "Tests multivariés pour maximiser les taux de conversion",
      metrics: "+45% efficacité"
    },
    {
      icon: Zap,
      title: "Automatisation",
      description: "Workflows intelligents pour scaler votre croissance",
      metrics: "3x plus rapide"
    }
  ];

  const growthSteps = [
    { step: "01", title: "Audit", description: "Analyse complète de votre situation actuelle" },
    { step: "02", title: "Stratégie", description: "Élaboration d'un plan de croissance personnalisé" },
    { step: "03", title: "Exécution", description: "Mise en place des campagnes et optimisations" },
    { step: "04", title: "Scale", description: "Amplification des résultats qui fonctionnent" }
  ];

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Growth <span style={{ color: '#3F8391' }}>Marketing</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Stratégies de croissance data-driven pour transformer votre entreprise 
          en machine à générer des revenus exponentiels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column - Strategies */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Stratégies éprouvées
          </h3>
          
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-3xl border border-white/10 backdrop-blur-md group cursor-pointer overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 50%, 
                    rgba(0, 0, 0, 0.1) 100%
                  )
                `,
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, rgba(63, 131, 145, 0.4) 0%, transparent 70%)`
                }}
              />
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-3xl animate-pulse"
                  style={{
                    background: `conic-gradient(from 0deg, 
                      transparent 0deg, 
                      rgba(63, 131, 145, 0.3) 90deg, 
                      transparent 180deg, 
                      rgba(255, 255, 255, 0.2) 270deg, 
                      transparent 360deg
                    )`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'subtract'
                  }}
                />
              </div>

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(63, 131, 145, 0.3) 0%, 
                        rgba(63, 131, 145, 0.1) 100%
                      )
                    `,
                    boxShadow: '0 4px 16px rgba(63, 131, 145, 0.2)'
                  }}
                >
                  <strategy.icon size={24} color="#3F8391" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">
                      {strategy.title}
                    </h4>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        borderColor: '#3F8391',
                        color: '#3F8391',
                        backgroundColor: 'rgba(63, 131, 145, 0.1)'
                      }}
                    >
                      {strategy.metrics}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column - Process & Visual */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Growth Chart Visual */}
          <div 
            className="relative h-80 rounded-3xl overflow-hidden border border-white/10 p-8"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                ),
                radial-gradient(circle at 70% 30%, rgba(63, 131, 145, 0.15) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(20px)',
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            {/* Animated Growth Line */}
            <div className="relative h-full flex items-end justify-between">
              {[20, 35, 45, 75, 85, 95].map((height, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  style={{ height: '100%' }}
                >
                  <motion.div
                    className="absolute bottom-0 w-8 rounded-t-lg"
                    style={{
                      background: `linear-gradient(to top, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.3))`,
                      boxShadow: '0 -4px 20px rgba(63, 131, 145, 0.4)'
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8 + index * 0.2,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Floating Value */}
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.2 }}
                  >
                    {height}%
                  </motion.div>
                  
                  {/* Month Label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                    M{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <TrendingUp size={20} color="#3F8391" />
              </div>
            </motion.div>

            <motion.div
              className="absolute top-16 left-4"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <DollarSign size={18} color="#FFFFFF" />
              </div>
            </motion.div>
          </div>

          {/* Process Steps */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">
              Notre processus en 4 étapes
            </h3>
            
            {growthSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md border border-white/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(63, 131, 145, 0.1)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Step Number */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.4))`,
                    boxShadow: '0 4px 16px rgba(63, 131, 145, 0.3)'
                  }}
                >
                  {step.step}
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow */}
                {index < growthSteps.length - 1 && (
                  <motion.div
                    className="ml-auto"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <Rocket size={16} color="#3F8391" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.button
          className="px-12 py-4 rounded-full font-semibold text-white relative overflow-hidden group"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(63, 131, 145, 0.8) 0%, 
                rgba(63, 131, 145, 0.6) 100%
              )
            `,
            boxShadow: `
              0 8px 32px rgba(63, 131, 145, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative flex items-center gap-2">
            Accélérer ma croissance
            <TrendingUp size={20} />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GrowthMarketingSection;