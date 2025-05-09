"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function InversionDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Track active section (null = overview, 'forward', 'inverse')
  const [activeApproach, setActiveApproach] = useState<string | null>(null);
  
  // Track animation state
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  
  // Track which problems/solutions are visible
  const [visibleItems, setVisibleItems] = useState<{
    forwardProblems: boolean;
    forwardSolutions: boolean;
    inverseProblems: boolean;
    inverseSolutions: boolean;
  }>({
    forwardProblems: false,
    forwardSolutions: false,
    inverseProblems: false,
    inverseSolutions: false
  });

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // All SVG elements for initial animation
    const circles = svg.querySelectorAll('.thinking-circle');
    const arrows = svg.querySelectorAll('.arrow');
    const labels = svg.querySelectorAll('.main-label');
    const problemBoxes = svg.querySelectorAll('.problem-box');
    const solutionBoxes = svg.querySelectorAll('.solution-box');
    
    // Set initial state (all hidden)
    gsap.set([circles, arrows, labels, problemBoxes, solutionBoxes], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(circles, { 
        autoAlpha: 1, 
        stagger: 0.2,
        scale: 1,
        transformOrigin: "center center",
        ease: "elastic.out(1, 0.5)"
      })
      .to(labels, { 
        autoAlpha: 1, 
        stagger: 0.15,
        y: 0, 
        ease: "back.out(1.2)" 
      }, "-=0.5")
      .to(arrows, {
        autoAlpha: 1, 
        stagger: 0.15,
        duration: 0.8,
        drawSVG: "100%",
        ease: "power2.inOut"
      }, "-=0.8");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle approach selection
  const selectApproach = (approach: string | null) => {
    setActiveApproach(approach);
    
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements by type
    const allCircles = svg.querySelectorAll('.thinking-circle');
    const allArrows = svg.querySelectorAll('.arrow');
    const allLabels = svg.querySelectorAll('.main-label');
    const allProblemBoxes = svg.querySelectorAll('.problem-box');
    const allSolutionBoxes = svg.querySelectorAll('.solution-box');
    
    // Reset visibility state when changing approach
    setVisibleItems({
      forwardProblems: approach === 'forward',
      forwardSolutions: false,
      inverseProblems: approach === 'inverse',
      inverseSolutions: false
    });
    
    // If returning to overview (null), reset everything
    if (approach === null) {
      gsap.to([allCircles, allArrows, allLabels], {
        scale: 1,
        fillOpacity: (el) => el.classList.contains('thinking-circle') ? 0.8 : 1,
        strokeOpacity: (el) => el.classList.contains('arrow') ? 0.7 : 1,
        opacity: 1,
        x: 0,
        y: 0,
        filter: "none",
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05
      });
      
      // Hide problem and solution boxes
      gsap.to([allProblemBoxes, allSolutionBoxes], {
        autoAlpha: 0,
        y: 20,
        duration: 0.3
      });
      
      return;
    }
    
    // Get selected elements
    const selectedCircle = svg.querySelector(`.${approach}-thinking`);
    const otherCircle = svg.querySelector(`.thinking-circle:not(.${approach}-thinking)`);
    const selectedLabel = svg.querySelector(`.${approach}-label`);
    const otherLabel = svg.querySelector(`.main-label:not(.${approach}-label)`);
    const selectedArrows = svg.querySelectorAll(`.${approach}-arrow`);
    const otherArrows = svg.querySelectorAll(`.arrow:not(.${approach}-arrow)`);
    
    // Show the appropriate problem boxes
    const problemBoxes = svg.querySelectorAll(`.${approach}-problem`);
    
    // Animation timeline for approach focus
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power2.inOut" } });
    
    // Highlight the selected circle
    tl.to(selectedCircle, {
      scale: 1.1,
      fillOpacity: 0.9,
      filter: "url(#glow)",
      duration: 0.5
    }, 0);
    
    // Enhance the selected arrows
    tl.to(selectedArrows, {
      strokeOpacity: 0.9,
      strokeWidth: 3,
      duration: 0.5
    }, 0);
    
    // Enhance the selected label
    tl.to(selectedLabel, {
      scale: 1.1,
      opacity: 1,
      fontWeight: "bold",
      filter: "url(#text-glow)",
      duration: 0.5
    }, 0);
    
    // Dim other circle
    tl.to(otherCircle, {
      scale: 0.9,
      fillOpacity: 0.3,
      opacity: 0.5,
      duration: 0.5
    }, 0);
    
    // Dim other arrows
    tl.to(otherArrows, {
      strokeOpacity: 0.2,
      strokeWidth: 1.5,
      opacity: 0.3,
      duration: 0.5
    }, 0);
    
    // Dim other label
    tl.to(otherLabel, {
      opacity: 0.3,
      scale: 0.9,
      duration: 0.5
    }, 0);
    
    // Show problem boxes
    tl.to(problemBoxes, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5
    });
  };
  
  // Toggle solutions visibility
  const toggleSolutions = () => {
    if (!activeApproach || !svgRef.current) return;
    
    const svg = svgRef.current;
    const solutionBoxes = svg.querySelectorAll(`.${activeApproach}-solution`);
    
    // Update visibility state
    setVisibleItems(prev => ({
      ...prev,
      forwardSolutions: activeApproach === 'forward' ? !prev.forwardSolutions : prev.forwardSolutions,
      inverseSolutions: activeApproach === 'inverse' ? !prev.inverseSolutions : prev.inverseSolutions
    }));
    
    const showSolutions = activeApproach === 'forward' 
      ? !visibleItems.forwardSolutions 
      : !visibleItems.inverseSolutions;
    
    if (showSolutions) {
      gsap.to(solutionBoxes, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5
      });
    } else {
      gsap.to(solutionBoxes, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.3
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative"
    >
      {/* SVG Diagram */}
      <svg 
        ref={svgRef}
        viewBox="0 0 600 400" 
        className="w-full h-full max-w-[500px]"
        aria-label="Interactive Inversion mental model diagram"
      >
        <defs>
          {/* Filters */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="text-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          
          {/* Element Gradients */}
          <linearGradient id="forward-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="inverse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          <linearGradient id="problem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          
          <linearGradient id="solution-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        
        {/* Forward Thinking Circle */}
        <circle 
          cx="200" cy="150" r="50" 
          className="thinking-circle forward-thinking" 
          fill="url(#forward-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Forward thinking approach - click to explore"
          tabIndex={0}
          onClick={() => selectApproach(activeApproach === 'forward' ? null : 'forward')}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Inverse Thinking Circle */}
        <circle 
          cx="400" cy="150" r="50" 
          className="thinking-circle inverse-thinking" 
          fill="url(#inverse-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Inverse thinking approach - click to explore"
          tabIndex={0}
          onClick={() => selectApproach(activeApproach === 'inverse' ? null : 'inverse')}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Forward Arrows */}
        <path 
          d="M200,200 L200,250" 
          className="arrow forward-arrow" 
          stroke="#60a5fa" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-forward)"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M200,300 L200,350" 
          className="arrow forward-arrow" 
          stroke="#60a5fa" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-forward)"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        {/* Inverse Arrows */}
        <path 
          d="M400,200 L400,250" 
          className="arrow inverse-arrow" 
          stroke="#f87171" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-inverse)"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M400,300 L400,350" 
          className="arrow inverse-arrow" 
          stroke="#f87171" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          markerEnd="url(#arrowhead-inverse)"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead-forward" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
          <marker id="arrowhead-inverse" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f87171" />
          </marker>
        </defs>
        
        {/* Main Labels */}
        <text 
          x="200" y="150" 
          className="main-label forward-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Forward Thinking
        </text>
        
        <text 
          x="400" y="150" 
          className="main-label inverse-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Inverse Thinking
        </text>
        
        {/* Problem Boxes */}
        <g className="problem-box forward-problem" opacity="0">
          <rect x="150" y="250" width="100" height="50" rx="5" fill="url(#problem-gradient)" filter="url(#shadow)" />
          <text x="200" y="270" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="medium">Problems</text>
          <text x="200" y="290" textAnchor="middle" fill="#cbd5e1" fontSize="12">How to succeed?</text>
        </g>
        
        <g className="problem-box inverse-problem" opacity="0">
          <rect x="350" y="250" width="100" height="50" rx="5" fill="url(#problem-gradient)" filter="url(#shadow)" />
          <text x="400" y="270" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="medium">Problems</text>
          <text x="400" y="290" textAnchor="middle" fill="#cbd5e1" fontSize="12">How to fail?</text>
        </g>
        
        {/* Solution Boxes */}
        <g className="solution-box forward-solution" opacity="0">
          <rect x="125" y="350" width="150" height="50" rx="5" fill="url(#solution-gradient)" filter="url(#shadow)" />
          <text x="200" y="375" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="medium">Direct Solutions</text>
        </g>
        
        <g className="solution-box inverse-solution" opacity="0">
          <rect x="325" y="350" width="150" height="50" rx="5" fill="url(#solution-gradient)" filter="url(#shadow)" />
          <text x="400" y="375" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="medium">Avoid Failure Points</text>
        </g>
      </svg>
      
      {/* Instructional Tooltip */}
      <AnimatePresence>
        {isIntroComplete && (
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
              {activeApproach 
                ? 'Click again to return to overview'
                : 'Click on either approach to explore'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Focused approach explanation panel */}
      <AnimatePresence>
        {activeApproach && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 max-w-[240px] bg-black/80 backdrop-blur-md p-4 rounded-lg text-sm text-white border border-white/10"
          >
            <h3 className="font-bold mb-2 text-base">
              {activeApproach === 'forward' && (
                <span className="text-blue-400">Forward Thinking</span>
              )}
              {activeApproach === 'inverse' && (
                <span className="text-red-400">Inverse Thinking</span>
              )}
            </h3>
            
            <p className="text-gray-300 text-xs mb-3">
              {activeApproach === 'forward' && 'The conventional approach to problem-solving that directly asks "How can I achieve success?" or "How can I reach my goal?" It focuses on identifying the path to the desired outcome.'}
              {activeApproach === 'inverse' && 'Flips conventional thinking by asking "What would cause failure?" instead of "How can I succeed?" By identifying potential failure points, you can create plans that systematically avoid these pitfalls.'}
            </p>
            
            <div className="mb-3">
              <p className="text-gray-400 text-xs mb-1">Core Question:</p>
              <p className="text-gray-200 text-sm font-medium">
                {activeApproach === 'forward' && '"How can I succeed?"'}
                {activeApproach === 'inverse' && '"How can I avoid failure?"'}
              </p>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-400 text-xs mb-1">Example:</p>
              <p className="text-gray-300 text-xs">
                {activeApproach === 'forward' && 'To build a successful product, focus on creating great features, marketing effectively, and providing excellent customer service.'}
                {activeApproach === 'inverse' && 'To build a successful product, identify what would make users hate it (poor performance, complex interface, bugs) and systematically eliminate these issues.'}
              </p>
            </div>
            
            <button 
              onClick={toggleSolutions}
              className="mb-3 text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
            >
              {activeApproach === 'forward' && (visibleItems.forwardSolutions ? 'Hide Solutions' : 'Show Solutions')}
              {activeApproach === 'inverse' && (visibleItems.inverseSolutions ? 'Hide Solutions' : 'Show Solutions')}
            </button>
            
            <button 
              onClick={() => selectApproach(null)}
              className="block text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Back to overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}