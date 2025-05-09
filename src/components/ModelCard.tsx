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
  
  // Get grid position for card placement
  const getGridPosition = () => {
    // With our new CSS grid layout, cards will be positioned automatically
    return {
      scale: active ? 1.05 : 1,
      zIndex: active ? 10 : 0,
    };
  };
  
  // Calculate subtle 3D rotation based on mouse position
  useEffect(() => {
    if (!isHovered || !cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate mouse position relative to card center
      // Reduced rotation factor for more subtle effect
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) * 0.5;
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2) * 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);
  
  const { scale, zIndex } = getGridPosition();
  
  return (
    <motion.div
      ref={cardRef}
      className={`glass h-full w-full max-w-sm mx-auto ${active ? 'ring-1 ring-indigo-500/50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale,
        rotateX: isHovered ? -mousePosition.y * 8 : 0,
        rotateY: isHovered ? mousePosition.x * 8 : 0,
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: index * 0.05,
        }
      }}
      whileHover={{
        y: -5,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        zIndex
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {active && (
          <div className="absolute -top-1 -right-1">
            <span className="flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            </span>
          </div>
        )}
        
        <h3 className={`text-xl font-bold mb-3 ${active ? 'text-gradient' : 'text-white'}`}>
          {model.name}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
          {model.description}
        </p>
        
        <div className="mt-auto">
          <div className={`inline-flex items-center text-sm ${active ? 'text-indigo-400' : 'text-indigo-300'} 
            transition-all duration-300 group`}>
            <span>Explore model</span>
            <svg 
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Subtle hover border glow */}
      {active && (
        <motion.div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: '0 0 15px 2px rgba(99, 102, 241, 0.15)',
            borderRadius: '0.75rem',
            zIndex: -1
          }}
        />
      )}
    </motion.div>
  );
}