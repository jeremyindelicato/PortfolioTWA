import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// Import des images des projets
import irisLogo from '../assets/iris/irislogo.png';
import iamcryptoLogo from '../assets/iamcrypto/iamcryptologo.png';
import lxpLogo from '../assets/lxp/lxplogo.png';
import maisonlicLogo from '../assets/maisonlic/logo.png';
import spacedriverLogo from '../assets/spacedriver/spacedriverlogo.png';
import ascLogo from '../assets/asc/asclogo.png';
import orapiLogo from '../assets/orapi/orapilogo.png';
import institutCorailLogo from '../assets/institut-corail/logoinstitutcorail.png';

gsap.registerPlugin(ScrollTrigger);

const ProjectCarousel3D = () => {
  const boxesRef = useRef(null);
  const dragProxyRef = useRef(null);

  // Images des projets
  const COVERS = [
    irisLogo,
    iamcryptoLogo,
    lxpLogo,
    maisonlicLogo,
    spacedriverLogo,
    ascLogo,
    orapiLogo,
    institutCorailLogo,
    irisLogo, // Répéter pour avoir 10 éléments
    iamcryptoLogo
  ];

  const COUNT = 10;

  useEffect(() => {
    const boxes = gsap.utils.toArray('.project-box');
    
    gsap.set('.project-box', {
      yPercent: -50,
      display: 'block'
    });

    gsap.set('button', {
      z: 200,
    });

    const STAGGER = 0.1;
    const DURATION = 1;
    const OFFSET = 0;

    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: 'none',
    });

    const SHIFTS = [...boxes, ...boxes, ...boxes];

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap
        .timeline()
        .set(BOX, {
          xPercent: 250,
          rotateY: -50,
          opacity: 0,
          scale: 0.5,
        })
        // Opacity && Scale
        .to(
          BOX,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
          },
          0
        )
        .to(
          BOX,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.1,
          },
          0.9
        )
        // Panning
        .fromTo(
          BOX,
          {
            xPercent: 250,
          },
          {
            xPercent: -350,
            duration: 1,
            immediateRender: false,
            ease: 'power1.inOut',
          },
          0
        )
        // Rotations
        .fromTo(
          BOX,
          {
            rotateY: -50,
          },
          {
            rotateY: 50,
            immediateRender: false,
            duration: 1,
            ease: 'power4.inOut',
          },
          0
        )
        // Scale && Z
        .to(
          BOX,
          {
            z: 100,
            scale: 1.25,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
          },
          0.4
        )
        .fromTo(
          BOX,
          {
            zIndex: 1,
          },
          {
            zIndex: boxes.length,
            repeat: 1,
            yoyo: true,
            ease: 'none',
            duration: 0.5,
            immediateRender: false,
          },
          0
        );
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * boxes.length;
    const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;

    const LOOP_HEAD = gsap.fromTo(
      LOOP,
      {
        totalTime: START_TIME,
      },
      {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 1,
        ease: 'none',
        repeat: -1,
        paused: true,
      }
    );

    const PLAYHEAD = {
      position: 0,
    };

    const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration());

    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position));
      },
      paused: true,
      duration: 0.25,
      ease: 'power3',
    });

    let iteration = 0;
    // Démarrer l'animation automatiquement
    const autoPlay = () => {
      const NEW_POS = SCRUB.vars.position + 0.01;
      SCRUB.vars.position = NEW_POS;
      SCRUB.invalidate().restart();
    };

    // Animation automatique lente
    const autoInterval = setInterval(autoPlay, 100);

    const TRIGGER = ScrollTrigger.create({
      trigger: '.project-boxes',
      start: 'top center',
      end: 'bottom center',
      horizontal: false,
      pin: false,
      onUpdate: self => {
        // Contrôler l'animation avec le scroll quand visible
        if (self.isActive) {
          clearInterval(autoInterval);
          const NEW_POS = self.progress * LOOP_HEAD.duration();
          SCRUB.vars.position = NEW_POS;
          SCRUB.invalidate().restart();
        }
      },
      onLeave: () => {
        // Reprendre l'animation automatique quand on sort de la zone
        const newAutoInterval = setInterval(autoPlay, 100);
      }
    });

    const scrollToPosition = position => {
      SCRUB.vars.position = position;
      SCRUB.invalidate().restart();
    };

    const NEXT = () => scrollToPosition(SCRUB.vars.position - 1 / boxes.length);
    const PREV = () => scrollToPosition(SCRUB.vars.position + 1 / boxes.length);

    // Event listeners
    const handleKeyDown = (event) => {
      if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT();
      if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV();
    };

    const handleBoxClick = (e) => {
      const BOX = e.target.closest('.project-box');
      if (BOX) {
        let TARGET = boxes.indexOf(BOX);
        let CURRENT = gsap.utils.wrap(
          0,
          boxes.length,
          Math.floor(boxes.length * SCRUB.vars.position)
        );
        let BUMP = TARGET - CURRENT;
        if (TARGET > CURRENT && TARGET - CURRENT > boxes.length * 0.5) {
          BUMP = (boxes.length - BUMP) * -1;
        }
        if (CURRENT > TARGET && CURRENT - TARGET > boxes.length * 0.5) {
          BUMP = boxes.length + BUMP;
        }
        scrollToPosition(SCRUB.vars.position + BUMP * (1 / boxes.length));
      }
    };

    const nextButton = document.querySelector('.project-next');
    const prevButton = document.querySelector('.project-prev');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', NEXT);
      prevButton.addEventListener('click', PREV);
    }

    document.addEventListener('keydown', handleKeyDown);
    if (boxesRef.current) {
      boxesRef.current.addEventListener('click', handleBoxClick);
    }

    // Native Dragging Implementation
    let startX = 0;
    let startOffset = 0;
    let isDragging = false;

    const onPointerMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      SCRUB.vars.position = startOffset + (startX - e.pageX) * 0.001;
      SCRUB.invalidate().restart();
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
      scrollToPosition(SCRUB.vars.position);
    };

    const onPointerDown = (e) => {
      if (e.target.tagName.toLowerCase() !== 'button' && e.target.closest('.project-box')) {
        isDragging = true;
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);
        startX = e.pageX;
        startOffset = SCRUB.vars.position;
      }
    };

    document.addEventListener('pointerdown', onPointerDown);

    // Cleanup
    return () => {
      clearInterval(autoInterval);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
      if (boxesRef.current) {
        boxesRef.current.removeEventListener('click', handleBoxClick);
      }
      if (nextButton && prevButton) {
        nextButton.removeEventListener('click', NEXT);
        prevButton.removeEventListener('click', PREV);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full py-16">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mes <span style={{ color: '#3F8391' }}>Projets</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Découvrez une sélection de mes réalisations, alliant créativité et expertise technique
        </p>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
      <style jsx>{`
        .project-boxes {
          height: 80vh;
          width: 100%;
          overflow: hidden;
          position: relative;
          transform-style: preserve-3d;
          perspective: 800px;
          touch-action: none;
        }

        .project-box {
          transform-style: preserve-3d;
          position: absolute;
          top: 50%;
          left: 50%;
          height: 20vmin;
          width: 20vmin;
          min-height: 200px;
          min-width: 200px;
          display: none;
        }

        .project-box:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          background-image: var(--src);
          background-size: cover;
          transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin);
          opacity: 0.75;
        }

        .project-box:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          background: linear-gradient(hsl(0, 0%, 10%) 50%, transparent);
          transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin) scale(1.01);
          z-index: 2;
        }

        .project-box img {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
        }

        .project-box:nth-of-type(odd) {
          background: hsl(90, 80%, 70%);
        }

        .project-box:nth-of-type(even) {
          background: hsl(90, 80%, 40%);
        }

        @supports(-webkit-box-reflect: below) {
          .project-box {
            -webkit-box-reflect: below 0.5vmin linear-gradient(transparent 0 50%, white 100%);
          }

          .project-box:after,
          .project-box:before {
            display: none;
          }
        }

        .project-controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: space-between;
          width: calc(100% - 4rem);
          max-width: 600px;
          pointer-events: none;
          z-index: 300;
        }

        .project-controls button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid rgba(63, 131, 145, 0.5);
          color: #3F8391;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .project-controls button:hover {
          background: rgba(63, 131, 145, 0.1);
          border-color: #3F8391;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(63, 131, 145, 0.3);
        }

        .project-controls button:active {
          transform: scale(0.95);
        }

        .project-controls button span {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .scroll-icon {
          height: 30px;
          position: fixed;
          top: 1rem;
          right: 1rem;
          color: hsl(0, 0%, 90%);
          animation: action 4s infinite;
        }

        @keyframes action {
          0%, 25%, 50%, 100% {
            transform: translate(0, 0);
          }
          12.5%, 37.5% {
            transform: translate(0, 25%);
          }
        }

        .drag-proxy {
          visibility: hidden;
          position: absolute;
        }
      `}</style>

      <div className="project-boxes" ref={boxesRef}>
        {Array.from({ length: COUNT }, (_, index) => (
          <div
            key={index}
            className="project-box"
            style={{ '--src': `url(${COVERS[index]})` }}
          >
            <span>{index + 1}</span>
            <img src={COVERS[index]} alt={`Project ${index + 1}`} />
          </div>
        ))}
        
        <div className="project-controls">
          <button className="project-next">
            <span>Previous album</span>
            <ChevronLeft size={24} />
          </button>
          <button className="project-prev">
            <span>Next album</span>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <svg className="scroll-icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20 6H23L19 2L15 6H18V18H15L19 22L23 18H20V6M9 3.09C11.83 3.57 14 6.04 14 9H9V3.09M14 11V15C14 18.3 11.3 21 8 21S2 18.3 2 15V11H14M7 9H2C2 6.04 4.17 3.57 7 3.09V9Z"
        />
      </svg>

      <div className="drag-proxy" ref={dragProxyRef}></div>
    </div>

    {/* Navigation button to projects page */}
    <motion.div 
      className="text-center mt-12"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Link to="/projects">
        <motion.button
          className="group flex items-center gap-3 bg-gradient-to-r from-[#3F8391] to-[#2A5B63] text-white px-8 py-4 rounded-full font-medium shadow-lg mx-auto"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(63, 131, 145, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <span>Voir tous mes projets</span>
          <motion.div
            className="flex items-center"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={18} />
          </motion.div>
        </motion.button>
      </Link>
    </motion.div>
  </section>
  );
};

export default ProjectCarousel3D;