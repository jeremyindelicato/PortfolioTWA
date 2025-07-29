import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/autre/background.jpg';

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'À propos de moi', path: '/' },
    { name: 'Mes services', path: '/services' },
    { name: 'Projets & Expérience', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:block mx-auto max-w-4xl rounded-full px-6 py-3 shadow-xl fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, ${isScrolled && !isHovered ? 0.6 : 0.7}),
              rgba(0, 0, 0, ${isScrolled && !isHovered ? 0.6 : 0.7})
            ),
            url(${backgroundImage})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'border-box',
          backgroundClip: 'border-box',
          backdropFilter: isScrolled && !isHovered ? 'blur(20px)' : 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, ${isScrolled && !isHovered ? 0.1 : 0.2})`,
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isScrolled ? 2 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`relative font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap block ${
                    location.pathname === item.path 
                      ? 'text-white bg-white/20' 
                      : 'text-white hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
              
              {/* Séparateur élégant entre les boutons */}
              {index < navItems.length - 1 && (
                <div className="flex items-center justify-center mx-3">
                  <motion.div
                    className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                    initial={{ opacity: 0.3, scaleY: 0.8 }}
                    animate={{ opacity: 0.5, scaleY: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-3 rounded-full text-white shadow-lg transition-all duration-300"
          style={{
            background: `rgba(0, 0, 0, ${isScrolled ? 0.8 : 0.9})`,
            backdropFilter: isScrolled ? 'blur(15px)' : 'blur(5px)',
            border: `1px solid rgba(255, 255, 255, ${isScrolled ? 0.15 : 0.2})`
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: isScrolled ? -2 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            animate={mobileMenuOpen ? "open" : "closed"}
            className="w-6 h-6 flex flex-col justify-center items-center"
          >
            <motion.span
              className="block h-0.5 w-6 bg-white rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white rounded-full mt-1.5"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white rounded-full mt-1.5"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.button>

        <motion.div
          initial={false}
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              transition: {
                duration: 0.3,
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            },
            closed: {
              opacity: 0,
              y: -20,
              pointerEvents: "none",
              transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
          className="fixed top-16 sm:top-20 right-2 sm:right-4 left-2 sm:left-auto z-40 p-4 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: `rgba(0, 0, 0, ${isScrolled ? 0.9 : 0.95})`,
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
            border: `1px solid rgba(255, 255, 255, ${isScrolled ? 0.15 : 0.2})`
          }}
        >
          {navItems.map((item, index) => (
            <motion.div key={index}>
              <Link
                to={item.path}
                className={`block font-medium text-base px-6 py-4 sm:px-4 sm:py-3 rounded-lg mb-2 last:mb-0 transition-colors duration-300 min-h-[48px] flex items-center touch-manipulation ${
                  location.pathname === item.path 
                    ? 'text-white bg-white/10' 
                    : 'text-white hover:text-[#3F8391]'
                }`}
                variants={{
                  open: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.2 }
                  },
                  closed: {
                    opacity: 0,
                    x: 20,
                    transition: { duration: 0.2 }
                  }
                }}
                whileHover={{
                  color: '#3F8391',
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default NavigationBar; 