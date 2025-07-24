import { motion } from 'framer-motion';
import { useState } from 'react';

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    'À propos de moi',
    'Mes services',
    'Projets & Expérience',
    'Contact'
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className="hidden md:block mx-auto max-w-5xl rounded-full px-6 py-2 shadow-xl fixed top-4 left-1/2 -translate-x-1/2 z-40"
        style={{
          background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href="#"
              className="relative text-white font-medium text-base px-4 py-2 rounded-full overflow-hidden"
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              variants={{
                initial: { 
                  color: '#ffffff',
                  y: 0 
                },
                hover: { 
                  color: '#3F8391',
                  y: -2,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                },
                tap: { 
                  y: 1,
                  transition: {
                    duration: 0.1
                  }
                }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                variants={{
                  initial: { x: '-100%', opacity: 0 },
                  hover: { 
                    x: '100%', 
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }
                }}
              />
              <motion.span
                className="relative z-10"
                variants={{
                  hover: {
                    textShadow: '0 0 8px rgba(63, 131, 145, 0.5)',
                    transition: { duration: 0.3 }
                  }
                }}
              >
                {item}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-3 rounded-full text-white shadow-lg"
          style={{
            background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
          }}
          whileTap={{ scale: 0.95 }}
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
          className="fixed top-20 right-4 z-40 p-4 rounded-2xl shadow-2xl"
          style={{
            background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
          }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href="#"
              className="block text-white font-medium text-base px-4 py-3 rounded-lg mb-2 last:mb-0"
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
              {item}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default NavigationBar; 