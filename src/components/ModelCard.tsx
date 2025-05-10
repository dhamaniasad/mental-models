"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Model } from '@/lib/models';
import Link from 'next/link';

interface ModelCardProps {
  model: Model;
  index: number;
  active: boolean;
}

export default function ModelCard({ model, index, active }: ModelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Brutalist animation variants - sharp and intentional movements
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        delay: i * 0.08,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }),
    hover: { 
      x: -4, 
      y: -4,
      boxShadow: "4px 4px 0px 0px rgba(255, 255, 255, 1)"
    },
    tap: { 
      x: -2, 
      y: -2,
      boxShadow: "2px 2px 0px 0px rgba(255, 255, 255, 1)"
    }
  };

  // Arrow animation variants
  const arrowVariants = {
    hidden: { x: 0 },
    visible: { x: 5 }
  };
  
  return (
    <Link href={`/model/${model.id}`} passHref className="block text-white">
      <motion.div
        ref={cardRef}
        className={`h-full flex flex-col border border-white bg-black p-5 ${active ? 'border-2' : 'border'}`}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        custom={index}
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Triangle marker for active card */}
        {active && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-0 border-r-[20px] border-b-[20px] border-l-0 border-transparent border-r-accent border-b-transparent" />
        )}
        
        {/* Model name */}
        <h3 className="uppercase text-lg font-mono font-bold tracking-tight mb-2">
          {model.name}
        </h3>
        
        {/* Red accent bar */}
        <div className="h-1 w-10 bg-accent mb-4"></div>
        
        {/* Description */}
        <p className="font-mono text-sm text-white/80 line-clamp-3 mb-6">
          {model.description}
        </p>
        
        {/* Footer/CTA */}
        <div className="mt-auto flex justify-between items-center">
          <span className="font-mono uppercase text-xs tracking-wider text-white/50">
            Mental model
          </span>
          
          <motion.div 
            className="flex items-center text-accent"
            animate={isHovered ? "visible" : "hidden"}
          >
            <span className="font-mono uppercase text-xs tracking-wider mr-2">Explore</span>
            <motion.svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              variants={arrowVariants}
            >
              <path 
                d="M8 1L15 8L8 15M1 8H14H1Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="square"
              />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}