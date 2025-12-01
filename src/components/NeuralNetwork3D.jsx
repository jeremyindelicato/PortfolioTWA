import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere } from '@react-three/drei';
import { Vector3 } from 'three';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Composant pour un neurone individuel
function Neuron({ position, skill, isActive, isSelected, onHover, onLeave, onSelect }) {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Effet de pulsation
      const scale = isSelected ? 1.5 : isActive || hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1);
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover(skill);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setHovered(false);
    onLeave();
    document.body.style.cursor = 'none';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(skill);
  };

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          emissive={isSelected ? "#ffffff" : hovered || isActive ? "#ffffff" : "#cccccc"}
          emissiveIntensity={isSelected ? 1.0 : hovered || isActive ? 0.6 : 0.2}
          roughness={0.1}
          metalness={0.9}
          transmission={0.1}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </Sphere>
      
      {/* Halo lumineux */}
      <Sphere args={[0.5, 32, 32]} renderOrder={-1}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={isSelected ? 0.5 : hovered || isActive ? 0.3 : 0.08}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Texte du skill - toujours rendu mais avec opacité conditionnelle */}
      <Text
        ref={textRef}
        position={[0, -0.8, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-opacity={isSelected ? 1 : hovered || isActive ? 1 : 0}
        renderOrder={1}
      >
        {skill.name}
      </Text>
    </group>
  );
}

// Composant pour les connexions entre neurones
function Connection({ start, end, opacity = 0.5 }) {
  const lineRef = useRef();
  
  const points = useMemo(() => {
    return [new Vector3(...start), new Vector3(...end)];
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const time = state.clock.elapsedTime;
      const baseOpacity = Math.max(0.3, opacity);
      lineRef.current.material.opacity = baseOpacity + Math.sin(time * 1.5) * 0.2;
    }
  });

  return (
    <line ref={lineRef} renderOrder={-2}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={opacity}
        linewidth={2}
        toneMapped={false}
      />
    </line>
  );
}

