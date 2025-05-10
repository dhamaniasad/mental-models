"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';

export function IkigaiDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Track active section (null = overview, or one of the four main concepts)
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track animation state
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  const [is3DEnabled, setIs3DEnabled] = useState<boolean>(false);

  // Motion values for 3D rotation based on mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation angles with damping
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [10, -10]),
    { damping: 30, stiffness: 150 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-10, 10]),
    { damping: 30, stiffness: 150 }
  );

  // Mouse position tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get container dimensions and position
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to center
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    // Set up event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Initial animation sequence
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;

    // All SVG elements for initial animation
    const circles = svg.querySelectorAll('.main-circle');
    const centerPoint = svg.querySelector('.center-point');
    const mainLabels = svg.querySelectorAll('.main-label');
    const overlaps = svg.querySelectorAll('.overlap');
    const overlapLabels = svg.querySelectorAll('.overlap-label');

    // Set initial state (all hidden)
    gsap.set([circles, centerPoint, mainLabels, overlaps, overlapLabels], { autoAlpha: 0 });

    // Create intro animation timeline
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
      onComplete: () => {
        setIsIntroComplete(true);
        // Enable 3D effect after intro animation completes
        setTimeout(() => setIs3DEnabled(true), 500);
      }
    });

    // Build the animation sequence
    tl.to(circles, {
        autoAlpha: 1,
        stagger: 0.15,
        scale: 1,
        transformOrigin: "center center",
        ease: "elastic.out(1, 0.5)"
      })
      .to(overlaps, {
        autoAlpha: 0.5,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.5")
      .to(mainLabels, {
        autoAlpha: 1,
        stagger: 0.12,
        y: 0,
        ease: "back.out(1.5)"
      }, "-=0.5")
      .to(overlapLabels, {
        autoAlpha: 1,
        stagger: 0.1,
        scale: 1,
        ease: "back.out(1.5)"
      }, "-=0.5")
      .to(centerPoint, {
        autoAlpha: 1,
        scale: 1.2,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.3")
      .to(centerPoint, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });

    return () => {
      tl.kill();
    };
  }, []);

  // Handle section selection (click-based navigation instead of hover)
  const selectSection = (section: string | null) => {
    setActiveSection(section);

    if (!svgRef.current) return;

    const svg = svgRef.current;

    // Get all elements by type
    const allCircles = svg.querySelectorAll('.main-circle');
    const allLabels = svg.querySelectorAll('.main-label');
    const allOverlaps = svg.querySelectorAll('.overlap');
    const allOverlapLabels = svg.querySelectorAll('.overlap-label');
    const centerPoint = svg.querySelector('.center-point');

    // Scale the diagram based on section
    const diagramScale = section ? 1.1 : 1;
    gsap.to(svg, {
      scale: diagramScale,
      duration: 0.5,
      ease: "power3.out"
    });

    // If returning to overview (null), reset everything
    if (section === null) {
      gsap.to([allCircles, allLabels, allOverlaps, allOverlapLabels, centerPoint], {
        scale: 1,
        fillOpacity: (el) => el.classList.contains('overlap') ? 0.5 : 0.7,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.05
      });
      return;
    }

    // Get selected elements
    const selectedCircle = svg.querySelector(`.${section}-circle`);
    const otherCircles = svg.querySelectorAll(`.main-circle:not(.${section}-circle)`);
    const selectedLabel = svg.querySelector(`.${section}-label`);
    const otherLabels = svg.querySelectorAll(`.main-label:not(.${section}-label)`);

    // Get overlaps related to this section
    const relatedOverlaps = svg.querySelectorAll(`.overlap-${section}`);
    const otherOverlaps = svg.querySelectorAll(`.overlap:not(.overlap-${section})`);

    // Related and non-related overlap labels
    const relatedOverlapLabels = svg.querySelectorAll(`.overlap-label.overlap-${section}-label`);
    const otherOverlapLabels = svg.querySelectorAll(`.overlap-label:not(.overlap-${section}-label)`);

    // Animation timeline for section focus
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });

    // Highlight the selected circle and its related elements
    tl.to(selectedCircle, {
      scale: 1.05,
      fillOpacity: 0.9,
      duration: 0.6,
      filter: "url(#enhanced-glow)"
    }, 0);

    // Enhance related overlaps
    tl.to(relatedOverlaps, {
      fillOpacity: 0.7,
      duration: 0.6
    }, 0);

    // Enhance the selected label with glow
    tl.to(selectedLabel, {
      scale: 1.2,
      fontWeight: "bold",
      duration: 0.4,
      filter: "url(#text-glow)"
    }, 0);

    // Show related overlap labels more prominently
    tl.to(relatedOverlapLabels, {
      scale: 1.1,
      fillOpacity: 1,
      duration: 0.4
    }, 0);

    // Dim other circles
    tl.to(otherCircles, {
      scale: 0.95,
      fillOpacity: 0.2,
      opacity: 0.4,
      duration: 0.5
    }, 0);

    // Dim other labels
    tl.to(otherLabels, {
      opacity: 0.3,
      scale: 0.9,
      duration: 0.5
    }, 0);

    // Dim other overlaps
    tl.to(otherOverlaps, {
      fillOpacity: 0.1,
      opacity: 0.3,
      duration: 0.5
    }, 0);

    // Dim non-related overlap labels
    tl.to(otherOverlapLabels, {
      opacity: 0.2,
      duration: 0.5
    }, 0);

    // Add subtle 3D effect for depth
    if (section && selectedCircle instanceof SVGElement) {
      gsap.to(selectedCircle, {
        z: 20,
        duration: 0.4
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative perspective-[1200px]"
    >
      {/* 3D scene container with mouse tracking */}
      <motion.div
        ref={sceneRef}
        className="w-full h-full flex items-center justify-center transform-style-3d"
        style={is3DEnabled ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        } : {}}
      >
        {/* SVG Diagram */}
        <svg
          ref={svgRef}
          viewBox="0 0 500 500"
          className="w-full h-full max-w-[400px] max-h-[400px] transform-style-3d"
          aria-label="Interactive Ikigai diagram"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(40px)",
          }}
        >
          <defs>
            {/* Enhanced filters for 3D effect */}
            <filter id="enhanced-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
            </filter>

            <filter id="inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Circle Gradients - Enhanced with more color stops */}
            <linearGradient id="love-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#FF4081" />
              <stop offset="100%" stopColor="#FF0844" />
            </linearGradient>

            <linearGradient id="good-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4481EB" />
              <stop offset="50%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#04BEFE" />
            </linearGradient>

            <linearGradient id="paid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0BA360" />
              <stop offset="50%" stopColor="#26A69A" />
              <stop offset="100%" stopColor="#3CBA92" />
            </linearGradient>

            <linearGradient id="needs-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D423" />
              <stop offset="50%" stopColor="#FFAB40" />
              <stop offset="100%" stopColor="#FF4E50" />
            </linearGradient>

            <linearGradient id="ikigai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8E2DE2" />
              <stop offset="50%" stopColor="#7B1FA2" />
              <stop offset="100%" stopColor="#4A00E0" />
            </linearGradient>

            {/* Overlap Gradients - More complex gradients for depth */}
            <linearGradient id="passion-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#F06292" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4481EB" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="mission-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FF9800" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F9D423" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="profession-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4481EB" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#00BCD4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0BA360" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="vocation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D423" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#4CAF50" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0BA360" stopOpacity="0.7" />
            </linearGradient>

            {/* Adding radial gradients for additional depth */}
            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#673AB7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4A00E0" stopOpacity="0.5" />
            </radialGradient>
          </defs>

          {/* Main circles - interactive with ARIA attributes and 3D transforms */}
          <g className="circles-group" style={{ transform: "translateZ(10px)" }}>
            <circle
              cx="250" cy="180" r="120"
              className="main-circle love-circle"
              fill="url(#love-gradient)"
              fillOpacity="0.7"
              filter="url(#shadow)"
              role="button"
              aria-label="What you love - click to focus"
              tabIndex={0}
              onClick={() => selectSection(activeSection === 'love' ? null : 'love')}
              style={{ cursor: 'pointer' }}
            />

            <circle
              cx="170" cy="270" r="120"
              className="main-circle good-circle"
              fill="url(#good-gradient)"
              fillOpacity="0.7"
              filter="url(#shadow)"
              role="button"
              aria-label="What you're good at - click to focus"
              tabIndex={0}
              onClick={() => selectSection(activeSection === 'good' ? null : 'good')}
              style={{ cursor: 'pointer' }}
            />

            <circle
              cx="250" cy="360" r="120"
              className="main-circle paid-circle"
              fill="url(#paid-gradient)"
              fillOpacity="0.7"
              filter="url(#shadow)"
              role="button"
              aria-label="What you can be paid for - click to focus"
              tabIndex={0}
              onClick={() => selectSection(activeSection === 'paid' ? null : 'paid')}
              style={{ cursor: 'pointer' }}
            />

            <circle
              cx="330" cy="270" r="120"
              className="main-circle needs-circle"
              fill="url(#needs-gradient)"
              fillOpacity="0.7"
              filter="url(#shadow)"
              role="button"
              aria-label="What the world needs - click to focus"
              tabIndex={0}
              onClick={() => selectSection(activeSection === 'needs' ? null : 'needs')}
              style={{ cursor: 'pointer' }}
            />
          </g>

          {/* Overlap Areas - Different Z-indexes for 3D effect */}
          <g className="overlaps-group" style={{ transform: "translateZ(20px)" }}>
            <path
              d="M200,180 A120,120 0 0,1 250,60 A120,120 0 0,1 300,180 A120,120 0 0,0 250,200 A120,120 0 0,0 200,180 Z"
              className="overlap overlap-love overlap-good"
              fill="url(#passion-gradient)"
              fillOpacity="0.5"
            />

            <path
              d="M300,180 A120,120 0 0,1 370,270 A120,120 0 0,1 330,320 A120,120 0 0,0 280,240 A120,120 0 0,0 300,180 Z"
              className="overlap overlap-love overlap-needs"
              fill="url(#mission-gradient)"
              fillOpacity="0.5"
            />

            <path
              d="M170,320 A120,120 0 0,1 130,270 A120,120 0 0,1 200,180 A120,120 0 0,0 220,240 A120,120 0 0,0 170,320 Z"
              className="overlap overlap-good overlap-paid"
              fill="url(#profession-gradient)"
              fillOpacity="0.5"
            />

            <path
              d="M330,320 A120,120 0 0,1 280,340 A120,120 0 0,1 220,340 A120,120 0 0,0 240,290 A120,120 0 0,0 330,320 Z"
              className="overlap overlap-needs overlap-paid"
              fill="url(#vocation-gradient)"
              fillOpacity="0.5"
            />
          </g>

          {/* Center elements at highest Z level */}
          <g className="center-group" style={{ transform: "translateZ(30px)" }}>
            {/* Center overlap (Ikigai) */}
            <path
              d="M250,230 C280,240 300,250 280,280 C260,310 240,310 220,280 C200,250 220,240 250,230 Z"
              className="overlap overlap-love overlap-good overlap-paid overlap-needs"
              fill="url(#ikigai-gradient)"
              fillOpacity="0.8"
              filter="url(#shadow)"
            />

            {/* Center point (Ikigai) with enhanced glow effect */}
            <circle
              cx="250" cy="270" r="28"
              className="center-point"
              fill="url(#center-glow)"
              fillOpacity="0.9"
              filter="url(#enhanced-glow)"
              role="button"
              aria-label="Ikigai - the center of the diagram"
              tabIndex={0}
              onClick={() => selectSection(null)}
              style={{
                cursor: 'pointer',
                transform: "translateZ(5px)"
              }}
            />

            <text
              x="250" y="275"
              className="center-point-text"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              style={{
                transform: "translateZ(10px)",
                textShadow: "0 0 5px rgba(255, 255, 255, 0.7)"
              }}
            >
              IKIGAI
            </text>
          </g>

          {/* Labels with different Z depth */}
          <g className="labels-group" style={{ transform: "translateZ(25px)" }}>
            {/* Main Labels */}
            <g className="main-label love-label">
              <text
                x="250" y="100"
                textAnchor="middle"
                fill={activeSection === 'love' ? '#FF0844' : '#FF6B6B'}
                fontSize="16"
                fontWeight={activeSection === 'love' ? 'bold' : 'normal'}
                filter={activeSection === 'love' ? "url(#text-glow)" : ""}
              >
                What you LOVE
              </text>
            </g>

            <g className="main-label good-label">
              <text
                x="70" y="270"
                textAnchor="middle"
                fill={activeSection === 'good' ? '#04BEFE' : '#4481EB'}
                fontSize="16"
                fontWeight={activeSection === 'good' ? 'bold' : 'normal'}
                filter={activeSection === 'good' ? "url(#text-glow)" : ""}
              >
                What you're GOOD AT
              </text>
            </g>

            <g className="main-label paid-label">
              <text
                x="250" y="440"
                textAnchor="middle"
                fill={activeSection === 'paid' ? '#3CBA92' : '#0BA360'}
                fontSize="16"
                fontWeight={activeSection === 'paid' ? 'bold' : 'normal'}
                filter={activeSection === 'paid' ? "url(#text-glow)" : ""}
              >
                What you can be PAID FOR
              </text>
            </g>

            <g className="main-label needs-label">
              <text
                x="430" y="270"
                textAnchor="middle"
                fill={activeSection === 'needs' ? '#FF4E50' : '#F9D423'}
                fontSize="16"
                fontWeight={activeSection === 'needs' ? 'bold' : 'normal'}
                filter={activeSection === 'needs' ? "url(#text-glow)" : ""}
              >
                What the world NEEDS
              </text>
            </g>

            {/* Overlap Labels with glass effect */}
            <g className="overlap-labels" style={{ transform: "translateZ(15px)" }}>
              <g className="overlap-label overlap-love-label overlap-good-label">
                <circle cx="170" cy="170" r="18" fill="rgba(255, 255, 255, 0.15)" filter="url(#inner-shadow)" />
                <text x="170" y="175" textAnchor="middle" fill="#D1C4E9" fontSize="14" fontWeight="medium">
                  Passion
                </text>
              </g>

              <g className="overlap-label overlap-love-label overlap-needs-label">
                <circle cx="330" cy="170" r="18" fill="rgba(255, 255, 255, 0.15)" filter="url(#inner-shadow)" />
                <text x="330" y="175" textAnchor="middle" fill="#D1C4E9" fontSize="14" fontWeight="medium">
                  Mission
                </text>
              </g>

              <g className="overlap-label overlap-good-label overlap-paid-label">
                <circle cx="170" cy="370" r="18" fill="rgba(255, 255, 255, 0.15)" filter="url(#inner-shadow)" />
                <text x="170" y="375" textAnchor="middle" fill="#D1C4E9" fontSize="14" fontWeight="medium">
                  Profession
                </text>
              </g>

              <g className="overlap-label overlap-needs-label overlap-paid-label">
                <circle cx="330" cy="370" r="18" fill="rgba(255, 255, 255, 0.15)" filter="url(#inner-shadow)" />
                <text x="330" y="375" textAnchor="middle" fill="#D1C4E9" fontSize="14" fontWeight="medium">
                  Vocation
                </text>
              </g>
            </g>
          </g>

          {/* Animated particles for active sections */}
          <AnimatePresence>
            {activeSection && (
              <g className="particles" style={{ transform: "translateZ(40px)" }}>
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={activeSection === 'love' ? 250 : activeSection === 'good' ? 170 : activeSection === 'paid' ? 250 : 330}
                    cy={activeSection === 'love' ? 180 : activeSection === 'good' ? 270 : activeSection === 'paid' ? 360 : 270}
                    r={2 + Math.random() * 3}
                    fill={
                      activeSection === 'love' ? 'rgba(255, 105, 97, 0.8)' :
                      activeSection === 'good' ? 'rgba(68, 129, 235, 0.8)' :
                      activeSection === 'paid' ? 'rgba(11, 163, 96, 0.8)' :
                      'rgba(249, 212, 35, 0.8)'
                    }
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: ((Math.random() - 0.5) * 100),
                      y: ((Math.random() - 0.5) * 100),
                      scale: [0.5, 1.2, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      ease: "easeOut",
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  />
                ))}
              </g>
            )}
          </AnimatePresence>
        </svg>

        {/* Subtle floating dots in 3D space */}
        <AnimatePresence>
          {is3DEnabled && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`floating-dot-${i}`}
                  className="absolute rounded-full bg-white/20"
                  initial={{
                    x: Math.random() * 500 - 250,
                    y: Math.random() * 500 - 250,
                    z: Math.random() * -200,
                    opacity: 0
                  }}
                  animate={{
                    x: Math.random() * 500 - 250,
                    y: Math.random() * 500 - 250,
                    z: Math.random() * -200,
                    opacity: 0.2 + Math.random() * 0.3
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 10 + Math.random() * 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    width: 1 + Math.random() * 3,
                    height: 1 + Math.random() * 3,
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${Math.random() * -200}px)`
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3D Depth indicator - subtle grid that rotates with mouse */}
      {is3DEnabled && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(100,100,255,0.2) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX.get() * 0.5}deg) rotateY(${rotateY.get() * 0.5}deg) translateZ(-100px)`,
          }}
        />
      )}

      {/* Instructional Tooltip that appears once animation is complete */}
      <AnimatePresence>
        {isIntroComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-6 left-0 right-0 mx-auto w-max bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-gray-200 shadow-md"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(50px)"
            }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {activeSection
                ? 'Click again to return to overview'
                : is3DEnabled
                  ? 'Move your mouse to explore in 3D. Click on any circle to focus.'
                  : 'Click on any circle to explore the concept'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focused section explanation panel with glassmorphism */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 max-w-[220px] bg-black/60 backdrop-blur-lg p-5 rounded-xl text-sm text-white border border-white/10 shadow-xl"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(60px)"
            }}
          >
            <motion.h3
              className="font-bold mb-3 text-lg"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {activeSection === 'love' && (
                <span className="text-gradient bg-gradient-to-r from-pink-500 to-red-500">What you LOVE</span>
              )}
              {activeSection === 'good' && (
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-cyan-500">What you're GOOD AT</span>
              )}
              {activeSection === 'paid' && (
                <span className="text-gradient bg-gradient-to-r from-green-400 to-emerald-500">What you can be PAID FOR</span>
              )}
              {activeSection === 'needs' && (
                <span className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-500">What the world NEEDS</span>
              )}
            </motion.h3>

            <motion.p
              className="text-gray-300 text-sm leading-relaxed"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {activeSection === 'love' && 'Activities and pursuits that bring you joy, that you would do even if you weren\'t paid. These tap into your passion and purpose.'}
              {activeSection === 'good' && 'Your natural talents, skills, and strengths - areas where you excel or could develop mastery with dedication and practice.'}
              {activeSection === 'paid' && 'Activities that others value enough to pay you for - your marketable skills and services that fulfill economic demands.'}
              {activeSection === 'needs' && 'What society or communities around you require - the problems worth solving and gaps that need filling to create positive change.'}
            </motion.p>

            <motion.button
              onClick={() => selectSection(null)}
              className="mt-4 text-sm text-indigo-300 hover:text-indigo-200 transition-colors flex items-center group"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: -2 }}
            >
              <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to overview
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add a subtle reflection effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-40 pointer-events-none"
        style={{
          transform: "rotateX(180deg) translateZ(-60px) translateY(-20px)",
          transformOrigin: "bottom"
        }}
      />
    </div>
  );
}