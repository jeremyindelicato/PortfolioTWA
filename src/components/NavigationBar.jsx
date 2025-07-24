import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        className="hidden md:block mx-auto max-w-5xl rounded-full px-6 py-2 shadow-xl fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(60, 60, 61, ${isScrolled && !isHovered ? 0.6 : 1}) 0%, 
            rgba(4, 15, 17, ${isScrolled && !isHovered ? 0.6 : 1}) 100%
          )`,
          backdropFilter: isScrolled && !isHovered ? 'blur(20px)' : 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, ${isScrolled && !isHovered ? 0.1 : 0.2})`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isScrolled ? -2 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          {navItems.map((item, index) => (
            <motion.div key={index}>
              <Link
                to={item.path}
                className={`relative font-medium text-base px-4 py-2 rounded-full overflow-hidden transition-colors duration-300 ${
                  location.pathname === item.path 
                    ? 'text-white bg-white/10' 
                    : 'text-white hover:text-[#3F8391]'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ 
                    x: '100%', 
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
                />
                <motion.span
                  className="relative z-10"
                  whileHover={{
                    textShadow: '0 0 8px rgba(63, 131, 145, 0.5)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {item.name}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-3 rounded-full text-white shadow-lg transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(60, 60, 61, ${isScrolled ? 0.8 : 1}) 0%, 
              rgba(4, 15, 17, ${isScrolled ? 0.8 : 1}) 100%
            )`,
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
              transition: {
                duration: 0.3,
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            },
            closed: {
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
          className="fixed top-20 right-4 z-40 p-4 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(60, 60, 61, ${isScrolled ? 0.9 : 1}) 0%, 
              rgba(4, 15, 17, ${isScrolled ? 0.9 : 1}) 100%
            )`,
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
            border: `1px solid rgba(255, 255, 255, ${isScrolled ? 0.15 : 0.2})`
          }}
        >
          {navItems.map((item, index) => (
            <motion.div key={index}>
              <Link
                to={item.path}
                className={`block font-medium text-base px-4 py-3 rounded-lg mb-2 last:mb-0 transition-colors duration-300 ${
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