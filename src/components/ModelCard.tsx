"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  
  // 3D card effect with mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Get mouse position relative to card
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    // Update motion values
    mouseX.set(relativeX - 0.5);
    mouseY.set(relativeY - 0.5);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  // Sophisticated card animations
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.85,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: { 
      y: -5,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Premium arrow animation
  const arrowVariants = {
    hidden: { 
      x: 0,
      opacity: 0.7
    },
    visible: { 
      x: 8,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  // Premium badge animation
  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: index * 0.15 + 0.4, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  };
  
  // Subtle background pattern color based on model id
  const getGradientColors = () => {
    switch (model.id) {
      case 'ikigai':
        return { from: 'from-[#FF3A5E]/5', via: 'via-[#FF7A5E]/3', to: 'to-[#FF3A5E]/0' };
      case 'eisenhower-matrix':
        return { from: 'from-[#7B61FF]/5', via: 'via-[#9061FF]/3', to: 'to-[#7B61FF]/0' };
      case 'second-order-thinking':
        return { from: 'from-[#00BCB4]/5', via: 'via-[#00BCB4]/3', to: 'to-[#00BCB4]/0' };
      case 'circle-of-competence':
        return { from: 'from-[#FFC14A]/5', via: 'via-[#FFC14A]/3', to: 'to-[#FFC14A]/0' };
      case 'inversion':
        return { from: 'from-[#FF5CAA]/5', via: 'via-[#FF5CAA]/3', to: 'to-[#FF5CAA]/0' };
      case 'mental-models':
        return { from: 'from-[#A855F7]/5', via: 'via-[#A855F7]/3', to: 'to-[#A855F7]/0' }; // Purple
      case 'first-principles-thinking':
        return { from: 'from-[#22C55E]/5', via: 'via-[#22C55E]/3', to: 'to-[#22C55E]/0' }; // Green
      case 'occams-razor':
        return { from: 'from-[#3B82F6]/5', via: 'via-[#3B82F6]/3', to: 'to-[#3B82F6]/0' }; // Blue
      case 'hanlons-razor':
        return { from: 'from-[#F59E0B]/5', via: 'via-[#F59E0B]/3', to: 'to-[#F59E0B]/0' }; // Amber
      case 'bayes-theorem':
        return { from: 'from-[#EC4899]/5', via: 'via-[#EC4899]/3', to: 'to-[#EC4899]/0' }; // Pink
      case 'probabilistic-thinking':
        return { from: 'from-[#06B6D4]/5', via: 'via-[#06B6D4]/3', to: 'to-[#06B6D4]/0' }; // Cyan
      case 'black-swan-theory':
        return { from: 'from-[#171717]/5', via: 'via-[#171717]/3', to: 'to-[#171717]/0' }; // Black
      default:
        return { from: 'from-[#4D45FF]/5', via: 'via-[#4D45FF]/3', to: 'to-[#4D45FF]/0' };
    }
  };
  
  const gradientColors = getGradientColors();
  
  return (
    <Link href={`/model/${model.id}`} passHref className="block h-full">
      <motion.div
        ref={cardRef}
        className="relative h-full perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        custom={index}
        variants={cardVariants}
        style={{ perspective: 1000 }}
      >
        {/* Premium 3D card effect */}
        <motion.div
          className={`h-full flex flex-col rounded-xl overflow-hidden bg-black/30 backdrop-blur-xl
            border border-white/5 group`}
          style={{
            rotateX: active ? 0 : rotateX,
            rotateY: active ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 opacity-70">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors.from} ${gradientColors.via} ${gradientColors.to} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGg0djFoLTR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
          </div>
          
          <div className="relative z-10 p-7 h-full flex flex-col">
            {/* Premium category badge */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/70" />
              <span className="text-xs uppercase tracking-wider text-white/70 font-medium">Mental Model</span>
            </div>
            
            {/* Model name with premium typography */}
            <h3 className="text-2xl font-bold text-white tracking-tight mb-3 leading-tight">
              {model.name}
              {active && (
                <motion.span 
                  className="relative ml-2"
                  variants={badgeVariants}
                >
                  <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-medium bg-accent-primary/20 text-accent-primary rounded-full">
                    Active
                  </span>
                </motion.span>
              )}
            </h3>
            
            {/* Premium description styling */}
            <p className="text-base text-white/70 line-clamp-3 mb-6 leading-relaxed flex-grow">
              {model.description}
            </p>
            
            {/* Premium divider with gradient */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
            
            {/* Premium footer with CTA */}
            <div className="flex items-center justify-between mt-auto">
              <div 
                className={`inline-flex items-center text-white ${isHovered ? 'text-accent-primary' : 'text-white/90'} transition-colors duration-500`}
              >
                <span className="font-medium mr-2">Explore model</span>
                <motion.div 
                  variants={arrowVariants}
                  animate={isHovered ? "visible" : "hidden"}
                  className="w-5 h-5"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </motion.div>
              </div>
              
              {/* Premium tag based on model ID */}
              <div className="text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
                {(() => {
                  // Dynamically determine a tag based on model type
                  switch(model.id) {
                    case 'ikigai':
                      return 'Self-Development';
                    case 'eisenhower-matrix':
                      return 'Productivity';
                    case 'second-order-thinking':
                      return 'Decision Making';
                    case 'circle-of-competence':
                      return 'Self-Awareness';
                    case 'inversion':
                      return 'Problem Solving';
                    case 'mental-models':
                      return 'Meta-Cognition';
                    case 'first-principles-thinking':
                      return 'Innovation';
                    case 'occams-razor':
                      return 'Critical Thinking';
                    case 'hanlons-razor':
                      return 'Relationship';
                    case 'bayes-theorem':
                      return 'Probability';
                    case 'probabilistic-thinking':
                      return 'Decision Making';
                    case 'black-swan-theory':
                      return 'Risk Management';
                    default:
                      return 'Mental Model';
                  }
                })()}
              </div>
            </div>
          </div>
          
          {/* Premium card effects */}
          {active && (
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 border-2 border-accent-primary/30 rounded-xl" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          )}
          
          {/* Mouse spotlight effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 opacity-60 rounded-xl overflow-hidden pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                mixBlendMode: 'overlay'
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </Link>
  );
}