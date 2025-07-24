import { motion } from 'framer-motion';
import { Code2, Database, Smartphone, Globe, Shield, Zap, Search, ShoppingCart } from 'lucide-react';

const WebDevSection = ({ className = "" }) => {
  const features = [
    {
      icon: Code2,
      title: "Code Clean",
      description: "Architecture moderne et maintenable"
    },
    {
      icon: Database,
      title: "Base de Données",
      description: "Gestion optimisée des données"
    },
    {
      icon: Smartphone,
      title: "Responsive",
      description: "Adapté à tous les écrans"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Protection avancée des données"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Temps de chargement optimisés"
    },
    {
      icon: Search,
      title: "SEO Optimisé",
      description: "Visibilité maximale sur Google"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Solutions de vente en ligne"
    },
    {
      icon: Globe,
      title: "Multi-langues",
      description: "Support international"
    }
  ];

  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Next.js", color: "#000000" },
    { name: "MongoDB", color: "#47A248" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "Docker", color: "#2496ED" },
    { name: "AWS", color: "#FF9900" }
  ];

  return (
    <div className={`relative w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Section Texte et Features */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Développement{' '}
              <span style={{ color: '#3F8391' }}>Web</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Des sites web modernes, performants et sécurisés. De la conception 
              à la mise en ligne, je crée des expériences digitales exceptionnelles 
              qui convertissent vos visiteurs en clients.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 group cursor-pointer"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(0, 0, 0, 0.1) 100%
                    )
                  `,
                  boxShadow: `
                    0 4px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, rgba(63, 131, 145, 0.3) 0%, transparent 70%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(63, 131, 145, 0.3) 0%, 
                          rgba(63, 131, 145, 0.1) 100%
                        )
                      `
                    }}
                  >
                    <feature.icon size={20} color="#3F8391" />
                  </div>
                  <h4 className="font-semibold text-white mb-1 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Technologies maîtrisées
            </h4>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/20"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.05) 100%
                      )
                    `,
                    color: '#FFFFFF'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${tech.color}20`,
                    borderColor: `${tech.color}50`,
                    transition: { duration: 0.2 }
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section Visual/Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main Visual Container */}
          <div 
            className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                ),
                radial-gradient(circle at 30% 30%, rgba(63, 131, 145, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(20px)',
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            {/* Floating Code Elements */}
            <div className="absolute inset-0 p-8">
              {/* Code snippet 1 */}
              <motion.div
                className="absolute top-12 left-8 p-4 rounded-xl backdrop-blur-md border border-white/20"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  fontFamily: 'monospace'
                }}
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-cyan-400 text-xs">
                  <div className="text-purple-400">const</div>
                  <div className="text-white">website = {`{`}</div>
                  <div className="ml-4 text-green-400">performance: 'fast',</div>
                  <div className="ml-4 text-green-400">design: 'modern',</div>
                  <div className="ml-4 text-green-400">seo: 'optimized'</div>
                  <div className="text-white">{`}`}</div>
                </div>
              </motion.div>

              {/* Code snippet 2 */}
              <motion.div
                className="absolute top-32 right-8 p-4 rounded-xl backdrop-blur-md border border-white/20"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  fontFamily: 'monospace'
                }}
                animate={{
                  y: [0, 15, 0],
                  rotateY: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="text-cyan-400 text-xs">
                  <div className="text-orange-400">{'<Component'}</div>
                  <div className="text-blue-400 ml-2">responsive</div>
                  <div className="text-blue-400 ml-2">secure</div>
                  <div className="text-orange-400">{'>'}</div>
                </div>
              </motion.div>

              {/* Database icon */}
              <motion.div
                className="absolute bottom-32 left-12"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(63, 131, 145, 0.3) 0%, 
                        rgba(63, 131, 145, 0.1) 100%
                      )
                    `,
                    boxShadow: '0 8px 25px rgba(63, 131, 145, 0.3)'
                  }}
                >
                  <Database size={28} color="#3F8391" />
                </div>
              </motion.div>

              {/* Globe icon */}
              <motion.div
                className="absolute bottom-12 right-16"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.2) 0%, 
                        rgba(255, 255, 255, 0.1) 100%
                      )
                    `,
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Globe size={32} color="#FFFFFF" />
                </div>
              </motion.div>

              {/* Floating particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: '#3F8391',
                    left: `${20 + i * 10}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>

            {/* Central Glow */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background: `
                  radial-gradient(circle at center, 
                    rgba(63, 131, 145, 0.2) 0%, 
                    transparent 70%
                  )
                `
              }}
            />
          </div>

          {/* Floating Info Badge */}
          <motion.div
            className="absolute -bottom-6 -left-6 p-4 rounded-2xl backdrop-blur-xl border border-white/20"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.15) 0%, 
                  rgba(255, 255, 255, 0.05) 100%
                )
              `,
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
            }}
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-300 font-medium">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebDevSection;