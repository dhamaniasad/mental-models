"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function EisenhowerDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Track active quadrant (null = overview, or one of the four quadrants)
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  
  // Track animation state
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // All SVG elements for initial animation
    const quadrants = svg.querySelectorAll('.quadrant');
    const labels = svg.querySelectorAll('.quadrant-label');
    const actions = svg.querySelectorAll('.action-label');
    const axes = svg.querySelectorAll('.axis');
    const axesLabels = svg.querySelectorAll('.axis-label');
    
    // Set initial state (all hidden)
    gsap.set([quadrants, labels, actions, axes, axesLabels], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(axes, { 
        autoAlpha: 1, 
        duration: 0.8,
        ease: "power1.inOut"
      })
      .to(axesLabels, {
        autoAlpha: 1, 
        stagger: 0.1,
        ease: "power1.inOut"
      }, "-=0.4")
      .to(quadrants, { 
        autoAlpha: 1, 
        stagger: 0.15,
        scale: 1,
        transformOrigin: "center center",
        ease: "power2.out"
      }, "-=0.3")
      .to(labels, { 
        autoAlpha: 1, 
        stagger: 0.15,
        y: 0, 
        ease: "back.out(1.2)" 
      }, "-=0.5")
      .to(actions, { 
        autoAlpha: 1, 
        stagger: 0.1,
        scale: 1,
        ease: "back.out(1.2)" 
      }, "-=0.5");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle quadrant selection (click-based navigation)
  const selectQuadrant = (quadrant: string | null) => {
    setActiveQuadrant(quadrant);
    
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements by type
    const allQuadrants = svg.querySelectorAll('.quadrant');
    const allLabels = svg.querySelectorAll('.quadrant-label');
    const allActions = svg.querySelectorAll('.action-label');
    
    // If returning to overview (null), reset everything
    if (quadrant === null) {
      gsap.to([allQuadrants, allLabels, allActions], {
        scale: 1,
        fillOpacity: (el) => el.classList.contains('quadrant') ? 0.8 : 1,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05
      });
      return;
    }
    
    // Get selected elements
    const selectedQuadrant = svg.querySelector(`.${quadrant}-quadrant`);
    const otherQuadrants = svg.querySelectorAll(`.quadrant:not(.${quadrant}-quadrant)`);
    const selectedLabel = svg.querySelector(`.${quadrant}-label`);
    const otherLabels = svg.querySelectorAll(`.quadrant-label:not(.${quadrant}-label)`);
    const selectedAction = svg.querySelector(`.${quadrant}-action`);
    const otherActions = svg.querySelectorAll(`.action-label:not(.${quadrant}-action)`);
    
    // Animation timeline for quadrant focus
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power2.inOut" } });
    
    // Highlight the selected quadrant
    tl.to(selectedQuadrant, {
      scale: 1.05,
      fillOpacity: 0.9,
      duration: 0.5
    }, 0);
    
    // Highlight the selected label and action
    tl.to([selectedLabel, selectedAction], {
      scale: 1.1,
      fontWeight: "bold",
      duration: 0.4
    }, 0);
    
    // Dim other quadrants
    tl.to(otherQuadrants, {
      scale: 0.95,
      fillOpacity: 0.3,
      opacity: 0.5,
      duration: 0.4
    }, 0);
    
    // Dim other labels and actions
    tl.to([otherLabels, otherActions], {
      opacity: 0.3,
      scale: 0.9,
      duration: 0.4
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
        viewBox="0 0 500 500" 
        className="w-full h-full max-w-[450px]"
        aria-label="Interactive Eisenhower Matrix diagram"
      >
        <defs>
          {/* Filter for shadow */}
          <filter id="shadow-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradients for quadrants */}
          <linearGradient id="q1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          
          <linearGradient id="q2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          
          <linearGradient id="q3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          
          <linearGradient id="q4-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3a3a3" />
            <stop offset="100%" stopColor="#737373" />
          </linearGradient>
        </defs>
        
        {/* Axes lines */}
        <line x1="250" y1="100" x2="250" y2="400" className="axis" stroke="#fff" strokeWidth="3" strokeOpacity="0.7" />
        <line x1="100" y1="250" x2="400" y2="250" className="axis" stroke="#fff" strokeWidth="3" strokeOpacity="0.7" />
        
        {/* Axis labels */}
        <text x="250" y="80" className="axis-label" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">IMPORTANCE</text>
        <text x="75" y="250" className="axis-label" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" transform="rotate(-90, 75, 250)">URGENCY</text>
        
        <text x="250" y="425" className="axis-label" textAnchor="middle" fill="#fff" fontSize="12" opacity="0.8">Less Important</text>
        <text x="250" y="120" className="axis-label" textAnchor="middle" fill="#fff" fontSize="12" opacity="0.8">More Important</text>
        <text x="425" y="250" className="axis-label" textAnchor="middle" fill="#fff" fontSize="12" opacity="0.8" transform="rotate(-90, 425, 250)">Less Urgent</text>
        <text x="120" y="250" className="axis-label" textAnchor="middle" fill="#fff" fontSize="12" opacity="0.8" transform="rotate(-90, 120, 250)">More Urgent</text>
        
        {/* Quadrants - clickable with ARIA support */}
        <rect 
          x="100" y="100" width="150" height="150" 
          className="quadrant q1-quadrant" 
          fill="url(#q1-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow-blur)"
          rx="2" ry="2"
          role="button"
          aria-label="Quadrant 1: Urgent and Important"
          tabIndex={0}
          onClick={() => selectQuadrant(activeQuadrant === 'q1' ? null : 'q1')}
          style={{ cursor: 'pointer' }}
        />
        
        <rect 
          x="250" y="100" width="150" height="150" 
          className="quadrant q2-quadrant" 
          fill="url(#q2-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow-blur)"
          rx="2" ry="2"
          role="button"
          aria-label="Quadrant 2: Important but Not Urgent"
          tabIndex={0}
          onClick={() => selectQuadrant(activeQuadrant === 'q2' ? null : 'q2')}
          style={{ cursor: 'pointer' }}
        />
        
        <rect 
          x="100" y="250" width="150" height="150" 
          className="quadrant q3-quadrant" 
          fill="url(#q3-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow-blur)"
          rx="2" ry="2"
          role="button"
          aria-label="Quadrant 3: Urgent but Not Important"
          tabIndex={0}
          onClick={() => selectQuadrant(activeQuadrant === 'q3' ? null : 'q3')}
          style={{ cursor: 'pointer' }}
        />
        
        <rect 
          x="250" y="250" width="150" height="150" 
          className="quadrant q4-quadrant" 
          fill="url(#q4-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow-blur)"
          rx="2" ry="2"
          role="button"
          aria-label="Quadrant 4: Neither Urgent nor Important"
          tabIndex={0}
          onClick={() => selectQuadrant(activeQuadrant === 'q4' ? null : 'q4')}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Quadrant Labels */}
        <text x="175" y="140" className="quadrant-label q1-label" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="medium">
          Urgent & Important
        </text>
        
        <text x="325" y="140" className="quadrant-label q2-label" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="medium">
          Important, Not Urgent
        </text>
        
        <text x="175" y="290" className="quadrant-label q3-label" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="medium">
          Urgent, Not Important
        </text>
        
        <text x="325" y="290" className="quadrant-label q4-label" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="medium">
          Not Urgent or Important
        </text>
        
        {/* Action Labels */}
        <text x="175" y="170" className="action-label q1-action" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">
          DO
        </text>
        
        <text x="325" y="170" className="action-label q2-action" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">
          SCHEDULE
        </text>
        
        <text x="175" y="320" className="action-label q3-action" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">
          DELEGATE
        </text>
        
        <text x="325" y="320" className="action-label q4-action" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">
          ELIMINATE
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
              {activeQuadrant 
                ? 'Click again to return to full matrix'
                : 'Click on any quadrant to learn more'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Focused quadrant explanation panel */}
      <AnimatePresence>
        {activeQuadrant && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 max-w-[220px] bg-black/80 backdrop-blur-md p-4 rounded-lg text-sm text-white border border-white/10"
          >
            <h3 className="font-bold mb-2 text-base">
              {activeQuadrant === 'q1' && 'Q1: Urgent & Important'}
              {activeQuadrant === 'q2' && 'Q2: Important, Not Urgent'}
              {activeQuadrant === 'q3' && 'Q3: Urgent, Not Important'}
              {activeQuadrant === 'q4' && 'Q4: Not Urgent or Important'}
            </h3>
            
            <div className="text-xl font-bold mb-3">
              {activeQuadrant === 'q1' && <span className="text-red-500">DO</span>}
              {activeQuadrant === 'q2' && <span className="text-blue-500">SCHEDULE</span>}
              {activeQuadrant === 'q3' && <span className="text-orange-500">DELEGATE</span>}
              {activeQuadrant === 'q4' && <span className="text-gray-400">ELIMINATE</span>}
            </div>
            
            <p className="text-gray-300 text-xs mb-3">
              {activeQuadrant === 'q1' && 'Tasks that are both urgent and important require immediate attention. These are crises, deadlines, and critical issues that cannot wait.'}
              {activeQuadrant === 'q2' && 'Tasks that are important but not urgent should be scheduled. These activities contribute to long-term goals and require proactive planning.'}
              {activeQuadrant === 'q3' && 'Tasks that are urgent but not important should be delegated if possible. These activities demand attention but don\'t contribute significantly to your goals.'}
              {activeQuadrant === 'q4' && 'Tasks that are neither urgent nor important should be eliminated. These activities are distractions that don\'t contribute value and waste time.'}
            </p>
            
            <p className="text-gray-400 text-xs mb-1">Examples:</p>
            <ul className="text-gray-300 text-xs list-disc pl-4 space-y-1">
              {activeQuadrant === 'q1' && (
                <>
                  <li>Critical deadlines</li>
                  <li>Emergency situations</li>
                  <li>Active customer issues</li>
                </>
              )}
              {activeQuadrant === 'q2' && (
                <>
                  <li>Strategic planning</li>
                  <li>Relationship building</li>
                  <li>Learning and development</li>
                </>
              )}
              {activeQuadrant === 'q3' && (
                <>
                  <li>Many meetings</li>
                  <li>Some emails and calls</li>
                  <li>Minor interruptions</li>
                </>
              )}
              {activeQuadrant === 'q4' && (
                <>
                  <li>Mindless browsing</li>
                  <li>Time-wasting activities</li>
                  <li>Excessive social media</li>
                </>
              )}
            </ul>
            
            <button 
              onClick={() => selectQuadrant(null)}
              className="mt-3 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Back to full matrix
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}