import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  GraduationCap, 
  Award, 
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const CredibilityDashboard = ({ className = "" }) => {
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    experience: 0,
    education: 0,
    visibility: 0,
    satisfaction: 0,
    projects: 0
  });

  const finalValues = {
    clients: 12,
    experience: 2,
    education: 80, // 4ème année sur 5 = 80%
    visibility: 28,
    satisfaction: 98,
    projects: 8
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
          experience: Math.floor(finalValues.experience * easeProgress * 10) / 10,
          education: Math.floor(finalValues.education * easeProgress),
          visibility: Math.floor(finalValues.visibility * easeProgress),
          satisfaction: Math.floor(finalValues.satisfaction * easeProgress),
          projects: Math.floor(finalValues.projects * easeProgress)
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
      title: 'Clients Satisfaits',
      value: animatedValues.clients,
      suffix: '+',
      icon: Users,
      color: '#3F8391',
      description: 'Projets livrés avec succès'
    },
    {
      id: 'experience',
      title: "Années d'Expérience",
      value: animatedValues.experience,
      suffix: '',
      icon: Calendar,
      color: '#5ba3b0',
      description: 'En développement professionnel'
    },
    {
      id: 'education',
      title: 'Formation Epitech',
      value: animatedValues.education,
      suffix: '%',
      icon: GraduationCap,
      color: '#3F8391',
      description: '4ème année sur 5 complétée'
    },
    {
      id: 'satisfaction',
      title: 'Taux de Satisfaction',
      value: animatedValues.satisfaction,
      suffix: '%',
      icon: Award,
      color: '#5ba3b0',
      description: 'Retours clients positifs'
    }
  ];

  const chartData = [
    { name: 'ASC', value: 28, color: '#3F8391' },
    { name: 'Autres', value: 72, color: '#1a4d52' }
  ];

  const projectsData = [
    { month: 'Jan', projects: 1 },
    { month: 'Fév', projects: 2 },
    { month: 'Mar', projects: 1 },
    { month: 'Avr', projects: 2 },
    { month: 'Mai', projects: 1 },
    { month: 'Jun', projects: 1 }
  ];

  return (
    <motion.section 
      className={`w-full py-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4">
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
          className="rounded-3xl p-8 border border-white/10"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0.1) 100%
              ),
              radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.08) 0%, transparent 50%)
            `,
            backdropFilter: 'blur(20px)',
            boxShadow: `
              0 20px 50px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="p-6 rounded-2xl border border-white/10 text-center group cursor-pointer"
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
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${metric.color} 0%, transparent 70%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${metric.color}40, ${metric.color}20)`
                    }}
                  >
                    <metric.icon size={24} color={metric.color} />
                  </div>
                  
                  <div className="text-3xl font-bold text-white mb-2">
                    {metric.value}{metric.suffix}
                  </div>
                  
                  <div className="text-sm font-medium text-white mb-1">
                    {metric.title}
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {metric.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Growth Chart */}
            <motion.div
              className="p-6 rounded-2xl border border-white/10"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.02) 100%
                  )
                `
              }}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#3F8391' }}
                >
                  <TrendingUp size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Croissance ASC</h3>
                  <p className="text-sm text-gray-400">Augmentation de visibilité</p>
                </div>
              </div>

              {/* Line Chart Simulation */}
              <div className="relative h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 300 120">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="30" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Growth line */}
                  <motion.path
                    d="M 20 100 Q 80 80 150 60 T 280 20"
                    stroke="#3F8391"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: animatedValues.visibility / 28 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  
                  {/* Data points */}
                  <motion.circle
                    cx="20" cy="100" r="4"
                    fill="#3F8391"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                  />
                  <motion.circle
                    cx="280" cy="20" r="6"
                    fill="#3F8391"
                    initial={{ scale: 0 }}
                    animate={{ scale: animatedValues.visibility > 20 ? 1 : 0 }}
                    transition={{ delay: 2.5 }}
                  />
                  
                  {/* Value label */}
                  <motion.text
                    x="280" y="15"
                    fill="#ffffff"
                    fontSize="12"
                    textAnchor="middle"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animatedValues.visibility > 20 ? 1 : 0 }}
                    transition={{ delay: 2.8 }}
                  >
                    +{animatedValues.visibility}%
                  </motion.text>
                  
                  {/* Start point label */}
                  <text x="20" y="115" fill="#9CA3AF" fontSize="10" textAnchor="middle">Jan</text>
                  <text x="280" y="115" fill="#9CA3AF" fontSize="10" textAnchor="middle">Déc</text>
                </svg>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-300 mb-2">
                  Visibilité digitale améliorée chez ASC
                </div>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3F8391' }} />
                    <span className="text-gray-400">Amélioration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1a4d52' }} />
                    <span className="text-gray-400">Baseline</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Timeline */}
            <motion.div
              className="p-6 rounded-2xl border border-white/10"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.02) 100%
                  )
                `
              }}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#5ba3b0' }}
                >
                  <BarChart3 size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Projets 2024</h3>
                  <p className="text-sm text-gray-400">Répartition mensuelle</p>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-3">
                {projectsData.map((item, index) => (
                  <div key={item.month} className="flex items-center gap-3">
                    <div className="w-8 text-xs text-gray-400 font-medium">
                      {item.month}
                    </div>
                    <div className="flex-1 relative">
                      <div 
                        className="h-6 rounded-full"
                        style={{ backgroundColor: 'rgba(63, 131, 145, 0.2)' }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 h-6 rounded-full"
                        style={{ backgroundColor: '#3F8391' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.projects / 2) * 100}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                      />
                    </div>
                    <div className="w-6 text-xs text-white font-medium text-right">
                      {item.projects}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm text-gray-300">
                  {animatedValues.projects} projets complétés en 2024
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default CredibilityDashboard;