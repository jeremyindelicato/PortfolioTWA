import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        fixed top-6 left-6 md:left-auto md:right-6 z-50 p-3 rounded-2xl backdrop-blur-md border transition-all duration-500
        ${isDarkMode 
          ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
          : 'border-[#135E6E]/30 text-white hover:bg-[#0f4a58]'
        }
      `}
      style={{
        backgroundColor: isDarkMode ? undefined : '#135E6E'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        key={isDarkMode ? 'dark' : 'light'}
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -180, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-6 h-6"
      >
        {isDarkMode ? (
          <Sun className="w-full h-full" />
        ) : (
          <Moon className="w-full h-full" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;