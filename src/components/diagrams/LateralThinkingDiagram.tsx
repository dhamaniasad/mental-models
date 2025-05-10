"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function LateralThinkingDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Animation states
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Steps of lateral thinking process
  const steps = [
    {
      id: 1,
      title: "Conventional Approach",
      description: "Sequential, logical progress toward a solution",
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Challenge Assumptions",
      description: "Question the constraints and premises you've taken for granted",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Random Entry",
      description: "Introduce unrelated concepts to spark new connections",
      color: "#f59e0b"
    },
    {
      id: 4,
      title: "Provocation",
      description: "Propose deliberately unreasonable ideas to break patterns",
      color: "#ef4444"
    }
  ];

  // Initial animation sequence
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements for animation
    const paths = svg.querySelectorAll('.path');
    const pathLabels = svg.querySelectorAll('.path-label');
    const pathNodes = svg.querySelectorAll('.path-node');
    const lateralJump = svg.querySelector('.lateral-jump');
    const lateralJumpLabel = svg.querySelector('.lateral-jump-label');
    
    // Set initial state (all hidden)
    gsap.set([paths, pathLabels, pathNodes, lateralJump, lateralJumpLabel], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.6, ease: "power2.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(paths, { 
        autoAlpha: 1, 
        drawSVG: "100%",
        stagger: 0.3
      })
      .to(pathNodes, {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=1.5")
      .to(pathLabels, { 
        autoAlpha: 1,
        y: 0,
        stagger: 0.15
      }, "-=1.5")
      .to(lateralJump, {
        autoAlpha: 1,
        drawSVG: "100%",
        ease: "power4.out"
      }, "-=0.5")
      .to(lateralJumpLabel, {
        autoAlpha: 1,
        y: 0
      }, "-=0.3");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle node click
  const handleNodeClick = (stepId: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Toggle between showing the step detail and returning to overview
    setCurrentStep(currentStep === stepId ? null : stepId);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative"
    >
      {/* Main SVG Diagram */}
      <svg 
        ref={svgRef}
        viewBox="0 0 600 400" 
        className="w-full h-full max-w-[600px] max-h-[400px]"
        aria-label="Interactive Lateral Thinking diagram"
      >
        <defs>
          {/* Filters */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          
          {/* Gradients */}
          <linearGradient id="conventional-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="challenge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          <linearGradient id="random-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          <linearGradient id="provocation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          <linearGradient id="lateral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          {/* Arrow markers */}
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
          </marker>
        </defs>

        {/* Conventional Path */}
        <path 
          d="M100,200 L500,200" 
          className="path conventional-path" 
          stroke="url(#conventional-gradient)" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Lateral Jump */}
        <path 
          d="M240,200 C240,120 360,120 360,200" 
          className="lateral-jump" 
          stroke="url(#lateral-gradient)" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="5 5"
          strokeOpacity="0.9"
          markerEnd="url(#arrowhead)"
        />
        
        <text 
          x="300" y="100" 
          className="lateral-jump-label" 
          textAnchor="middle" 
          fill="#8b5cf6" 
          fontSize="14" 
          fontWeight="medium"
        >
          Lateral Jump
        </text>
        
        {/* Path Nodes */}
        {steps.map((step, index) => {
          const x = 100 + index * 130;
          return (
            <g key={step.id}>
              <circle 
                cx={x} 
                cy="200" 
                r="20" 
                className="path-node" 
                fill={step.color} 
                fillOpacity="0.9"
                filter="url(#shadow)"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(step.id)}
              />
              
              <text 
                x={x} 
                y="240" 
                className="path-label" 
                textAnchor="middle" 
                fill="#fff" 
                fontSize="12" 
                fontWeight="medium"
              >
                {index === 0 ? "Start" : index === 3 ? "Solution" : `Step ${index}`}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Instructional Tooltip */}
      <AnimatePresence>
        {isIntroComplete && !currentStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-6 left-0 right-0 mx-auto w-max bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-gray-200 shadow-md"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Click on any node to explore lateral thinking approaches
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Step Detail Panel */}
      <AnimatePresence>
        {currentStep && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[280px] bg-black/80 backdrop-blur-md p-5 rounded-xl
                      text-white border border-white/10 shadow-xl z-10"
          >
            {steps.map(step => {
              if (step.id === currentStep) {
                return (
                  <div key={step.id}>
                    <h3 className="font-bold text-lg mb-2" style={{ color: step.color }}>
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4">
                      {step.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-2">Example Technique</h4>
                      <p className="text-sm text-gray-300">
                        {step.id === 1 && "Following a logical progression of steps based on existing knowledge and established patterns of thinking."}
                        {step.id === 2 && "Ask 'What if the opposite were true?' about your key assumptions. For instance, 'What if we designed a restaurant with no menu?'"}
                        {step.id === 3 && "Open a book to a random page and use a word you see to trigger new associations with your problem."}
                        {step.id === 4 && "Make deliberately unreasonable statements like 'What if gravity worked upward?' to force your mind to create new connections."}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleNodeClick(step.id)}
                      className="text-xs text-indigo-300 hover:text-indigo-200 transition-colors flex items-center"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to overview
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}