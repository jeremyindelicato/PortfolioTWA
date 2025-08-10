import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Light mode par défaut
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persister le choix de thème dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
    
    // Appliquer la classe au document pour les transitions CSS
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    // Utilitaires pour les composants
    getTextColor: (defaultDark = 'text-white', defaultLight = 'text-gray-900') => 
      isDarkMode ? defaultDark : defaultLight,
    getBgColor: (defaultDark = 'bg-black/10', defaultLight = 'bg-white/10') => 
      isDarkMode ? defaultDark : defaultLight,
    getBorderColor: (defaultDark = 'border-white/20', defaultLight = 'border-gray-200') => 
      isDarkMode ? defaultDark : defaultLight,
    getVideoSource: () => isDarkMode 
      ? 'src/assets/autre/background-video.mp4' 
      : 'src/assets/autre/background-video-white.mp4'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};