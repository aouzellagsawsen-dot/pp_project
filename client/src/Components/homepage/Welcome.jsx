"use client"; 
import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; 
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Composant modélisant le livre stylisé de l'image avec interactivité au curseur
function FloatingBook({ initialPosition, initialRotation, speed, scale }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Position de la souris normalisée (de -1 à 1)

    // Animation de lévitation de base
    const levitationY = Math.sin(t * speed + initialPosition[0]) * 0.4;
    const baseRotX = t * 0.0015 * speed;
    const baseRotY = t * 0.002 * speed;

    // Calcul des cibles en fonction de la position de la souris pour l'effet de parallaxe
    const targetX = initialPosition[0] + pointer.x * 2.5;
    const targetY = initialPosition[1] + levitationY + pointer.y * 2.5;
    
    // Le livre s'incline légèrement vers le curseur
    const targetRotX = initialRotation[0] + baseRotX - pointer.y * 0.3;
    const targetRotY = initialRotation[1] + baseRotY + pointer.x * 0.3;

    // Interpolation linéaire (lerp) pour un mouvement très doux
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={groupRef} position={initialPosition} rotation={initialRotation} scale={scale}>
      {/* Couverture principale */}
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.15]} />
        <meshStandardMaterial color="#E4D8C7" roughness={0.8} />
      </mesh>
      
      {/* Tranche du livre (reliure plus foncée à gauche) */}
      <mesh position={[-0.55, 0, 0]}>
        {/* Légèrement plus haute et plus épaisse que la couverture */}
        <boxGeometry args={[0.15, 1.85, 0.18]} />
        <meshStandardMaterial color="#C8B8A6" roughness={0.9} />
      </mesh>

      {/* Lignes de texte décoratives (simulant le titre) */}
      <mesh position={[-0.1, 0.5, 0.08]}>
        <boxGeometry args={[0.6, 0.04, 0.02]} />
        <meshStandardMaterial color="#C8B8A6" roughness={1} />
      </mesh>
      <mesh position={[-0.2, 0.35, 0.08]}>
        <boxGeometry args={[0.4, 0.04, 0.02]} />
        <meshStandardMaterial color="#C8B8A6" roughness={1} />
      </mesh>
    </group>
  );
}

function BackgroundBooks() {
  const books = useMemo(() => {
    return Array.from({ length: 35 }).map(() => {
      const side = Math.random() > 0.5 ? 1 : -1;
      const xPosition = (Math.random() * 15 + 7) * side;

      return {
        position: [
          xPosition, 
          (Math.random() - 0.5) * 25, 
          (Math.random() - 0.5) * 15 - 5 
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.15 + Math.random() * 0.4,
        scale: 0.6 + Math.random() * 0.7 
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 10, 7]} intensity={0.6} castShadow />
      {books.map((book, i) => (
        <FloatingBook 
          key={i} 
          initialPosition={book.position} 
          initialRotation={book.rotation} 
          speed={book.speed}
          scale={book.scale}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen pt-16 flex flex-col items-center justify-center font-serif text-[#4a3728]">
      
      {/* Canvas 3D en arrière-plan */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <BackgroundBooks />
        </Canvas>
      </div>

      {/* Contenu principal bloquant les clics sur la 3D là où il y a du texte */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 w-full h-full pointer-events-none">
        
        {/* Les éléments interactifs (boutons, texte) doivent réactiver le pointer-events */}
        <div className="relative px-12 md:px-24 py-10 mb-8 group pointer-events-auto">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:left-1 after:w-full after:h-full after:border-t after:border-l after:border-[#4a3728]/30"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:right-1 after:w-full after:h-full after:border-t after:border-r after:border-[#4a3728]/30"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:left-1 after:w-full after:h-full after:border-b after:border-l after:border-[#4a3728]/30"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-full after:h-full after:border-b after:border-r after:border-[#4a3728]/30"></div>

          <h1 className="text-7xl md:text-9xl font-normal text-[#8D7B68] tracking-tight text-center">
            Alinéa
          </h1>
          <h2 className="text-2xl md:text-5xl italic opacity-90 text-center mt-2">
            Where Stories Travel
          </h2>
        </div>

        <div className="flex items-center gap-3 opacity-70 mb-12 text-[15px]">
          <span>❦</span><span>✦</span>
          <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
          </div>
          <span>✦</span><span>❦</span>
        </div>

        <p className="max-w-2xl text-center text-lg text-[#4a3728] md:text-xl opacity-70 italic mb-16 px-4">
          - Join a community of book lovers -
          <br></br>
          - Borrow, lend, and discover your next favorite read -
        </p>

        <motion.div {...fadeInUp}
         transition={{ ...fadeInUp.transition, delay: 0.1 }}
         className="flex flex-col sm:flex-row gap-5 pointer-events-auto">
          <div className="flex gap-4">
            <Link to="/catalog" 
               className="bg-[#8D7B68] text-[#F1EAD7] px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#7a6a59] transition-all shadow-md shadow-black/5">
              <span className="text-xs">✦</span> Explore Books
            </Link>
            <Link to="/SignUp" 
                 className="border border-[#4a3728]/70 px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#4a3728]/5 transition-all text-[#4a3728]/80">
              <span className="text-sm">✦</span> Join the Community
            </Link>
          </div>
        </motion.div>

        <br></br>
        <br></br>

        <div className="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40 pt-10">
          <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
          <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
        </div>
      </div>
    </div>
  );    
}