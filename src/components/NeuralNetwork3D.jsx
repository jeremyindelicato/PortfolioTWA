import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

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
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
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
    console.log('Neuron clicked:', skill.name);
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
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
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
        const distance = new THREE.Vector3(...skills[i].position)
          .distanceTo(new THREE.Vector3(...skills[j].position));
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
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const neuronClickedRef = useRef(false);

  const handleCanvasClick = (e) => {
    console.log('Canvas clicked, neuronClicked:', neuronClickedRef.current);
    // Si un neurone a été cliqué, ne pas désélectionner
    if (!neuronClickedRef.current) {
      console.log('Canvas clicked - deselecting skill');
      setSelectedSkill(null);
    }
    // Reset le flag après traitement
    neuronClickedRef.current = false;
  };

  const handleSkillSelect = (skill) => {
    console.log('Skill clicked:', skill.name, 'Currently selected:', selectedSkill?.name);
    neuronClickedRef.current = true; // Marquer qu'un neurone a été cliqué
    
    if (selectedSkill && selectedSkill.name === skill.name) {
      console.log('Deselecting same skill');
      setSelectedSkill(null);
    } else {
      console.log('Selecting new skill');
      setSelectedSkill(skill);
    }
  };

  return (
    <div 
      className={`relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden ${className}`}
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
      
      {/* Interface overlay */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-10" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="p-4 rounded-2xl backdrop-blur-md border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Intelligence Artificielle
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Explorez mes compétences en IA
          </p>
          {(hoveredSkill || selectedSkill) && (
            <motion.div
              className="px-4 py-3 rounded-lg border border-white/20 mt-3"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-white text-sm font-medium mb-1">
                {(hoveredSkill || selectedSkill).name}
              </div>
              <div className="text-white/80 text-xs leading-relaxed max-w-xs">
                {(hoveredSkill || selectedSkill).definition}
              </div>
              {selectedSkill && (
                <div className="text-yellow-300 text-xs mt-2 font-medium">
                  ● Sélectionné
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-10" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="p-3 rounded-xl backdrop-blur-md border border-white/10"
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

      {/* Note importante */}
      <div className="absolute bottom-6 left-6 z-10" onClick={(e) => e.stopPropagation()}>
        <motion.div
          className="p-4 rounded-xl backdrop-blur-md border border-white/10 max-w-xs"
          style={{
            background: 'rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 text-xs leading-relaxed">
            ⚠️ Pour développer une intelligence artificielle sur mesure, il est plus favorable que l'entreprise dispose de jeux de données pertinents pour répondre à la demande.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralNetwork3D;