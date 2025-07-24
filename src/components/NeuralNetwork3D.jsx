import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Composant pour un neurone individuel
function Neuron({ position, skill, isActive, onHover, onLeave }) {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Effet de pulsation
      const scale = isActive || hovered ? 1.3 : 1;
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

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshPhysicalMaterial
          color="#3F8391"
          emissive={hovered || isActive ? "#3F8391" : "#1a4d52"}
          emissiveIntensity={hovered || isActive ? 0.6 : 0.2}
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
          color="#3F8391"
          transparent
          opacity={hovered || isActive ? 0.3 : 0.08}
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
        material-opacity={hovered || isActive ? 1 : 0}
        renderOrder={1}
      >
        {skill}
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
        color="#3F8391" 
        transparent 
        opacity={opacity}
        linewidth={2}
        toneMapped={false}
      />
    </line>
  );
}

// Composant principal du réseau de neurones
function NetworkScene({ hoveredSkill, setHoveredSkill }) {
  const skills = [
    { name: "Machine Learning", position: [0, 2, 0] },
    { name: "Fine-tuning", position: [-2, 1.5, 1] },
    { name: "Chatbot", position: [2.5, 1, -1.5] },
    { name: "Deep Learning", position: [-1.5, 0, 2] },
    { name: "Automatisation", position: [1.5, 0, -2.5] },
    { name: "IA Sur-mesure", position: [0, -1.5, 0] },
    { name: "Modèle Prédictif", position: [-2, -0.5, -1] },
    { name: "Data Driven Model", position: [2, -0.5, 1] }
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
        autoRotate={true}
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        minDistance={5}
        maxDistance={15}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      {/* Éclairage */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3F8391" />
      
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
          skill={skill.name}
          isActive={hoveredSkill === skill.name}
          onHover={setHoveredSkill}
          onLeave={() => setHoveredSkill(null)}
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
            color="#3F8391"
            transparent
            opacity={0.4}
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

  return (
    <div className={`relative w-full h-[600px] rounded-3xl overflow-hidden ${className}`}>
      {/* Background glassmorphism */}
      <div 
        className="absolute inset-0 backdrop-blur-xl border border-white/10"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(0, 0, 0, 0.1) 100%
            ),
            radial-gradient(circle at 20% 20%, rgba(63, 131, 145, 0.1) 0%, transparent 50%)
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
        />
      </Canvas>
      
      {/* Interface overlay */}
      <div className="absolute top-6 left-6 z-10">
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
          {hoveredSkill && (
            <motion.div
              className="px-3 py-1 rounded-full border"
              style={{
                borderColor: '#3F8391',
                backgroundColor: 'rgba(63, 131, 145, 0.2)'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <span className="text-white text-sm font-medium">
                {hoveredSkill}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-10">
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
      <div className="absolute bottom-6 left-6 z-10">
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
            *Le développement d'intelligence artificielle sur mesure n'est possible uniquement si l'entreprise possède des jeux de données qui concerne la demande.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralNetwork3D;