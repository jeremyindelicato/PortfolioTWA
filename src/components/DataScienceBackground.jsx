import { useEffect, useRef } from 'react';

const DataScienceBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: undefined, y: undefined, tx: undefined, ty: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const targetDensity = 55;
    const learningRate = 0.05;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDataset();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.tx = undefined;
      mouseRef.current.ty = undefined;
    };

    const initDataset = () => {
      particlesRef.current = [];
      let count = targetDensity * 1.5;

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 1.2,
          history: []
        });
      }
    };

    const getGradientField = (x, y) => {
      let fx = Math.sin(x * 0.003) * Math.cos(y * 0.003) + Math.sin(x * 0.01) * 0.2;
      let fy = Math.cos(x * 0.003) * Math.sin(y * 0.003) + Math.cos(y * 0.01) * 0.2;

      const mouse = mouseRef.current;
      if (mouse.x !== undefined) {
        let dx = x - mouse.x;
        let dy = y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          let force = (1 - dist / 300) * 2;
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      }
      return { x: fx, y: fy };
    };

    const drawGridCrosses = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      const spacing = 100;
      const startX = Math.floor((width % spacing) / 2);
      const startY = Math.floor((height % spacing) / 2);

      for (let x = startX; x < width; x += spacing) {
        for (let y = startY; y < height; y += spacing) {
          ctx.fillRect(x - 2, y, 5, 1);
          ctx.fillRect(x, y - 2, 1, 5);
        }
      }
    };

    const updateAndRender = () => {
      const mouse = mouseRef.current;

      // Inertie de la souris
      if (mouse.tx !== undefined) {
        if (mouse.x === undefined) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        }
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      } else {
        mouse.x = undefined;
        mouse.y = undefined;
      }

      ctx.clearRect(0, 0, width, height);

      // Rendu de la structure géométrique
      drawGridCrosses();

      // Rendu et calcul de la descente de gradient
      particlesRef.current.forEach(p => {
        let field = getGradientField(p.x, p.y);
        p.x += field.x * (learningRate * 60);
        p.y += field.y * (learningRate * 60);

        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 15) p.history.shift();

        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = 'rgba(17, 17, 17, 0.06)';
          ctx.lineWidth = p.size;
          ctx.stroke();
        }

        // Réinitialisation si point de convergence ou sortie d'écran
        if (
          p.x < 0 ||
          p.x > width ||
          p.y < 0 ||
          p.y > height ||
          (Math.abs(field.x) < 0.001 && Math.abs(field.y) < 0.001)
        ) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.history = [];
        }
      });

      animationRef.current = requestAnimationFrame(updateAndRender);
    };

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(updateAndRender);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Grille topologique */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: 'center center',
          zIndex: 0
        }}
      />

      {/* Repères graphiques */}
      <div
        className="fixed top-5 left-5 font-mono text-[9px] pointer-events-none"
        style={{
          color: 'rgba(0, 0, 0, 0.25)',
          zIndex: 2
        }}
      >
        SCALE_X: [0, 1.00] // DESCENT_MODE
      </div>
      <div
        className="fixed bottom-5 right-5 font-mono text-[9px] pointer-events-none"
        style={{
          color: 'rgba(0, 0, 0, 0.25)',
          zIndex: 2
        }}
      >
        LR: 0.05 // DENSITY: 55
      </div>

      {/* Canvas interactif */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </>
  );
};

export default DataScienceBackground;
