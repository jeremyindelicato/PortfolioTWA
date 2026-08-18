import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-50 p-3 rounded-full shadow-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 6px 24px rgba(63, 131, 145, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Language"
    >
      <div className="flex items-center gap-2">
        <Languages size={20} style={{ color: '#ffffff', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} />
        <span className="text-sm font-semibold" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
          {language.toUpperCase()}
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageToggle;
