"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function SecondOrderThinkingDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Track active section (null = overview, or specific order: 'first', 'second', 'third')
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Track animation state
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // All SVG elements for initial animation
    const nodes = svg.querySelectorAll('.thinking-node');
    const connections = svg.querySelectorAll('.connection');
    const nodeLabels = svg.querySelectorAll('.node-label');
    const nodeDescriptions = svg.querySelectorAll('.node-description');
    
    // Set initial state (all hidden)
    gsap.set([nodes, connections, nodeLabels, nodeDescriptions], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(nodes, { 
        autoAlpha: 1, 
        stagger: 0.2,
        scale: 1,
        transformOrigin: "center center",
        ease: "elastic.out(1, 0.5)"
      })
      .to(connections, {
        autoAlpha: 1, 
        stagger: 0.15,
        duration: 0.8,
        drawSVG: "100%",
        ease: "power2.inOut"
      }, "-=0.6")
      .to(nodeLabels, { 
        autoAlpha: 1, 
        stagger: 0.15,
        y: 0, 
        ease: "back.out(1.2)" 
      }, "-=0.8")
      .to(nodeDescriptions, { 
        autoAlpha: 1, 
        stagger: 0.1,
        ease: "power2.inOut" 
      }, "-=0.5");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle section selection
  const selectSection = (section: string | null) => {
    setActiveSection(section);
    
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements by type
    const allNodes = svg.querySelectorAll('.thinking-node');
    const allConnections = svg.querySelectorAll('.connection');
    const allLabels = svg.querySelectorAll('.node-label');
    const allDescriptions = svg.querySelectorAll('.node-description');
    
    // If returning to overview (null), reset everything
    if (section === null) {
      gsap.to([allNodes, allConnections, allLabels, allDescriptions], {
        scale: 1,
        fillOpacity: (el) => el.classList.contains('thinking-node') ? 0.8 : 1,
        strokeOpacity: (el) => el.classList.contains('connection') ? 0.7 : 1,
        opacity: 1,
        x: 0,
        y: 0,
        filter: "none",
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05
      });
      return;
    }
    
    // Get selected elements
    const selectedNode = svg.querySelector(`.${section}-order-node`);
    const otherNodes = svg.querySelectorAll(`.thinking-node:not(.${section}-order-node)`);
    const selectedLabel = svg.querySelector(`.${section}-order-label`);
    const otherLabels = svg.querySelectorAll(`.node-label:not(.${section}-order-label)`);
    const selectedDescription = svg.querySelector(`.${section}-order-description`);
    const otherDescriptions = svg.querySelectorAll(`.node-description:not(.${section}-order-description)`);
    
    // Get connections related to this node
    const relatedConnections = section === 'first' 
      ? svg.querySelectorAll('.first-connection')
      : section === 'second'
      ? svg.querySelectorAll('.first-connection, .second-connection')
      : svg.querySelectorAll('.connection');
    
    const otherConnections = section === 'first'
      ? svg.querySelectorAll('.connection:not(.first-connection)')
      : section === 'second'
      ? svg.querySelectorAll('.connection:not(.first-connection):not(.second-connection)')
      : [];
    
    // Animation timeline for section focus
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power2.inOut" } });
    
    // Highlight the selected node and related elements
    tl.to(selectedNode, {
      scale: 1.1,
      fillOpacity: 0.9,
      filter: "url(#glow)",
      duration: 0.5
    }, 0);
    
    // Highlight related connections
    tl.to(relatedConnections, {
      strokeOpacity: 0.9,
      strokeWidth: 3,
      duration: 0.5
    }, 0);
    
    // Enhance the selected label and description
    tl.to([selectedLabel, selectedDescription], {
      scale: 1.1,
      opacity: 1,
      fontWeight: "bold",
      filter: "url(#text-glow)",
      duration: 0.5
    }, 0);
    
    // Dim other nodes
    tl.to(otherNodes, {
      scale: 0.9,
      fillOpacity: 0.3,
      opacity: 0.5,
      duration: 0.5
    }, 0);
    
    // Dim other connections
    tl.to(otherConnections, {
      strokeOpacity: 0.3,
      strokeWidth: 1.5,
      opacity: 0.4,
      duration: 0.5
    }, 0);
    
    // Dim other labels and descriptions
    tl.to([otherLabels, otherDescriptions], {
      opacity: 0.3,
      scale: 0.9,
      duration: 0.5
    }, 0);
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
        aria-label="Interactive Second-Order Thinking diagram"
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
          
          {/* Node Gradients */}
          <linearGradient id="first-order-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          
          <linearGradient id="second-order-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          <linearGradient id="third-order-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          
          <linearGradient id="fourth-order-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        
        {/* Connection lines */}
        <path 
          d="M150,200 C200,200 200,150 250,150" 
          className="connection first-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M250,150 C300,150 300,90 350,90" 
          className="connection second-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M250,150 C300,150 300,210 350,210" 
          className="connection second-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M350,90 C400,90 400,50 450,50" 
          className="connection third-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M350,90 C400,90 400,130 450,130" 
          className="connection third-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M350,210 C400,210 400,170 450,170" 
          className="connection third-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        <path 
          d="M350,210 C400,210 400,250 450,250" 
          className="connection third-connection" 
          stroke="#fff" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="0"
          strokeOpacity="0.7"
        />
        
        {/* Thinking Nodes */}
        <circle 
          cx="150" cy="200" r="40" 
          className="thinking-node first-order-node" 
          fill="url(#first-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="First-order thinking"
          tabIndex={0}
          onClick={() => selectSection(activeSection === 'first' ? null : 'first')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="250" cy="150" r="35" 
          className="thinking-node second-order-node" 
          fill="url(#second-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Second-order thinking"
          tabIndex={0}
          onClick={() => selectSection(activeSection === 'second' ? null : 'second')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="350" cy="90" r="30" 
          className="thinking-node third-order-node" 
          fill="url(#third-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Third-order thinking"
          tabIndex={0}
          onClick={() => selectSection(activeSection === 'third' ? null : 'third')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="350" cy="210" r="30" 
          className="thinking-node third-order-node" 
          fill="url(#third-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Alternative third-order thinking"
          tabIndex={0}
          onClick={() => selectSection(activeSection === 'third' ? null : 'third')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="450" cy="50" r="25" 
          className="thinking-node fourth-order-node" 
          fill="url(#fourth-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
        />
        
        <circle 
          cx="450" cy="130" r="25" 
          className="thinking-node fourth-order-node" 
          fill="url(#fourth-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
        />
        
        <circle 
          cx="450" cy="170" r="25" 
          className="thinking-node fourth-order-node" 
          fill="url(#fourth-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
        />
        
        <circle 
          cx="450" cy="250" r="25" 
          className="thinking-node fourth-order-node" 
          fill="url(#fourth-order-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
        />
        
        {/* Node Labels */}
        <text 
          x="150" y="200" 
          className="node-label first-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          1st
        </text>
        
        <text 
          x="250" y="150" 
          className="node-label second-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          2nd
        </text>
        
        <text 
          x="350" y="90" 
          className="node-label third-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          3rd
        </text>
        
        <text 
          x="350" y="210" 
          className="node-label third-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="14" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          3rd
        </text>
        
        <text 
          x="450" y="50" 
          className="node-label fourth-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="10" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          4th
        </text>
        
        <text 
          x="450" y="130" 
          className="node-label fourth-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="10" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          4th
        </text>
        
        <text 
          x="450" y="170" 
          className="node-label fourth-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="10" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          4th
        </text>
        
        <text 
          x="450" y="250" 
          className="node-label fourth-order-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="10" 
          fontWeight="bold"
          dominantBaseline="central"
        >
          4th
        </text>
        
        {/* Node Descriptions */}
        <text 
          x="150" y="260" 
          className="node-description first-order-description" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12"
        >
          What happens next?
        </text>
        
        <text 
          x="250" y="100" 
          className="node-description second-order-description" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12"
        >
          And then what?
        </text>
        
        <text 
          x="350" y="40" 
          className="node-description third-order-description" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12"
        >
          What are the consequences?
        </text>
        
        <text 
          x="350" y="260" 
          className="node-description third-order-description" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="12"
        >
          And what else might happen?
        </text>
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
              {activeSection 
                ? 'Click again to return to overview'
                : 'Click on a node to explore deeper'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Focused section explanation panel */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 max-w-[220px] bg-black/80 backdrop-blur-md p-4 rounded-lg text-sm text-white border border-white/10"
          >
            <h3 className="font-bold mb-2 text-base">
              {activeSection === 'first' && 'First-Order Thinking'}
              {activeSection === 'second' && 'Second-Order Thinking'}
              {activeSection === 'third' && 'Third-Order Thinking'}
            </h3>
            
            <p className="text-gray-300 text-xs mb-3">
              {activeSection === 'first' && 'Focuses only on the immediate, obvious effects of a decision. Asks: "What will happen next?" Often leads to short-sighted choices that ignore long-term consequences.'}
              {activeSection === 'second' && 'Considers the subsequent effects beyond the immediate outcome. Asks: "And then what?" Reveals non-obvious consequences and implications, helping make more robust decisions.'}
              {activeSection === 'third' && 'Examines complex chain reactions and feedback loops. Recognizes that consequences have their own consequences. Anticipates potential unexpected outcomes and plans accordingly.'}
            </p>
            
            <p className="text-gray-400 text-xs mb-1">Example:</p>
            <div className="text-gray-300 text-xs mb-3">
              {activeSection === 'first' && '"I should cut prices to boost sales." (Only considers immediate impact on revenue)'}
              {activeSection === 'second' && '"Cutting prices may boost sales but reduce profit margins and potentially signal lower quality to customers."'}
              {activeSection === 'third' && '"Lower prices might trigger a price war with competitors, leading to industry-wide margin compression, followed by reduced innovation as R&D budgets are cut."'}
            </div>
            
            <button 
              onClick={() => selectSection(null)}
              className="mt-2 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Back to overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}