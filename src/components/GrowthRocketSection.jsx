import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Composant fusée 3D
function Rocket({ currentSkill, onSkillChange }) {
  const rocketRef = useRef();
  const fireRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const growthSkills = [
    { title: "Analytics Avancée", color: "#3F8391", metrics: "ROI +250%" },
    { title: "Acquisition Client", color: "#5BA3B0", metrics: "CAC -40%" },
    { title: "Optimisation Conversion", color: "#4FC3D4", metrics: "CVR +180%" },
    { title: "Automation Marketing", color: "#6FD5E8", metrics: "Productivité +300%" },
    { title: "Growth Hacking", color: "#8FE7FC", metrics: "Growth Rate +500%" }
  ];

  useFrame((state) => {
    if (rocketRef.current) {
      // Animation de flottement
      rocketRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      rocketRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.2;
      
      // Suivre la souris
      rocketRef.current.position.x = THREE.MathUtils.lerp(rocketRef.current.position.x, mousePos.x * 2, 0.05);
      rocketRef.current.position.y += THREE.MathUtils.lerp(0, mousePos.y * 2, 0.05);
    }

    if (fireRef.current) {
      // Animation du feu
      fireRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 10) * 0.3;
    }
  });

  const handlePointerMove = (event) => {
    setMousePos({
      x: (event.point.x - 0) / 4,
      y: (event.point.y - 0) / 4
    });

    // Calculer la compétence selon la hauteur
    const height = Math.max(0, Math.min(1, (event.point.y + 2) / 4));
    const skillIndex = Math.floor(height * growthSkills.length);
    const newSkill = Math.min(skillIndex, growthSkills.length - 1);
    
    if (newSkill !== currentSkill) {
      onSkillChange(newSkill);
    }
  };

  const handleClick = () => {
    if (rocketRef.current) {
      // Animation GSAP pour le clic
      gsap.to(rocketRef.current.scale, {
        x: 1.2, y: 1.2, z: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      gsap.to(rocketRef.current.rotation, {
        z: rocketRef.current.rotation.z + Math.PI * 2,
        duration: 1,
        ease: "power2.out"
      });
    }
  };

  return (
    <group ref={rocketRef}>
      {/* Corps de la fusée */}
      <mesh position={[0, 0, 0]} onClick={handleClick}>
        <coneGeometry args={[0.3, 1.5, 8]} />
        <meshPhongMaterial color={growthSkills[currentSkill].color} />
      </mesh>
      
      {/* Base de la fusée */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 8]} />
        <meshPhongMaterial color="#2A5F6B" />
      </mesh>

      {/* Ailes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.4,
            -0.4,
            Math.sin((i * Math.PI) / 2) * 0.4
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.1, 0.3, 0.2]} />
          <meshPhongMaterial color="#1A4F5B" />
        </mesh>
      ))}

      {/* Feu */}
      <mesh ref={fireRef} position={[0, -1, 0]}>
        <coneGeometry args={[0.15, 0.8, 6]} />
        <meshBasicMaterial color="#FF6B35" />
      </mesh>

      {/* Zone d'interaction invisible */}
      <mesh onPointerMove={handlePointerMove}>
        <planeGeometry args={[10, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

// Particules d'étoiles
function Stars() {
  const starsRef = useRef();

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  const starPositions = [];
  for (let i = 0; i < 200; i++) {
    starPositions.push(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(starPositions)}
          count={starPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#3F8391" size={0.05} />
    </points>
  );
}

const GrowthRocketSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [rocketHeight, setRocketHeight] = useState(0);

  const growthSkills = [
    {
      title: "Analytics Avancée",
      description: "Analyse de données poussée pour identifier les opportunités de croissance",
      color: "#3F8391",
      metrics: "ROI +250%"
    },
    {
      title: "Acquisition Client",
      description: "Stratégies d'acquisition multi-canaux pour maximiser la conversion",
      color: "#5BA3B0",
      metrics: "CAC -40%"
    },
    {
      title: "Optimisation Conversion",
      description: "A/B testing et optimisation des tunnels de conversion",
      color: "#4FC3D4",
      metrics: "CVR +180%"
    },
    {
      title: "Automation Marketing",
      description: "Automatisation des campagnes et workflows marketing",
      color: "#6FD5E8",
      metrics: "Productivité +300%"
    },
    {
      title: "Growth Hacking",
      description: "Techniques avancées de growth hacking pour une croissance explosive",
      color: "#8FE7FC",
      metrics: "Growth Rate +500%"
    }
  ];

  const handleSkillChange = (newSkill) => {
    setCurrentSkill(newSkill);
    setRocketHeight(newSkill / (growthSkills.length - 1));
  };

  return (
    <div className="relative w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Growth <span style={{ color: '#3F8391' }}>Marketing</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Propulsez votre croissance avec des stratégies data-driven. 
            Interagissez avec la fusée pour découvrir mes compétences !
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Skills Panel - Left side */}
        <motion.div
          className="w-full lg:w-96 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Current Skill Display */}
          <div 
            className="relative rounded-3xl p-6 overflow-hidden transition-all duration-500"
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
              border: `2px solid ${growthSkills[currentSkill].color}40`,
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 20px ${growthSkills[currentSkill].color}20
              `
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Compétence Active</h3>
              <div 
                className="text-sm px-4 py-2 rounded-full border animate-pulse"
                style={{
                  background: `${growthSkills[currentSkill].color}20`,
                  color: growthSkills[currentSkill].color,
                  borderColor: `${growthSkills[currentSkill].color}60`
                }}
              >
                {growthSkills[currentSkill].metrics}
              </div>
            </div>
            
            <div 
              className="text-2xl font-bold mb-4 transition-all duration-500"
              style={{ color: growthSkills[currentSkill].color }}
            >
              {growthSkills[currentSkill].title}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {growthSkills[currentSkill].description}
            </p>
            
            {/* Progress indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-2">
                <span>Niveau de compétence</span>
                <span>{Math.round(rocketHeight * 100)}%</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="h-3 rounded-full relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(to right, ${growthSkills[currentSkill].color}, ${growthSkills[Math.min(currentSkill + 1, growthSkills.length - 1)].color})`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${rocketHeight * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Skills List */}
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
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h4 className="text-white font-semibold mb-4">Compétences Growth</h4>
            <div className="space-y-3">
              {growthSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-xl text-center transition-all duration-500 transform relative overflow-hidden cursor-pointer`}
                  style={{
                    background: index === currentSkill 
                      ? `linear-gradient(135deg, ${skill.color}30, rgba(0,0,0,0.3))`
                      : 'rgba(0,0,0,0.2)',
                    borderColor: index === currentSkill ? `${skill.color}80` : 'rgba(255,255,255,0.1)',
                    scale: index === currentSkill ? 1.05 : 0.95
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSkillChange(index)}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span 
                      className="font-medium transition-all duration-300 text-sm"
                      style={{ color: index === currentSkill ? skill.color : '#FFFFFF' }}
                    >
                      {skill.title}
                    </span>
                    {index === currentSkill && (
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div 
            className="relative rounded-3xl p-6 overflow-hidden group"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.08) 0%, 
                  rgba(255, 255, 255, 0.03) 50%, 
                  rgba(0, 0, 0, 0.05) 100%
                )
              `,
              backdropFilter: 'blur(30px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#3F8391] rounded-full mr-2 animate-pulse"></span>
              Comment interagir
            </h4>
            <ul className="text-white/80 space-y-2 text-sm">
              <li className="flex items-center transition-colors hover:text-[#3F8391]">
                <span className="mr-2">🚀</span> Déplacez la souris sur la fusée
              </li>
              <li className="flex items-center transition-colors hover:text-[#3F8391]">
                <span className="mr-2">🎯</span> Cliquez sur la fusée pour l'animer
              </li>
              <li className="flex items-center transition-colors hover:text-[#3F8391]">
                <span className="mr-2">💡</span> Cliquez sur les compétences à gauche
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* 3D Rocket Container - Right side */}
        <motion.div
          className="flex-1 h-[600px] lg:h-[700px] relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Glass Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black/[0.08]"
              style={{
                backdropFilter: 'blur(40px) saturate(180%)',
              }}
            ></div>
            
            {/* Border Gradient */}
            <div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, ${growthSkills[currentSkill].color}20 75%, ${growthSkills[currentSkill].color}40 100%)`,
                padding: '1px'
              }}
            >
              <div className="w-full h-full rounded-3xl bg-black/10"></div>
            </div>
          </div>
          
          {/* 3D Canvas */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden z-10">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} color="#3F8391" />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#5BA3B0" />
              
              <Stars />
              <Rocket currentSkill={currentSkill} onSkillChange={handleSkillChange} />
            </Canvas>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GrowthRocketSection;