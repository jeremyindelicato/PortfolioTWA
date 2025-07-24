import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const RocketGrowthMarketing = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [currentService, setCurrentService] = useState(0);
  const [score, setScore] = useState(0);

  const services = [
    "Analytics Avancée",
    "Ciblage Précis", 
    "Communication",
    "Automatisation",
    "Scrapping",
    "Génération de Leads",
    "Stratégie Marketing"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const OutlineShader = {
      uniforms: {
        offset: { type: 'f', value: 0.3 },
        color: { type: 'v3', value: new THREE.Color('#000000') },
        alpha: { type: 'f', value: 1.0 }
      },
      vertexShader: [
        "uniform float offset;",
        "void main() {",
        "  vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
        "  gl_Position = projectionMatrix * pos;",
        "}"
      ].join('\n'),
      fragmentShader: [
        "uniform vec3 color;",
        "uniform float alpha;",
        "void main() {",
        "  gl_FragColor = vec4( color, alpha );",
        "}"
      ].join('\n')
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'pointer';

    const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100000);
    camera.position.set(0, -6, 3);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01374b);
    scene.fog = new THREE.Fog(scene.background, 10, 20);
    sceneRef.current = scene;

    // Lights avec couleurs de la charte
    const aLight = new THREE.AmbientLight(0x555555);
    scene.add(aLight);

    const dLight1 = new THREE.DirectionalLight(0x3F8391, 0.4);
    dLight1.position.set(0.7, 1, 1);
    scene.add(dLight1);

    // Rocket Group
    const rocketGroup = new THREE.Group();
    scene.add(rocketGroup);

    const rocket = new THREE.Group();
    rocket.position.y = -1.5;
    rocketGroup.add(rocket);

    // Body - Utilisation de la géométrie originale
    const points = [];
    points.push(new THREE.Vector2(0, 0));

    for (let i = 0; i < 11; i++) {
      const point = new THREE.Vector2(
        Math.cos(i * 0.227 - 0.75) * 8,
        i * 4.0
      );
      points.push(point);
    }
    points.push(new THREE.Vector2(0, 40));

    const rocketGeo = new THREE.LatheGeometry(points, 32);
    const rocketMat = new THREE.MeshToonMaterial({
      color: 0x3F8391,
      shininess: 1
    });

    const rocketOutlineMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(OutlineShader.uniforms),
      vertexShader: OutlineShader.vertexShader,
      fragmentShader: OutlineShader.fragmentShader,
      side: THREE.BackSide,
    });

    // Création correcte avec matériaux multiples
    const rocketObj = new THREE.Group();
    const rocketMesh = new THREE.Mesh(rocketGeo, rocketMat);
    const rocketOutline = new THREE.Mesh(rocketGeo, rocketOutlineMat);
    rocketObj.add(rocketMesh);
    rocketObj.add(rocketOutline);
    rocketObj.scale.setScalar(0.1);
    rocket.add(rocketObj);

    // Window
    const portalGeo = new THREE.CylinderGeometry(0.26, 0.26, 1.6, 32);
    const portalMat = new THREE.MeshToonMaterial({ color: 0x5BA3B0 });
    const portalOutlineMat = rocketOutlineMat.clone();
    portalOutlineMat.uniforms.offset.value = 0.03;
    
    const portal = new THREE.Group();
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    const portalOutline = new THREE.Mesh(portalGeo, portalOutlineMat);
    portal.add(portalMesh);
    portal.add(portalOutline);
    portal.position.y = 2;
    portal.rotation.x = Math.PI / 2;
    rocket.add(portal);

    // Tube (partie rouge du milieu)
    const circle = new THREE.Shape();
    circle.absarc(0, 0, 3.5, 0, Math.PI * 2);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 3, 0, Math.PI * 2);
    circle.holes.push(hole);

    const tubeExtrudeSettings = {
      depth: 17,
      steps: 1,
      bevelEnabled: false
    };
    const tubeGeo = new THREE.ExtrudeGeometry(circle, tubeExtrudeSettings);
    tubeGeo.computeVertexNormals();
    tubeGeo.center();
    
    const tubeMat = new THREE.MeshToonMaterial({
      color: 0x3F8391,
      shininess: 1
    });
    const tubeOutlineMat = rocketOutlineMat.clone();
    tubeOutlineMat.uniforms.offset.value = 0.2;
    
    const tube = new THREE.Group();
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    const tubeOutline = new THREE.Mesh(tubeGeo, tubeOutlineMat);
    tube.add(tubeMesh);
    tube.add(tubeOutline);
    tube.position.y = 2;
    tube.scale.setScalar(0.1);
    rocket.add(tube);

    // Wings
    const shape = new THREE.Shape();
    shape.moveTo(3, 0);
    shape.quadraticCurveTo(25, -8, 15, -37);
    shape.quadraticCurveTo(13, -21, 0, -20);
    shape.lineTo(3, 0);

    const extrudeSettings = {
      depth: 4,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2,
      bevelSegments: 5
    };

    const wingGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    wingGeo.computeVertexNormals();
    const wingMat = new THREE.MeshToonMaterial({
      color: 0x2A5F6B,
      shininess: 1,
    });
    const wingOutlineMat = rocketOutlineMat.clone();
    wingOutlineMat.uniforms.offset.value = 1;

    // Créer les 4 ailes
    for (let i = 0; i < 4; i++) {
      const wingGroup = new THREE.Group();
      const wing = new THREE.Group();
      const wingMesh = new THREE.Mesh(wingGeo, wingMat);
      const wingOutline = new THREE.Mesh(wingGeo, wingOutlineMat);
      wing.add(wingMesh);
      wing.add(wingOutline);
      wing.scale.setScalar(0.03);
      wing.position.set(0.6, 0.9, 0);
      wingGroup.add(wing);
      wingGroup.rotation.y = (Math.PI / 2) * i;
      rocket.add(wingGroup);
    }

    // Fire
    const firePoints = [];
    for (let i = 0; i <= 10; i++) {
      const point = new THREE.Vector2(
        Math.sin(i * 0.18) * 8,
        (-10 + i) * 2.5
      );
      firePoints.push(point);
    }

    const fireGeo = new THREE.LatheGeometry(firePoints, 32);
    const fireMat = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x3F8391) },
        color2: { value: new THREE.Color(0x5BA3B0) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
    });

    const fire = new THREE.Mesh(fireGeo, fireMat);
    fire.scale.setScalar(0.06);
    rocket.add(fire);

    const fireLight = new THREE.PointLight(0x3F8391, 1, 9);
    fireLight.position.set(0, -1, 0);
    rocket.add(fireLight);

    // Particles (Stars) - Version simplifiée
    const createParticles = (options) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 3;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#3F8391';
      ctx.fill();
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      const pointsGeo = new THREE.BufferGeometry();
      const positions = [];
      const velocities = [];

      for (let p = 0; p < options.pointCount; p++) {
        positions.push(
          (Math.random() - 0.5) * options.rangeH,
          (Math.random() - 0.5) * options.rangeV,
          (Math.random() - 0.5) * options.rangeH
        );
        velocities.push(0, -Math.random() * options.speed * 100, 0);
      }

      pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      pointsGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
      
      const pointsMat = new THREE.PointsMaterial({
        color: options.color,
        size: options.size,
        map: texture,
        transparent: true,
        depthWrite: false
      });

      return new THREE.Points(pointsGeo, pointsMat);
    };

    const stars = createParticles({
      color: 0x3F8391,
      size: 0.2,
      rangeH: 20,
      rangeV: 20,
      pointCount: 400,
      speed: 0.1
    });
    stars.position.y = 0;
    scene.add(stars);

    // Input handling
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const rocketTarget = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(camera.position);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let starsSpeed = 0.1;
    let starsSpeedTarget = 0.1;

    const mousemove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      cameraTarget.x = -mouse.x * 1;
      cameraTarget.z = 3 + mouse.y * 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, rocketTarget);
    };

    const mousedown = (e) => {
      e.preventDefault();
      const dir = mouse.x < 0 ? -1 : 1;
      
      // Animation de rotation
      const startRotation = rocket.rotation.y;
      const targetRotation = startRotation + dir * Math.PI;
      const startTime = performance.now();
      
      const animateRotation = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        rocket.rotation.y = startRotation + (targetRotation - startRotation) * easedProgress;
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        }
      };
      requestAnimationFrame(animateRotation);

      // Scale animation
      const animateScale = () => {
        rocketGroup.scale.set(0.9, 1.2, 0.9);
        setTimeout(() => {
          rocketGroup.scale.set(1, 1, 1);
        }, 400);
      };
      animateScale();

      starsSpeedTarget = 0.3;
      renderer.domElement.style.cursor = 'none';
      
      // Progression des services
      setScore(prev => {
        const newScore = prev + 1;
        const serviceIndex = Math.floor(newScore / 5) % services.length;
        setCurrentService(serviceIndex);
        return newScore;
      });
    };

    const mouseup = () => {
      rocketGroup.scale.set(1, 1, 1);
      starsSpeedTarget = 0.1;
      renderer.domElement.style.cursor = 'pointer';
    };

    renderer.domElement.addEventListener('mousemove', mousemove);
    renderer.domElement.addEventListener('mousedown', mousedown);
    renderer.domElement.addEventListener('mouseup', mouseup);

    // Animation loop
    const clock = new THREE.Clock();
    let time = 0;
    const angle = THREE.MathUtils.degToRad(3);

    const lerp = (object, prop, destination) => {
      if (object && object[prop] !== destination) {
        object[prop] += (destination - object[prop]) * 0.1;
        if (Math.abs(destination - object[prop]) < 0.01) {
          object[prop] = destination;
        }
      }
    };

    const loop = () => {
      requestAnimationFrame(loop);
      
      time += clock.getDelta();
      rocketGroup.rotation.y = Math.cos(time * 8) * angle;
      
      fire.scale.y = THREE.MathUtils.randFloat(0.04, 0.08);
      
      // Update stars
      const positions = stars.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= starsSpeed;
        if (positions[i + 1] < -10) {
          positions[i + 1] = 10;
        }
      }
      stars.geometry.attributes.position.needsUpdate = true;
      
      lerp(rocketGroup.position, 'y', rocketTarget.y);
      lerp(rocketGroup.position, 'x', rocketTarget.x);
      lerp(camera.position, 'x', cameraTarget.x);
      lerp(camera.position, 'z', cameraTarget.z);
      
      // Lerp stars speed
      starsSpeed += (starsSpeedTarget - starsSpeed) * 0.1;
      
      renderer.render(scene, camera);
    };
    loop();

    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', mousemove);
      renderer.domElement.removeEventListener('mousedown', mousedown);
      renderer.domElement.removeEventListener('mouseup', mouseup);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Growth <span style={{ color: '#3F8391' }}>Marketing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explorez mes services de Growth Marketing en pilotant la fusée. 
            Cliquez pour propulser et débloquez tous mes services !
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Services Panel - Left side */}
          <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
            {/* Current Service - iOS 16 Glass */}
            <div 
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.12) 0%, 
                    rgba(255, 255, 255, 0.04) 25%, 
                    rgba(63, 131, 145, 0.08) 50%,
                    rgba(255, 255, 255, 0.02) 75%, 
                    rgba(0, 0, 0, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              {/* Animated Border */}
              <div 
                className="absolute inset-0 rounded-3xl animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, rgba(63,131,145,0.4) 70%, rgba(63,131,145,0.6) 100%)',
                  padding: '1.5px'
                }}
              >
                <div className="w-full h-full rounded-3xl bg-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Service Actuel</h3>
                  <div 
                    className="text-sm px-4 py-2 rounded-full border animate-pulse"
                    style={{
                      background: 'rgba(63, 131, 145, 0.2)',
                      color: '#3F8391',
                      borderColor: 'rgba(63, 131, 145, 0.3)'
                    }}
                  >
                    Score: {score}
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#3F8391] to-[#5BA3B0] bg-clip-text mb-4 animate-bounce">
                  {services[currentService]}
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>Progression</span>
                    <span>{currentService + 1}/{services.length}</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-[#3F8391] to-[#5BA3B0] transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${((currentService + 1) / services.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid - iOS 16 Glass */}
            <div 
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.04) 50%, 
                    rgba(0, 0, 0, 0.06) 100%
                  )
                `,
                backdropFilter: 'blur(25px) saturate(150%)',
                WebkitBackdropFilter: 'blur(25px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Moving Light Effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div 
                  className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-[#3F8391]/20 via-transparent to-transparent animate-spin"
                  style={{animationDuration: '8s'}}
                ></div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-white font-semibold mb-4">Services Débloqués</h4>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service, index) => (
                    <div
                      key={service}
                      className={`p-4 rounded-xl text-center transition-all duration-500 transform relative overflow-hidden ${
                        index <= currentService
                          ? 'bg-gradient-to-r from-[#3F8391]/30 to-black/30 text-white border border-[#3F8391]/50 scale-105 shadow-lg'
                          : 'bg-black/20 text-white/40 border border-white/10 scale-95 hover:scale-100 hover:bg-white/5'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        transform: index <= currentService ? 'translateY(0) scale(1.05)' : 'translateY(5px) scale(0.95)'
                      }}
                    >
                      {/* Shimmer effect for unlocked services */}
                      {index <= currentService && (
                        <div 
                          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{animation: 'shimmer 2s infinite'}}
                        ></div>
                      )}
                      
                      <div className="flex items-center justify-between relative z-10">
                        <span className="font-medium transition-all duration-300">{service}</span>
                        {index <= currentService && (
                          <div className="relative">
                            <div className="w-3 h-3 bg-[#3F8391] rounded-full animate-ping"></div>
                            <div 
                              className="absolute inset-0 w-3 h-3 bg-[#5BA3B0] rounded-full animate-pulse"
                              style={{animationDelay: '1s'}}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions - iOS 16 Glass */}
            <div 
              className="relative rounded-3xl p-6 overflow-hidden group hover:scale-105 transition-all duration-500"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.03) 50%, 
                    rgba(0, 0, 0, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(30px) saturate(200%)',
                WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3F8391]/0 via-[#3F8391]/10 to-[#3F8391]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <span className="w-2 h-2 bg-[#3F8391] rounded-full mr-2 animate-pulse"></span>
                  Comment jouer
                </h4>
                <ul className="text-white/80 space-y-2">
                  <li className="flex items-center transition-colors hover:text-[#3F8391]">
                    <span className="mr-2">🎯</span> Déplacez la souris pour piloter
                  </li>
                  <li className="flex items-center transition-colors hover:text-[#3F8391]">
                    <span className="mr-2">🚀</span> Cliquez pour propulser
                  </li>
                  <li className="flex items-center transition-colors hover:text-[#3F8391]">
                    <span className="mr-2">⭐</span> Débloquez tous les services
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Game Container - Right side */}
          <div className="flex-1 h-[600px] lg:h-[700px] relative">
            {/* iOS 16 Liquid Glass Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Glass Background */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black/[0.08]"
                style={{
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                }}
              ></div>
              
              {/* Border Gradient */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, rgba(63,131,145,0.1) 75%, rgba(63,131,145,0.2) 100%)',
                  padding: '1px'
                }}
              >
                <div className="w-full h-full rounded-3xl bg-black/10"></div>
              </div>
              
              {/* Animated Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-60">
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                <div 
                  className="absolute bottom-0 right-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-[#3F8391]/40 to-transparent animate-pulse"
                  style={{animationDelay: '1s'}}
                ></div>
              </div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#3F8391]/60 rounded-full animate-bounce"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + (i % 2)}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* 3D Game Container */}
            <div 
              ref={containerRef} 
              className="relative w-full h-full rounded-3xl overflow-hidden z-10"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default RocketGrowthMarketing;