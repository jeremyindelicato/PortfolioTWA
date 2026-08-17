import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-50 p-3 rounded-full shadow-lg backdrop-blur-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
        border: '1px solid rgba(63, 131, 145, 0.3)',
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
        <Languages size={20} style={{ color: '#3F8391' }} />
        <span className="text-sm font-semibold" style={{ color: '#3F8391' }}>
          {language.toUpperCase()}
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageToggle;
