import { motion } from 'framer-motion';
import { Globe, Brain, TrendingUp, ArrowRight } from 'lucide-react';

const ServicesCards = () => {
  const services = [
    {
      id: 1,
      title: "Site Web",
      subtitle: "Développement Complet",
      description: "Site web sur-mesure avec SEO optimisé, design responsive et performance maximale",
      features: ["Design Responsive", "SEO Optimisé", "Performance", "Sécurisé"],
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "rgba(59, 130, 246, 0.1)",
      iconColor: "#3F8391"
    },
    {
      id: 2,
      title: "IA Sur-Mesure",
      subtitle: "Intelligence Artificielle",
      description: "Solutions IA personnalisées pour automatiser et optimiser vos processus métier",
      features: ["Chatbots IA", "Analyse Données", "Automatisation", "Machine Learning"],
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "rgba(147, 51, 234, 0.1)",
      iconColor: "#3F8391"
    },
    {
      id: 3,
      title: "Growth Marketing",
      subtitle: "Croissance Digitale",
      description: "Stratégies de growth hacking pour booster votre visibilité et vos conversions",
      features: ["Analytics", "A/B Testing", "Conversion", "ROI Optimisé"],
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      bgColor: "rgba(249, 115, 22, 0.1)",
      iconColor: "#3F8391"
    }
  ];

  return (
    <motion.section 
      className="w-full py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mes <span style={{ color: '#3F8391' }}>Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Des solutions digitales complètes pour propulser votre entreprise vers le succès
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden rounded-3xl p-[1px] cursor-pointer"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 25%, 
                  transparent 50%, 
                  rgba(63, 131, 145, 0.1) 75%, 
                  rgba(63, 131, 145, 0.2) 100%
                )`
              }}
            >
              {/* Glassmorphism Card */}
              <div 
                className="relative h-full rounded-3xl p-8 backdrop-blur-xl border border-white/10 overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(0, 0, 0, 0.1) 100%
                    ),
                    radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                  `,
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `
                }}
              >
                {/* Animated Background Gradients */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(45deg, ${service.bgColor}, transparent, ${service.bgColor})`
                  }}
                />

                {/* Floating Reflections */}
                <div className="absolute top-2 left-2 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Icon Container */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ 
                    rotateY: 15,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.2) 0%, 
                          rgba(255, 255, 255, 0.1) 50%, 
                          rgba(0, 0, 0, 0.1) 100%
                        )
                      `,
                      boxShadow: `
                        0 4px 16px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                      `,
                      transform: 'translateZ(20px)'
                    }}
                  >
                    <service.icon size={32} color={service.iconColor} />
                    
                    {/* Icon Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, ${service.iconColor}20 0%, transparent 70%)`,
                        filter: 'blur(8px)'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium opacity-70" style={{ color: '#3F8391' }}>
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: '#3F8391' }}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="group/btn relative w-full py-3 px-6 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(63, 131, 145, 0.8) 0%, 
                          rgba(63, 131, 145, 0.6) 50%, 
                          rgba(63, 131, 145, 0.4) 100%
                        )
                      `,
                      boxShadow: `
                        0 4px 16px rgba(63, 131, 145, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 6px 24px rgba(63, 131, 145, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Découvrir</span>
                      <ArrowRight 
                        size={16} 
                        className="group-hover/btn:translate-x-1 transition-transform duration-300" 
                      />
                    </div>
                  </motion.button>
                </div>

                {/* Border Gradient Animation */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `conic-gradient(from 0deg, 
                        transparent 0deg, 
                        rgba(63, 131, 145, 0.5) 90deg, 
                        transparent 180deg, 
                        rgba(255, 255, 255, 0.3) 270deg, 
                        transparent 360deg
                      )`,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'subtract'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-12 py-4 rounded-full font-semibold text-white relative overflow-hidden"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                )
              `,
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(63, 131, 145, 0.5)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative">Voir tous mes services</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesCards;