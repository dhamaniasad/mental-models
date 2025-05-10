"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function DivergentThinkingDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [expandedIdea, setExpandedIdea] = useState<string | null>(null);

  // Initial animation sequence
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements for animation
    const centralNode = svg.querySelector('.central-node');
    const centralText = svg.querySelector('.central-text');
    const connectionLines = svg.querySelectorAll('.connection-line');
    const ideaNodes = svg.querySelectorAll('.idea-node');
    const ideaTexts = svg.querySelectorAll('.idea-text');
    
    // Set initial state (all hidden)
    gsap.set([centralNode, centralText, connectionLines, ideaNodes, ideaTexts], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.6, ease: "power2.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(centralNode, { 
        autoAlpha: 1, 
        scale: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .to(centralText, { 
        autoAlpha: 1,
        y: 0
      }, "-=0.3")
      .to(connectionLines, {
        autoAlpha: 1,
        drawSVG: "100%",
        stagger: 0.1
      }, "-=0.2")
      .to(ideaNodes, {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.08,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(ideaTexts, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08
      }, "-=1.2");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle idea node click
  const handleIdeaClick = (idea: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Toggle between showing the idea detail and returning to overview
    setExpandedIdea(expandedIdea === idea ? null : idea);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Get the content for expanded idea view
  const getIdeaContent = (idea: string) => {
    switch(idea) {
      case 'fluency':
        return {
          title: 'Fluency',
          description: 'The ability to generate many ideas quickly',
          techniques: [
            'Brainstorming',
            'Timed idea generation',
            'Word association'
          ]
        };
      case 'flexibility':
        return {
          title: 'Flexibility',
          description: 'Creating different categories of ideas',
          techniques: [
            'Category shifting',
            'Perspective taking',
            'Cross-domain application'
          ]
        };
      case 'originality':
        return {
          title: 'Originality',
          description: 'Developing unique and novel ideas',
          techniques: [
            'Random stimulus',
            'Provocation techniques',
            'Exploring opposites'
          ]
        };
      case 'elaboration':
        return {
          title: 'Elaboration',
          description: 'Building upon and refining ideas',
          techniques: [
            'Idea mapping',
            'Six thinking hats',
            'Morphological analysis'
          ]
        };
      default:
        return {
          title: '',
          description: '',
          techniques: []
        };
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
        aria-label="Interactive Divergent Thinking diagram"
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
          <linearGradient id="central-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          <linearGradient id="idea-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="idea-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          <linearGradient id="idea-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          <linearGradient id="idea-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Central Node */}
        <circle 
          cx="300" cy="200" r="40" 
          className="central-node" 
          fill="url(#central-gradient)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
        />
        
        <text 
          x="300" y="200" 
          className="central-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Problem
        </text>
        
        {/* Connection Lines */}
        <path 
          d="M330,170 L400,120" 
          className="connection-line" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
        />
        
        <path 
          d="M330,200 L450,200" 
          className="connection-line" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
        />
        
        <path 
          d="M330,230 L400,280" 
          className="connection-line" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
        />
        
        <path 
          d="M270,170 L200,120" 
          className="connection-line" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
        />
        
        {/* Idea Nodes */}
        <circle 
          cx="450" cy="200" r="30" 
          className="idea-node" 
          fill="url(#idea-gradient-1)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleIdeaClick('fluency')}
        />
        
        <circle 
          cx="400" cy="120" r="30" 
          className="idea-node" 
          fill="url(#idea-gradient-2)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleIdeaClick('flexibility')}
        />
        
        <circle 
          cx="400" cy="280" r="30" 
          className="idea-node" 
          fill="url(#idea-gradient-3)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleIdeaClick('elaboration')}
        />
        
        <circle 
          cx="200" cy="120" r="30" 
          className="idea-node" 
          fill="url(#idea-gradient-4)" 
          fillOpacity="0.9"
          filter="url(#shadow)"
          style={{ cursor: 'pointer' }}
          onClick={() => handleIdeaClick('originality')}
        />
        
        {/* Idea Texts */}
        <text 
          x="450" y="200" 
          className="idea-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Fluency
        </text>
        
        <text 
          x="400" y="120" 
          className="idea-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Flexibility
        </text>
        
        <text 
          x="400" y="280" 
          className="idea-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Elaboration
        </text>
        
        <text 
          x="200" y="120" 
          className="idea-text" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12" 
          fontWeight="medium"
          dominantBaseline="central"
        >
          Originality
        </text>
      </svg>
      
      {/* Instructional Tooltip */}
      <AnimatePresence>
        {isIntroComplete && !expandedIdea && (
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
              Click on any approach to learn more
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Expanded Idea Details */}
      <AnimatePresence>
        {expandedIdea && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[280px] bg-black/80 backdrop-blur-md p-5 rounded-xl
                      text-white border border-white/10 shadow-xl z-10"
          >
            <h3 className="font-bold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              {getIdeaContent(expandedIdea).title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              {getIdeaContent(expandedIdea).description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-2">Techniques</h4>
              <ul className="space-y-1">
                {getIdeaContent(expandedIdea).techniques.map((technique, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    {technique}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => handleIdeaClick(expandedIdea)}
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
    </div>
  );
}