// Composant principal du réseau de neurones
function NetworkScene({ hoveredSkill, setHoveredSkill, selectedSkill, setSelectedSkill }) {
  const skills = [
    { 
      name: "Machine Learning", 
      position: [0, 2, 0],
      definition: "Algorithmes permettant aux machines d'apprendre et de s'améliorer automatiquement à partir de données."
    },
    { 
      name: "Fine-tuning", 
      position: [-2, 1.5, 1],
      definition: "Processus d'adaptation d'un modèle pré-entraîné à une tâche spécifique avec des données ciblées."
    },
    { 
      name: "Chatbot", 
      position: [2.5, 1, -1.5],
      definition: "Agent conversationnel intelligent capable d'interagir naturellement avec les utilisateurs."
    },
    { 
      name: "Deep Learning", 
      position: [-1.5, 0, 2],
      definition: "Réseaux de neurones profonds inspirés du cerveau humain pour résoudre des problèmes complexes."
    },
    { 
      name: "Automatisation", 
      position: [1.5, 0, -2.5],
      definition: "Utilisation de l'IA pour automatiser des tâches répétitives et optimiser les processus."
    },
    { 
      name: "IA Sur-mesure", 
      position: [0, -1.5, 0],
      definition: "Solutions d'intelligence artificielle personnalisées selon les besoins spécifiques de chaque client."
    },
    { 
      name: "Modèle Prédictif", 
      position: [-2, -0.5, -1],
      definition: "Algorithmes capables de prédire des tendances futures basées sur l'analyse de données historiques."
    },
    { 
      name: "Data Driven Model", 
      position: [2, -0.5, 1],
      definition: "Modèles basés sur l'analyse approfondie de grandes quantités de données pour la prise de décision."
    }
  ];

  // Génération des connexions
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const distance = new Vector3(...skills[i].position)
          .distanceTo(new Vector3(...skills[j].position));
        if (distance < 5) {
          conns.push({
            start: skills[i].position,
            end: skills[j].position,
            opacity: Math.max(0.4, 1.2 - distance / 5)
          });
        }
      }
    }
    return conns;
  }, [skills]);

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={window.innerWidth > 768}
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        minDistance={5}
        maxDistance={15}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      {/* Éclairage */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />
      
      {/* Connexions */}
      {connections.map((conn, index) => (
        <Connection
          key={index}
          start={conn.start}
          end={conn.end}
          opacity={conn.opacity}
        />
      ))}
      
      {/* Neurones */}
      {skills.map((skill, index) => (
        <Neuron
          key={index}
          position={skill.position}
          skill={skill}
          isActive={hoveredSkill && hoveredSkill.name === skill.name}
          isSelected={selectedSkill && selectedSkill.name === skill.name}
          onHover={setHoveredSkill}
          onLeave={() => setHoveredSkill(null)}
          onSelect={setSelectedSkill}
        />
      ))}
      
      {/* Particules flottantes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Sphere
          key={i}
          position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 12
          ]}
          args={[0.03, 8, 8]}
          renderOrder={-3}
        >
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            toneMapped={false}
          />
        </Sphere>
      ))}
    </>
  );
}

// Composant principal exporté
const NeuralNetwork3D = ({ className = "" }) => {
  const { isDarkMode } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const neuronClickedRef = useRef(false);

  const handleCanvasClick = () => {
    // Si un neurone a été cliqué, ne pas désélectionner
    if (!neuronClickedRef.current) {
      setSelectedSkill(null);
    }
    // Reset le flag après traitement
    neuronClickedRef.current = false;
  };

  const handleSkillSelect = (skill) => {
    neuronClickedRef.current = true; // Marquer qu'un neurone a été cliqué

    if (selectedSkill && selectedSkill.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  return (
    <div className={`relative w-full py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: 'LEMONMILK, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            INTELLIGENCE{' '}
            <span style={{ color: '#3F8391' }}>ARTIFICIELLE</span>
          </motion.h2>
          <motion.p
            className={`text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-500 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorez mes compétences en IA et découvrez comment l'intelligence artificielle peut transformer votre entreprise
          </motion.p>
        </div>

        {/* Canvas Container */}
        <div
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
          onClick={handleCanvasClick}
        >
      {/* Background glassmorphism */}
      <div 
        className="absolute inset-0 backdrop-blur-xl border border-white/10"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(63, 131, 145, 0.8) 0%, 
              rgba(63, 131, 145, 0.6) 50%, 
              rgba(63, 131, 145, 0.9) 100%
            ),
            radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.3) 0%, transparent 50%)
          `,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
      />
      
      {/* Canvas Three.js */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <NetworkScene 
          hoveredSkill={hoveredSkill} 
          setHoveredSkill={setHoveredSkill}
          selectedSkill={selectedSkill}
          setSelectedSkill={handleSkillSelect}
        />
      </Canvas>
      
      {/* Interface overlay - Affiche uniquement les compétences sélectionnées */}
      {(hoveredSkill || selectedSkill) && (
        <div className="absolute top-2 sm:top-6 left-2 sm:left-6 z-10 max-w-[90vw] sm:max-w-none" onClick={(e) => e.stopPropagation()}>
          <motion.div
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-white/20 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            initial={{ scale: 0.8, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-white text-xs sm:text-sm font-medium mb-1">
              {(hoveredSkill || selectedSkill).name}
            </div>
            <div className="text-white/80 text-xs leading-relaxed max-w-[250px] sm:max-w-xs">
              {(hoveredSkill || selectedSkill).definition}
            </div>
            {selectedSkill && (
              <div className="text-yellow-300 text-xs mt-1 sm:mt-2 font-medium">
                ● Sélectionné
              </div>
            )}
          </motion.div>
        </div>
      )}
      
      {/* Instructions - Caché sur mobile */}
      <div className="absolute bottom-3 sm:bottom-6 right-2 sm:right-6 z-10 hidden sm:block" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="p-2 sm:p-3 rounded-xl backdrop-blur-md border border-white/10"
          style={{
            background: 'rgba(0, 0, 0, 0.2)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-300 text-xs">
            🖱️ Survolez les neurones • 🔄 Rotation automatique
          </p>
        </motion.div>
      </div>

      {/* Note importante - Repositionné sur mobile */}
      <div className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 z-10 max-w-[90vw] sm:max-w-xs" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="p-2 sm:p-4 rounded-xl backdrop-blur-md border border-white/10"
          style={{
            background: 'rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 text-xs leading-relaxed">
            ⚠️ Pour développer une IA sur mesure, l'entreprise doit disposer de jeux de données pertinents.
          </p>
        </motion.div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork3D;