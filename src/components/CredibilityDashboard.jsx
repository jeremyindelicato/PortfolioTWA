import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import {
  Monitor,
  Clock,
  Star,
  Bot,
  CheckCircle,
  Zap,
  ArrowUpRight
} from 'lucide-react';

// --- COMPOSANT CARTE "GLASS" INTERACTIF ---
const GlassCard = ({ children, className = "", title, icon: Icon, subtext, noHoverEffect = false }) => {
  const { isDarkMode } = useTheme();
  
  // Définition des animations de survol uniquement si ce n'est pas désactivé
  const hoverAnimations = noHoverEffect ? {} : {
    whileHover: { 
      y: -5, 
      scale: 1.01,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      {...hoverAnimations}
      className={`relative flex flex-col rounded-2xl md:rounded-[24px] border backdrop-blur-xl overflow-hidden group/card ${className} ${
        isDarkMode 
          ? 'bg-[#1a1a1a]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]' 
          : 'bg-white/70 border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.1)]'
      }`}
    >
      {/* Effet de Brillance (Glare) au survol */}
      {!noHoverEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover/card:opacity-100 pointer-events-none z-0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}

      {(title || Icon) && (
        <div className="flex items-center justify-between p-4 md:p-5 pb-2 relative z-10">
          <div className="flex items-center gap-3">
            {Icon && (
              // Micro-interaction sur l'icône du header
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-white/5 text-[#3F8391]' : 'bg-[#3F8391]/10 text-[#3F8391]'}`}
              >
                <Icon size={16} className="md:w-[18px] md:h-[18px]" />
              </motion.div>
            )}
            <div>
              <h3 className={`text-xs md:text-sm font-semibold tracking-wide uppercase ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {title}
              </h3>
              {subtext && <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">{subtext}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 p-4 md:p-5 pt-2 relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Tooltip personnalisé (inchangé)
const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`backdrop-blur-md border p-3 rounded-xl shadow-xl text-xs ${
        isDarkMode ? 'bg-black/80 border-white/20 text-white' : 'bg-white/90 border-gray-200 text-gray-800'
      }`}>
        <p className="font-bold mb-1 opacity-70">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3F8391]" />
          <span className="text-sm font-bold">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const CredibilityDashboard = ({ className = "" }) => {
  const { isDarkMode } = useTheme();

  // Données
  const metrics = {
    clients: 12,
    websites: 16,
    mobileApps: 2,
    deliveryTime: 9, 
    rating: 4.6,
    aiProjects: 6,
    maintenance: 3 
  };

  const rawDeliveryData = [5, 8, 6, 9, 7];
  const deliveryChartData = rawDeliveryData.map((val, index) => ({
    name: `P${index + 1}`,
    fullLabel: `Projet ${index + 1}`,
    jours: val
  }));

  const distributionData = [
    { name: 'Sites Web', value: metrics.websites, color: '#3F8391' },
    { name: 'Apps', value: metrics.mobileApps, color: '#8B5CF6' },
    { name: 'IA', value: metrics.aiProjects, color: '#F59E0B' },
  ];

  const aiDetails = [
    { name: "ChatBot Support", status: "Actif", type: "NLP" },
    { name: "Analyse Sentiment", status: "Actif", type: "Data" },
    { name: "Recommandations", status: "Actif", type: "Algo" },
    { name: "Classification Doc", status: "En cours", type: "ML" }
  ];

  return (
    <section className={`w-full py-12 md:py-20 relative overflow-hidden ${className}`}>
      
      {/* Background Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-20%] md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] opacity-20 ${isDarkMode ? 'bg-[#3F8391]' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-[-10%] right-[-20%] md:right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-[80px] md:blur-[100px] opacity-10 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Centré */}
        <div className="mb-8 md:mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'LEMONMILK, sans-serif' }}>
              MES <span className="text-[#3F8391]">RÉSULTATS</span>
            </h2>
            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Données basées sur mes {metrics.clients} derniers clients
            </p>
          </motion.div>
        </div>

        {/* --- DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

          {/* 1. KPI CARDS */}
          
          {/* Note Moyenne */}
          <GlassCard className="col-span-1 lg:col-span-4 h-[130px] md:h-[140px] justify-center" >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-1">Satisfaction</p>
                <div className="text-3xl md:text-4xl font-bold text-[#F59E0B] flex items-center gap-2">
                  {metrics.rating} 
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star fill="currentColor" size={20} className="md:w-6 md:h-6" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-500/10 h-1.5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${(metrics.rating / 5) * 100}%` }}
                 transition={{ duration: 1.5, delay: 0.2 }}
                 className="h-full bg-[#F59E0B]"
               />
            </div>
          </GlassCard>

          {/* Délai Moyen */}
          <GlassCard className="col-span-1 lg:col-span-4 h-[130px] md:h-[140px] justify-center">
             <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-1">Délai Moyen</p>
                <div className="text-3xl md:text-4xl font-bold text-[#3F8391]">
                  {metrics.deliveryTime}j
                </div>
              </div>
              <motion.div 
                whileHover={{ rotate: -30, scale: 1.1 }}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
              >
                <Clock size={18} className={`md:w-5 md:h-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
              </motion.div>
            </div>
            <p className="text-[10px] md:text-xs text-green-500 mt-2 flex items-center gap-1">
              <CheckCircle size={12} /> Objectif &lt;15 jours respecté
            </p>
          </GlassCard>

          {/* Maintenance */}
          <GlassCard className="col-span-1 sm:col-span-2 lg:col-span-4 h-[130px] md:h-[140px] justify-center">
             <div>
                <p className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-1">Maintenance</p>
                <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6]">
                  {metrics.maintenance} <span className="text-lg">mois</span>
                </div>
                <span className="text-xs opacity-60">Offerte pour tout projet</span>
             </div>
          </GlassCard>


          {/* 2. MAIN CHART */}
          <GlassCard 
            className="col-span-1 sm:col-span-2 lg:col-span-8 h-[300px] md:h-[350px]" 
            title="Historique" 
            subtext="Jours par projet (5 derniers)"
            icon={Monitor}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deliveryChartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3F8391" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3F8391" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke={isDarkMode ? "#666" : "#999"} 
                  tick={{fontSize: 10}} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke={isDarkMode ? "#666" : "#999"} 
                  tick={{fontSize: 10}} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} cursor={{stroke: '#3F8391', strokeWidth: 1, strokeDasharray: '5 5'}} />
                <Area 
                  type="monotone" 
                  dataKey="jours" 
                  stroke="#3F8391" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorDays)" 
                  activeDot={{ r: 6, stroke: isDarkMode ? '#000' : '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* 3. DONUT CHART */}
          <GlassCard 
            className="col-span-1 sm:col-span-2 lg:col-span-4 h-auto min-h-[300px] md:h-[350px]" 
            title="Typologie" 
            subtext="Volume total"
            icon={Zap}
          >
            <div className="flex flex-row md:flex-col h-full items-center">
              {/* Chart Side */}
              <div className="h-[180px] w-1/2 md:w-full md:h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{ outline: 'none', transition: 'all 0.3s ease' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {metrics.websites + metrics.mobileApps + metrics.aiProjects}
                  </span>
                </div>
              </div>

              {/* Legend Side */}
              <div className="w-1/2 md:w-full mt-0 md:mt-2 space-y-2 px-2">
                {distributionData.map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center justify-between text-xs md:text-sm cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} truncate`}>{item.name}</span>
                    </div>
                    <span className="font-mono font-bold opacity-70">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 4. LISTE IA INTERACTIVE */}
          <GlassCard 
            className="col-span-1 sm:col-span-2 lg:col-span-6 h-[300px]" 
            title="IA Déployées" 
            subtext={`${metrics.aiProjects} modules`}
            icon={Bot}
          >
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar h-full pb-8">
              {aiDetails.map((ai, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  // Interaction au survol de l'élément de liste
                  whileHover={{ 
                    scale: 1.02, 
                    x: 5,
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-default ${
                    isDarkMode ? 'border-white/5' : 'border-black/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg shrink-0 ${ai.status === 'Actif' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                      <Bot size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ai.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{ai.type}</div>
                    </div>
                  </div>
                  <div className={`text-[10px] md:text-xs px-2 py-1 rounded-md border whitespace-nowrap ${
                    ai.status === 'Actif' 
                      ? 'border-green-500/30 text-green-500 bg-green-500/10' 
                      : 'border-orange-500/30 text-orange-500 bg-orange-500/10'
                  }`}>
                    {ai.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

           {/* 5. CTA INTERACTIF */}
           <GlassCard className="col-span-1 sm:col-span-2 lg:col-span-6 h-[300px] relative overflow-hidden group cursor-pointer border-none" noHoverEffect={true}>
            {/* Fond animé au survol */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#3F8391] to-slate-800 z-0" 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay z-0" />
            
            <div className="relative z-10 flex flex-col justify-between h-full p-2 text-white pointer-events-none">
              <div>
                <h3 className="text-2xl font-bold mb-2">Prêt à performer ?</h3>
                <p className="text-white/80 text-sm max-w-md">
                  Ces résultats pourraient être les vôtres. Transformons vos idées en statistiques de réussite.
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 group-hover:bg-white/20 transition-colors">
                <div>
                   <div className="text-xs uppercase opacity-70">Disponibilité</div>
                   <div className="font-bold text-green-300">Immédiate</div>
                </div>
                <motion.div 
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  className="h-10 w-10 bg-white text-[#3F8391] rounded-full flex items-center justify-center"
                >
                  <ArrowUpRight size={20} />
                </motion.div>
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};

export default CredibilityDashboard;