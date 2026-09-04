import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dnaVideo from '../assets/autre/dna-healthdata.mp4';
import computerVideo from '../assets/autre/computer.mp4';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const DataWebToggleSection = () => {
  const [isAI, setIsAI] = useState(false);
  const { t } = useLanguage();

  const handleToggle = () => {
    setIsAI(!isAI);
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Toggle Container */}
        <div className="flex flex-col items-center gap-12">
          {/* Toggle Switch avec labels */}
          <div className="flex items-center gap-8">
            <motion.span
              onClick={() => setIsAI(false)}
              className={`text-3xl md:text-4xl font-bold transition-all duration-300 cursor-pointer ${
                !isAI ? 'text-gray-900' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'LEMONMILK, sans-serif' }}
              animate={{ scale: !isAI ? 1.15 : 1 }}
              whileHover={{ scale: 1.1 }}
            >
              {t(translations.dataAi.data)}
            </motion.span>

            <div className="checkbox-wrapper-25">
              <style>{`
                .checkbox-wrapper-25 input[type="checkbox"] {
                  background-image: -webkit-linear-gradient(hsla(0,0%,0%,.1), hsla(0,0%,100%,.1)),
                                      -webkit-linear-gradient(left, #3F8391 50%, #13434D 50%);
                  background-size: 100% 100%, 200% 100%;
                  background-position: 0 0, 20px 0;
                  border-radius: 35px;
                  box-shadow: inset 0 1px 4px hsla(0,0%,0%,.5),
                                inset 0 0 10px hsla(0,0%,0%,.5),
                                0 0 0 1px hsla(0,0%,0%,.1),
                                0 -1px 2px 2px hsla(0,0%,0%,.25),
                                0 2px 2px 2px hsla(0,0%,100%,.75);
                  cursor: pointer;
                  height: 35px;
                  padding-right: 35px;
                  width: 105px;
                  -webkit-appearance: none;
                  -webkit-transition: .25s;
                }

                .checkbox-wrapper-25 input[type="checkbox"]:after {
                  background-color: #eee;
                  background-image: -webkit-linear-gradient(hsla(0,0%,100%,.1), hsla(0,0%,0%,.1));
                  border-radius: 35px;
                  box-shadow: inset 0 1px 1px 1px hsla(0,0%,100%,1),
                                inset 0 -1px 1px 1px hsla(0,0%,0%,.25),
                                0 1px 3px 1px hsla(0,0%,0%,.5),
                                0 0 2px hsla(0,0%,0%,.25);
                  content: '';
                  display: block;
                  height: 35px;
                  width: 70px;
                }

                .checkbox-wrapper-25 input[type="checkbox"]:checked {
                  background-position: 0 0, 50px 0;
                  padding-left: 35px;
                  padding-right: 0;
                }
              `}</style>
              <input
                type="checkbox"
                checked={isAI}
                onChange={handleToggle}
              />
            </div>

            <motion.span
              onClick={() => setIsAI(true)}
              className={`text-3xl md:text-4xl font-bold transition-all duration-300 cursor-pointer ${
                isAI ? 'text-gray-900' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'LEMONMILK, sans-serif' }}
              animate={{ scale: isAI ? 1.15 : 1 }}
              whileHover={{ scale: 1.1 }}
            >
              {t(translations.dataAi.ai)}
            </motion.span>
          </div>

          {/* Texte descriptif avec animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isAI ? 'ai' : 'data'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto text-center px-4"
            >
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                {!isAI ? t(translations.dataAi.dataDescription) : t(translations.dataAi.aiDescription)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Vidéo Container avec vidéos chevauchées - Taille réduite */}
          <div className="relative w-full max-w-3xl h-[500px] mx-auto flex items-center justify-center">
            {/* Vidéo DATA */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                x: !isAI ? -70 : -130,
                y: !isAI ? -30 : 15,
                zIndex: !isAI ? 20 : 10,
                scale: !isAI ? 1.05 : 0.9,
                rotateY: !isAI ? 0 : -15,
                rotateZ: !isAI ? 0 : -3
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                rotateY: { duration: 0.4 },
                rotateZ: { duration: 0.4 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={dnaVideo} type="video/mp4" />
              </video>
            </motion.div>

            {/* Vidéo AI */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                x: isAI ? 70 : 130,
                y: isAI ? -30 : 15,
                zIndex: isAI ? 20 : 10,
                scale: isAI ? 1.05 : 0.9,
                rotateY: isAI ? 0 : 15,
                rotateZ: isAI ? 0 : 3
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                rotateY: { duration: 0.4 },
                rotateZ: { duration: 0.4 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={computerVideo} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(DataWebToggleSection);
