import React, { useEffect, useRef } from 'react';

const IsolatedHorizontalScroll = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        position: 'relative',
        margin: '2rem 0',
        background: '#111',
        borderRadius: '1rem',
        isolation: 'isolate'
      }}
    >
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth'
        }}
      >
        {/* Styles pour cacher la scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Section 1 - Introduction */}
        <div
          style={{
            minWidth: '100vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 10vw',
            background: '#bcb8ad',
            color: '#032f35',
            position: 'relative'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              lineHeight: '1',
              fontWeight: '800',
              marginBottom: '1rem',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            <div>Horizontal</div>
            <div>scroll</div>
            <div>section</div>
          </h1>
          <p
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2rem',
              width: '200px',
              lineHeight: '1.5',
              fontSize: '1rem'
            }}
          >
            with pure CSS & JavaScript
          </p>
        </div>

        {/* Section 2 - Contenu avec images */}
        <div
          style={{
            minWidth: '80vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5vw',
            background: '#111',
            color: '#b9b3a9'
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              maxWidth: '400px',
              margin: '0 2rem 0 0',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: '1.3'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
        </div>

        {/* Images */}
        <div
          style={{
            minWidth: '60vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111',
            padding: '0 2vw'
          }}
        >
          <img
            src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Image 1"
            style={{
              height: '60vh',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
        </div>

        <div
          style={{
            minWidth: '60vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111',
            padding: '0 2vw'
          }}
        >
          <img
            src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Image 2"
            style={{
              height: '60vh',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
        </div>

        <div
          style={{
            minWidth: '60vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111',
            padding: '0 2vw'
          }}
        >
          <img
            src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900"
            alt="Image 3"
            style={{
              height: '60vh',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
        </div>

        {/* Section finale */}
        <div
          style={{
            minWidth: '100vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10vw',
            background: '#e3857a',
            color: '#f1dba7',
            gap: '2rem'
          }}
        >
          <img
            src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Final"
            style={{
              height: '60vh',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
          <h2
            style={{
              fontSize: '1.5rem',
              margin: '0',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            <a
              href="https://thisisadvantage.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Made by Advantage
            </a>
          </h2>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          fontSize: '0.8rem',
          fontFamily: 'system-ui, sans-serif',
          backdropFilter: 'blur(10px)'
        }}
      >
        ← Défilement horizontal →
      </div>
    </div>
  );
};

export default IsolatedHorizontalScroll;