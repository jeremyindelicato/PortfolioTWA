import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const container = containerRef.current;
    const section = sectionRef.current;

    // Utiliser un scroll trigger isolé sans Locomotive Scroll
    const handleLoad = () => {
      let pinWrap = container.querySelector(".horizontal-pin-wrap");
      if (!pinWrap) return;
      
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - container.offsetWidth;

      // Animation de défilement horizontal isolée
      gsap.to(".horizontal-pin-wrap", {
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          pin: true,
          start: "top center",
          end: () => "+=" + pinWrapWidth,
          invalidateOnRefresh: true
        },
        x: -horizontalScrollLength,
        ease: "none"
      });

      ScrollTrigger.refresh();
    };

    // Attendre que le DOM soit prêt
    setTimeout(handleLoad, 100);

    return () => {
      // Nettoyer seulement les ScrollTriggers de ce composant
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="horizontal-scroll-container"
      style={{
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#111',
        color: '#b9b3a9',
        margin: '2rem 0'
      }}
    >
      <style jsx>{`
        .horizontal-scroll-container {
          --text-color: #b9b3a9;
          --bg-color: #111;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          isolation: isolate;
        }

        .horizontal-intro-section {
          height: 100%;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 10vw;
          background: var(--bg-color);
        }

        .horizontal-intro-section h1 {
          font-size: clamp(2rem, 6vw, 4rem);
          line-height: 1;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-color);
          z-index: 4;
        }

        .horizontal-intro-section h1 span {
          display: block;
        }

        .horizontal-intro-section p {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: 200px;
          line-height: 1.5;
          color: var(--text-color);
        }

        .horizontal-pin-section {
          height: 100%;
          overflow: hidden;
          display: flex;
          background: var(--bg-color);
          color: var(--text-color);
        }

        .horizontal-pin-wrap {
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 50px 5vw;
          width: max-content;
        }

        .horizontal-pin-wrap > * {
          min-width: 60vw;
          padding: 0 2vw;
          flex-shrink: 0;
        }

        .horizontal-pin-wrap h2 {
          font-size: 2rem;
          max-width: 400px;
          color: var(--text-color);
          margin: 0;
        }

        .horizontal-pin-wrap img {
          height: 60vh;
          width: auto;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .horizontal-final-section {
          height: 100%;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10vw;
          background: #e3857a;
          color: #f1dba7;
        }

        .horizontal-final-section img {
          height: 60vh;
          width: auto;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-right: 2rem;
        }

        .horizontal-final-section h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .horizontal-final-section a {
          color: inherit;
          text-decoration: none;
        }

        .horizontal-final-section a:hover {
          text-decoration: underline;
        }
      `}</style>

      <section ref={sectionRef} className="horizontal-pin-section">
        <div className="horizontal-pin-wrap">
          <div className="horizontal-intro-section">
            <h1>
              <span>Horizontal</span> 
              <span>scroll</span> 
              <span>section</span>
            </h1>
            <p>with GSAP ScrollTrigger</p>
          </div>
          
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
          
          <img src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="Image 1" />
          
          <img src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="Image 2" />
          
          <img src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="Image 3" />
          
          <div className="horizontal-final-section">
            <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Final image" />
            <h2>
              <a href="https://thisisadvantage.com" target="_blank" rel="noopener noreferrer">Made by Advantage</a>
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollSection;