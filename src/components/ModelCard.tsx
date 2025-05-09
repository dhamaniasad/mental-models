"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Model } from '@/lib/models';

interface ModelCardProps {
  model: Model;
  index: number;
  active: boolean;
  onClick: () => void;
}

export default function ModelCard({ model, index, active, onClick }: ModelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate position based on index for spatial layout
  const getPosition = () => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    return {
      x: (col - 1) * 150 + (row % 2) * 50, // Offset even rows for staggered effect
      y: row * 120,
      z: active ? 100 : 0  // Active card comes forward
    };
  };
  
  // Calculate 3D rotation based on mouse position
  useEffect(() => {
    if (!isHovered || !cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate mouse position relative to card center
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);
  
  const { x, y, z } = getPosition();
  
  return (
    <motion.div
      ref={cardRef}
      className={`model-card rounded-lg overflow-hidden p-6 w-64 h-72 relative
        ${active ? 'animate-pulse-glow glow-border' : ''}
        ${active ? 'z-10' : 'z-0'}`}
      initial={{ opacity: 0, x, y, z: -20 }}
      animate={{ 
        opacity: 1, 
        x, 
        y, 
        z,
        rotateX: isHovered ? -mousePosition.y * 10 : 0,
        rotateY: isHovered ? mousePosition.x * 10 : 0,
        scale: active ? 1.1 : 1
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glowing outline when active */}
      {active && (
        <motion.div 
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(109, 40, 217, 0) 70%)`,
            zIndex: -1
          }}
        />
      )}
      
      {/* Card content with 3D effect */}
      <div style={{ transform: 'translateZ(20px)' }} className="h-full flex flex-col">
        <h3 className={`text-xl font-bold mb-2 ${active ? 'text-gradient glow-text' : 'text-white'}`}>
          {model.name}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {model.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm text-purple-300">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M5 7l5 5-5 5" />
            </svg>
            Explore model
          </div>
        </div>
      </div>
    </motion.div>
  );
}