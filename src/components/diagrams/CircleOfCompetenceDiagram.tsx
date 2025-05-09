"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function CircleOfCompetenceDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Track active section (null = overview, or specific sections)
  const [activeZone, setActiveZone] = useState<string | null>(null);
  
  // Track animation state
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // All SVG elements for initial animation
    const circles = svg.querySelectorAll('.zone-circle');
    const labels = svg.querySelectorAll('.zone-label');
    const icons = svg.querySelectorAll('.zone-icon');
    const person = svg.querySelector('.person-icon');
    
    // Set initial state (all hidden)
    gsap.set([circles, labels, icons, person], { autoAlpha: 0 });
    
    // Create intro animation timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => setIsIntroComplete(true)
    });
    
    // Build the animation sequence
    tl.to(circles, { 
        autoAlpha: 1, 
        stagger: 0.15,
        scale: 1,
        duration: 0.8,
        transformOrigin: "center center",
        ease: "power2.out"
      })
      .to(labels, { 
        autoAlpha: 1, 
        stagger: 0.1,
        y: 0, 
        ease: "back.out(1.2)" 
      }, "-=0.4")
      .to(icons, { 
        autoAlpha: 1, 
        stagger: 0.1,
        scale: 1,
        ease: "back.out(1.2)" 
      }, "-=0.4")
      .to(person, { 
        autoAlpha: 1, 
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.5)" 
      }, "-=0.3");
      
    return () => {
      tl.kill();
    };
  }, []);

  // Handle zone selection
  const selectZone = (zone: string | null) => {
    setActiveZone(zone);
    
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Get all elements by type
    const allCircles = svg.querySelectorAll('.zone-circle');
    const allLabels = svg.querySelectorAll('.zone-label');
    const allIcons = svg.querySelectorAll('.zone-icon');
    const person = svg.querySelector('.person-icon');
    
    // If returning to overview (null), reset everything
    if (zone === null) {
      gsap.to([allCircles, allLabels, allIcons, person], {
        scale: 1,
        fillOpacity: (el) => el.classList.contains('zone-circle') ? 0.8 : 1,
        opacity: 1,
        duration: 0.5,
        filter: "none",
        ease: "power2.inOut",
        stagger: 0.05
      });
      return;
    }
    
    // Get selected elements
    const selectedCircle = svg.querySelector(`.${zone}-zone`);
    const otherCircles = svg.querySelectorAll(`.zone-circle:not(.${zone}-zone)`);
    const selectedLabel = svg.querySelector(`.${zone}-label`);
    const otherLabels = svg.querySelectorAll(`.zone-label:not(.${zone}-label)`);
    const selectedIcon = svg.querySelector(`.${zone}-icon`);
    const otherIcons = svg.querySelectorAll(`.zone-icon:not(.${zone}-icon)`);
    
    // Animation timeline for zone focus
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power2.inOut" } });
    
    // Highlight the selected zone
    tl.to(selectedCircle, {
      scale: 1.05,
      fillOpacity: 0.9,
      filter: "url(#glow)",
      duration: 0.5
    }, 0);
    
    // Highlight the selected label and icon
    tl.to([selectedLabel, selectedIcon], {
      scale: 1.1,
      opacity: 1,
      filter: "url(#text-glow)",
      duration: 0.5
    }, 0);
    
    // Dim other circles
    tl.to(otherCircles, {
      scale: 0.95,
      fillOpacity: 0.3,
      opacity: 0.5,
      duration: 0.5
    }, 0);
    
    // Dim other labels and icons
    tl.to([otherLabels, otherIcons], {
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
        viewBox="0 0 500 500" 
        className="w-full h-full max-w-[450px]"
        aria-label="Interactive Circle of Competence diagram"
      >
        <defs>
          {/* Filters */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="text-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          
          {/* Zone Gradients */}
          <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          
          <linearGradient id="competence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <linearGradient id="awareness-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          <linearGradient id="unknown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        
        {/* Concentric Circles for Zones */}
        <circle 
          cx="250" cy="250" r="200" 
          className="zone-circle unknown-zone" 
          fill="url(#unknown-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Unknown zone - click to focus"
          tabIndex={0}
          onClick={() => selectZone(activeZone === 'unknown' ? null : 'unknown')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="250" cy="250" r="150" 
          className="zone-circle awareness-zone" 
          fill="url(#awareness-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Awareness zone - click to focus"
          tabIndex={0}
          onClick={() => selectZone(activeZone === 'awareness' ? null : 'awareness')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="250" cy="250" r="100" 
          className="zone-circle competence-zone" 
          fill="url(#competence-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Competence zone - click to focus"
          tabIndex={0}
          onClick={() => selectZone(activeZone === 'competence' ? null : 'competence')}
          style={{ cursor: 'pointer' }}
        />
        
        <circle 
          cx="250" cy="250" r="50" 
          className="zone-circle core-zone" 
          fill="url(#core-gradient)" 
          fillOpacity="0.8"
          filter="url(#shadow)"
          role="button"
          aria-label="Core zone - click to focus"
          tabIndex={0}
          onClick={() => selectZone(activeZone === 'core' ? null : 'core')}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Person Icon in Center */}
        <g className="person-icon" transform="translate(235, 235)">
          <circle cx="15" cy="15" r="15" fill="#ffffff" fillOpacity="0.9" />
          <path d="M15,5 a7,7 0 0,1 0,14 a7,7 0 0,1 0,-14" fill="#333" />
          <circle cx="15" cy="10" r="5" fill="#333" />
        </g>
        
        {/* Zone Labels */}
        <text 
          x="250" y="40" 
          className="zone-label unknown-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="bold"
        >
          Unknown
        </text>
        
        <text 
          x="250" y="100" 
          className="zone-label awareness-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="bold"
        >
          Awareness
        </text>
        
        <text 
          x="250" y="150" 
          className="zone-label competence-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="bold"
        >
          Competence
        </text>
        
        <text 
          x="250" y="220" 
          className="zone-label core-label" 
          textAnchor="middle" 
          fill="#fff" 
          fontSize="16" 
          fontWeight="bold"
        >
          Core
        </text>
        
        {/* Zone Icons */}
        <g className="zone-icon unknown-icon" transform="translate(410, 250)">
          <circle cx="0" cy="0" r="20" fill="#ffffff" fillOpacity="0.2" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="18" fontWeight="bold">?</text>
        </g>
        
        <g className="zone-icon awareness-icon" transform="translate(370, 250)">
          <circle cx="0" cy="0" r="18" fill="#ffffff" fillOpacity="0.2" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="16" fontWeight="bold">!</text>
        </g>
        
        <g className="zone-icon competence-icon" transform="translate(330, 250)">
          <circle cx="0" cy="0" r="16" fill="#ffffff" fillOpacity="0.2" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="14" fontWeight="bold">✓</text>
        </g>
        
        <g className="zone-icon core-icon" transform="translate(290, 250)">
          <circle cx="0" cy="0" r="14" fill="#ffffff" fillOpacity="0.2" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="12" fontWeight="bold">★</text>
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
              {activeZone 
                ? 'Click again to return to overview'
                : 'Click on any circle to explore the zone'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Focused zone explanation panel */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 max-w-[220px] bg-black/80 backdrop-blur-md p-4 rounded-lg text-sm text-white border border-white/10"
          >
            <h3 className="font-bold mb-2 text-base">
              {activeZone === 'core' && 'Core Zone'}
              {activeZone === 'competence' && 'Competence Zone'}
              {activeZone === 'awareness' && 'Awareness Zone'}
              {activeZone === 'unknown' && 'Unknown Zone'}
            </h3>
            
            <p className="text-gray-300 text-xs mb-3">
              {activeZone === 'core' && 'Your area of deepest expertise where you have exceptional knowledge and skill. These are the domains where you have invested significant time and have mastered the fundamentals as well as nuances.'}
              {activeZone === 'competence' && 'Areas where you have solid knowledge and can make reliable judgments. You understand the key principles and can apply them effectively, though you may not have mastery of all the nuances.'}
              {activeZone === 'awareness' && 'Topics you know about but don\'t fully understand. You recognize the terminology and basic concepts, but lack the depth to make confident decisions without additional support.'}
              {activeZone === 'unknown' && 'Areas outside your knowledge where you don\'t know what you don\'t know. These are domains where you might overestimate your understanding due to lack of exposure to their complexity.'}
            </p>
            
            <p className="text-gray-400 text-xs mb-1">Strategy:</p>
            <ul className="text-gray-300 text-xs list-disc pl-4 space-y-1">
              {activeZone === 'core' && (
                <>
                  <li>Leverage for major decisions</li>
                  <li>Teach others to reinforce knowledge</li>
                  <li>Stay updated on latest developments</li>
                </>
              )}
              {activeZone === 'competence' && (
                <>
                  <li>Make decisions with confidence</li>
                  <li>Identify gaps to enhance expertise</li>
                  <li>Connect with experts for validation</li>
                </>
              )}
              {activeZone === 'awareness' && (
                <>
                  <li>Consult with experts before deciding</li>
                  <li>Research to expand understanding</li>
                  <li>Be humble about limitations</li>
                </>
              )}
              {activeZone === 'unknown' && (
                <>
                  <li>Remain cautious and skeptical</li>
                  <li>Avoid making key decisions</li>
                  <li>Delegate to true experts</li>
                </>
              )}
            </ul>
            
            <button 
              onClick={() => selectZone(null)}
              className="mt-3 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Back to overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}