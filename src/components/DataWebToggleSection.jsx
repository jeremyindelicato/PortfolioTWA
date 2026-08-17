import { useState } from 'react';
import { motion } from 'framer-motion';
import dnaVideo from '../assets/autre/dna-healthdata.mp4';
import computerVideo from '../assets/autre/computer.mp4';

const DataWebToggleSection = () => {
  const [isWeb, setIsWeb] = useState(false);

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Toggle Container */}
        <div className="flex flex-col items-center gap-12">
          {/* Toggle Switch avec labels */}
          <div className="flex items-center gap-6">
            <motion.span
              className={`text-2xl font-bold transition-all duration-300 ${
                !isWeb ? 'text-gray-900' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'LEMONMILK, sans-serif' }}
              animate={{ scale: !isWeb ? 1.1 : 1 }}
            >
              DATA
            </motion.span>

            <div className="checkbox-wrapper-25">
              <style>{`
                .checkbox-wrapper-25 input[type="checkbox"] {
                  background-image: -webkit-linear-gradient(hsla(0,0%,0%,.1), hsla(0,0%,100%,.1)),
                                      -webkit-linear-gradient(left, #f66 50%, #6cf 50%);
                  background-size: 100% 100%, 200% 100%;
                  background-position: 0 0, 15px 0;
                  border-radius: 25px;
                  box-shadow: inset 0 1px 4px hsla(0,0%,0%,.5),
                                inset 0 0 10px hsla(0,0%,0%,.5),
                                0 0 0 1px hsla(0,0%,0%,.1),
                                0 -1px 2px 2px hsla(0,0%,0%,.25),
                                0 2px 2px 2px hsla(0,0%,100%,.75);
                  cursor: pointer;
                  height: 25px;
                  padding-right: 25px;
                  width: 75px;
                  -webkit-appearance: none;
                  -webkit-transition: .25s;
                }

                .checkbox-wrapper-25 input[type="checkbox"]:after {
                  background-color: #eee;
                  background-image: -webkit-linear-gradient(hsla(0,0%,100%,.1), hsla(0,0%,0%,.1));
                  border-radius: 25px;
                  box-shadow: inset 0 1px 1px 1px hsla(0,0%,100%,1),
                                inset 0 -1px 1px 1px hsla(0,0%,0%,.25),
                                0 1px 3px 1px hsla(0,0%,0%,.5),
                                0 0 2px hsla(0,0%,0%,.25);
                  content: '';
                  display: block;
                  height: 25px;
                  width: 50px;
                }

                .checkbox-wrapper-25 input[type="checkbox"]:checked {
                  background-position: 0 0, 35px 0;
                  padding-left: 25px;
                  padding-right: 0;
                }
              `}</style>
              <input
                type="checkbox"
                checked={isWeb}
                onChange={(e) => setIsWeb(e.target.checked)}
              />
            </div>

            <motion.span
              className={`text-2xl font-bold transition-all duration-300 ${
                isWeb ? 'text-gray-900' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'LEMONMILK, sans-serif' }}
              animate={{ scale: isWeb ? 1.1 : 1 }}
            >
              WEB
            </motion.span>
          </div>

          {/* Vidéo Container avec vidéos chevauchées - Format carré */}
          <div className="relative w-full max-w-4xl h-[600px] mx-auto flex items-center justify-center">
            {/* Vidéo DATA */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                x: !isWeb ? -80 : -150,
                y: !isWeb ? -40 : 20,
                zIndex: !isWeb ? 20 : 10,
                scale: !isWeb ? 1.05 : 0.9,
                rotateY: !isWeb ? 0 : -15,
                rotateZ: !isWeb ? 0 : -3
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

            {/* Vidéo WEB */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              animate={{
                x: isWeb ? 80 : 150,
                y: isWeb ? -40 : 20,
                zIndex: isWeb ? 20 : 10,
                scale: isWeb ? 1.05 : 0.9,
                rotateY: isWeb ? 0 : 15,
                rotateZ: isWeb ? 0 : 3
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

export default DataWebToggleSection;
