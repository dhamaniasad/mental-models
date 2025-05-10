"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function ContrarianThinkingDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Animation states
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [activePerspective, setActivePerspective] = useState<'consensus' | 'contrarian' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initial animation sequence
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements for animation
    const centerCircle = svg.querySelector('.center-circle');
    const centerText = svg.querySelector('.center-text');
    const consensusCircle = svg.querySelector('.consensus-circle');
    const consensusText = svg.querySelector('.consensus-text');
    const contrarianCircle = svg.querySelector('.contrarian-circle');
    const contrarianText = svg.querySelector('.contrarian-text');
    const arrows = svg.querySelectorAll('.arrow');
    
    // Set initial state (all hidden)
    gsap.set([centerCircle, centerText, consensusCircle, consensusText, contrarianCircle, contrarianText, arrows], 
      { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(centerCircle, { 
        autoAlpha: 1, 
        scale: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .to(centerText, { 
        autoAlpha: 1
      }, "-=0.4")
      .to([consensusCircle, contrarianCircle], {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to([consensusText, contrarianText], {
        autoAlpha: 1,
        stagger: 0.2
      }, "-=0.5")
      .to(arrows, {
        autoAlpha: 1,
        drawSVG: "100%",
        stagger: 0.15
      }, "-=0.7");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle perspective selection
  const selectPerspective = (perspective: 'consensus' | 'contrarian' | null) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Toggle between showing the perspective detail and returning to overview
    setActivePerspective(activePerspective === perspective ? null : perspective);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Consensus vs Contrarian perspectives content
  const perspectiveContent = {
    consensus: {
      title: "Consensus Thinking",
      description: "Following widely accepted beliefs and conventional wisdom",
      characteristics: [
        "Aligns with majority opinion",
        "Builds on established thinking",
        "Feels safer and more comfortable",
        "Minimizes social friction"
      ],
      risks: [
        "Vulnerability to groupthink",
        "May miss emerging trends",
        "Potential for crowd blindness",
        "Can lead to investment bubbles"
      ]
    },
    contrarian: {
      title: "Contrarian Thinking",
      description: "Deliberately challenging prevailing wisdom with alternative perspectives",
      characteristics: [
        "Questions popular assumptions",
        "Seeks overlooked information",
        "Tolerates social disagreement",
        "Values independent analysis"
      ],
      advantages: [
        "Identifies missed opportunities",
        "Avoids crowded markets",
        "Creates competitive edge",
        "Supports original innovation"
      ]
    }
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
        aria-label="Interactive Contrarian Thinking diagram"
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
          <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          <linearGradient id="consensus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="contrarian-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          {/* Arrow markers */}
          <marker id="arrow-consensus" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          
          <marker id="arrow-contrarian" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
          </marker>
        </defs>

        {/* Center Question Circle */}
        <circle 
          cx="300" cy="200" r="40" 
          className="center-circle" 
          fill="url(#center-gradient)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
        />
        
        <text 
          x="300" y="190" 
          className="center-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="medium"
        >
          Market
        </text>
        <text 
          x="300" y="210" 
          className="center-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="medium"
        >
          Opinion
        </text>
        
        {/* Consensus Circle */}
        <circle 
          cx="150" cy="200" r="40" 
          className="consensus-circle" 
          fill="url(#consensus-gradient)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => selectPerspective('consensus')}
        />
        
        <text 
          x="150" y="200" 
          className="consensus-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Consensus
        </text>
        
        {/* Contrarian Circle */}
        <circle 
          cx="450" cy="200" r="40" 
          className="contrarian-circle" 
          fill="url(#contrarian-gradient)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => selectPerspective('contrarian')}
        />
        
        <text 
          x="450" y="200" 
          className="contrarian-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Contrarian
        </text>
        
        {/* Connecting Arrows */}
        <path 
          d="M190,195 L260,195" 
          className="arrow consensus-arrow" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrow-consensus)"
          strokeDasharray="0"
        />
        
        <path 
          d="M260,205 L190,205" 
          className="arrow consensus-arrow" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrow-consensus)"
          strokeDasharray="0"
        />
        
        <path 
          d="M340,195 L410,195" 
          className="arrow contrarian-arrow" 
          stroke="#ef4444" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrow-contrarian)"
          strokeDasharray="0"
        />
        
        <path 
          d="M410,205 L340,205" 
          className="arrow contrarian-arrow" 
          stroke="#ef4444" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrow-contrarian)"
          strokeDasharray="0"
        />
      </svg>
      
      {/* Instructional Tooltip */}
      <AnimatePresence>
        {isIntroComplete && !activePerspective && (
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
              Click on either perspective to explore
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Perspective Detail Panel */}
      <AnimatePresence>
        {activePerspective && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[300px] bg-black/80 backdrop-blur-md p-5 rounded-xl
                      text-white border border-white/10 shadow-xl z-10"
          >
            <h3 className="font-bold text-lg mb-2" 
                style={{ color: activePerspective === 'consensus' ? '#3b82f6' : '#ef4444' }}>
              {perspectiveContent[activePerspective].title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              {perspectiveContent[activePerspective].description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                {activePerspective === 'consensus' ? 'Characteristics' : 'Characteristics'}
              </h4>
              <ul className="space-y-1">
                {perspectiveContent[activePerspective].characteristics.map((item, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: activePerspective === 'consensus' ? '#3b82f6' : '#ef4444' }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                {activePerspective === 'consensus' ? 'Risks' : 'Advantages'}
              </h4>
              <ul className="space-y-1">
                {(activePerspective === 'consensus' 
                  ? perspectiveContent.consensus.risks 
                  : perspectiveContent.contrarian.advantages
                ).map((item, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: activePerspective === 'consensus' ? '#3b82f6' : '#ef4444' }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => selectPerspective(null)}
              className="text-xs text-indigo-300 hover:text-indigo-200 transition-colors flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example Tooltip */}
      <AnimatePresence>
        {activePerspective && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-6 left-0 right-0 mx-auto w-max max-w-[300px] bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-gray-200 shadow-md"
          >
            <span className="text-xs">
              <span className="font-semibold block mb-1">Example:</span>
              {activePerspective === 'consensus' 
                ? "Following market trends by investing in popular tech stocks during a bull market."
                : "Investing in unpopular value stocks during a tech bubble, like Warren Buffett avoiding tech in the late 1990s."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}