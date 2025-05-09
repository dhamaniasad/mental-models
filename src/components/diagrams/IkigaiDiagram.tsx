"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export function IkigaiDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const circles = svg.querySelectorAll('.circle');
    const centerPoint = svg.querySelector('.center-point');
    const labels = svg.querySelectorAll('.label');
    const descriptions = svg.querySelectorAll('.description');
    const lines = svg.querySelectorAll('.connection-line');
    
    gsap.set([circles, centerPoint, labels, descriptions, lines], { autoAlpha: 0 });
    
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
    
    tl.to(circles, { 
        autoAlpha: 1, 
        stagger: 0.2,
        scale: 1,
        transformOrigin: "center center",
        ease: "elastic.out(1, 0.5)"
      })
      .to(lines, { 
        autoAlpha: 0.7, 
        stagger: 0.1,
        drawSVG: "0% 100%",
        ease: "power2.inOut"
      }, "-=0.8")
      .to(labels, { 
        autoAlpha: 1, 
        stagger: 0.15,
        y: 0, 
        ease: "back.out(1.7)" 
      }, "-=0.8")
      .to(descriptions, { 
        autoAlpha: 1, 
        stagger: 0.15,
        scale: 1,
        ease: "back.out(1.7)" 
      }, "-=0.8")
      .to(centerPoint, { 
        autoAlpha: 1, 
        scale: 1.2, 
        duration: 1.2,
        ease: "elastic.out(1, 0.5)" 
      }, "-=0.5")
      .to(centerPoint, { 
        scale: 1, 
        duration: 0.5,
        ease: "power2.out" 
      });
      
    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !svgRef.current) return;
    
    const svg = svgRef.current;
    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    
    // Calculate mouse position relative to the container
    const mouseX = ((e.clientX - left) / width) - 0.5;
    const mouseY = ((e.clientY - top) / height) - 0.5;
    
    // Apply tilt effect to the SVG
    gsap.to(svg, {
      rotateY: mouseX * 10,
      rotateX: -mouseY * 10,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Add depth effect to circles based on distance from cursor
    const circles = svg.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
      const depth = (index + 1) * 5;
      gsap.to(circle, {
        z: depth,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  };
  
  const handleMouseLeave = () => {
    if (!svgRef.current) return;
    
    // Reset tilt and depth effects
    gsap.to(svgRef.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.7)"
    });
    
    // Reset circle depths
    const circles = svgRef.current.querySelectorAll('.circle');
    circles.forEach(circle => {
      gsap.to(circle, {
        z: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.7)"
      });
    });
  };

  const handleCircleHover = (section: string) => {
    setHoveredSection(section);

    if (!svgRef.current) return;

    const svg = svgRef.current;
    const hoverCircle = svg.querySelector(`.${section}-circle`);
    const otherCircles = svg.querySelectorAll(`.circle:not(.${section}-circle)`);
    const centerPoint = svg.querySelector('.center-point');

    // Kill any existing GSAP animations to prevent glitches
    gsap.killTweensOf(hoverCircle);
    gsap.killTweensOf(otherCircles);
    gsap.killTweensOf(centerPoint);

    // Highlight the hovered circle
    gsap.to(hoverCircle, {
      scale: 1.03, // Reduced scale for less dramatic effect
      fillOpacity: 0.6,
      duration: 0.4, // Slower animation for smoother effect
      ease: "power1.out" // Gentler easing
    });

    // Dim other circles
    gsap.to(otherCircles, {
      fillOpacity: 0.15,
      duration: 0.4, // Slower animation for smoother effect
      ease: "power1.out" // Gentler easing
    });

    // Pulse the center point
    gsap.to(centerPoint, {
      scale: 1.05, // Reduced scale for subtler effect
      fillOpacity: 1,
      duration: 0.5, // Slower animation
      ease: "sine.inOut" // Smoother easing for pulsing
    });
  };
  
  const handleCircleLeave = () => {
    setHoveredSection(null);

    if (!svgRef.current) return;

    const svg = svgRef.current;
    const allCircles = svg.querySelectorAll('.circle');
    const centerPoint = svg.querySelector('.center-point');

    // Kill any existing GSAP animations to prevent glitches
    gsap.killTweensOf(allCircles);
    gsap.killTweensOf(centerPoint);

    // Reset all circles
    gsap.to(allCircles, {
      scale: 1,
      fillOpacity: 0.5,
      duration: 0.4, // Slower animation for smoother effect
      ease: "power1.out" // Gentler easing
    });

    // Reset center point
    gsap.to(centerPoint, {
      scale: 1,
      fillOpacity: 0.9,
      duration: 0.4, // Slower animation for smoother effect
      ease: "power1.out" // Gentler easing
    });
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg 
        ref={svgRef}
        viewBox="0 0 500 500" 
        className="w-full h-full max-w-[450px] transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="love-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FF0844" />
          </linearGradient>
          
          <linearGradient id="good-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4481EB" />
            <stop offset="100%" stopColor="#04BEFE" />
          </linearGradient>
          
          <linearGradient id="paid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0BA360" />
            <stop offset="100%" stopColor="#3CBA92" />
          </linearGradient>
          
          <linearGradient id="needs-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D423" />
            <stop offset="100%" stopColor="#FF4E50" />
          </linearGradient>
          
          <linearGradient id="ikigai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8E2DE2" />
            <stop offset="100%" stopColor="#4A00E0" />
          </linearGradient>
          
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Connection lines (drawn before circles) */}
        <path 
          d="M250,180 C250,230 200,270 170,270" 
          className="connection-line" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1" 
          fill="none" 
        />
        <path 
          d="M250,180 C250,230 300,270 330,270" 
          className="connection-line" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1" 
          fill="none" 
        />
        <path 
          d="M170,270 C200,270 250,320 250,360" 
          className="connection-line" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1" 
          fill="none" 
        />
        <path 
          d="M330,270 C300,270 250,320 250,360" 
          className="connection-line" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1" 
          fill="none" 
        />
        
        {/* Main circles */}
        <circle 
          cx="250" cy="180" r="120" 
          className="circle love-circle" 
          fill="url(#love-gradient)" 
          fillOpacity="0.5"
          filter="url(#shadow)"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}
          onMouseEnter={() => handleCircleHover('love')}
          onMouseLeave={handleCircleLeave}
        />
        <circle 
          cx="170" cy="270" r="120" 
          className="circle good-circle" 
          fill="url(#good-gradient)" 
          fillOpacity="0.5"
          filter="url(#shadow)"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
          onMouseEnter={() => handleCircleHover('good')}
          onMouseLeave={handleCircleLeave}
        />
        <circle 
          cx="250" cy="360" r="120" 
          className="circle paid-circle" 
          fill="url(#paid-gradient)" 
          fillOpacity="0.5"
          filter="url(#shadow)"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
          onMouseEnter={() => handleCircleHover('paid')}
          onMouseLeave={handleCircleLeave}
        />
        <circle 
          cx="330" cy="270" r="120" 
          className="circle needs-circle" 
          fill="url(#needs-gradient)" 
          fillOpacity="0.5"
          filter="url(#shadow)"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
          onMouseEnter={() => handleCircleHover('needs')}
          onMouseLeave={handleCircleLeave}
        />
        
        {/* Center point (Ikigai) with glow effect */}
        <circle 
          cx="250" cy="270" r="40" 
          className="center-point" 
          fill="url(#ikigai-gradient)" 
          fillOpacity="0.9"
          filter="url(#glow)"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}
        />
        <text 
          x="250" y="275" 
          className="center-point" 
          textAnchor="middle" 
          fill="white" 
          fontSize="16" 
          fontWeight="bold"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        >
          IKIGAI
        </text>
        
        {/* Main Labels with pulse animation */}
        <g className="label" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
          <text 
            x="250" y="100" 
            textAnchor="middle" 
            fill={hoveredSection === 'love' ? '#FF0844' : '#FF6B6B'} 
            fontSize="16" 
            fontWeight="bold"
            filter={hoveredSection === 'love' ? "url(#glow)" : ""}
          >
            What you LOVE
          </text>
        </g>
        
        <g className="label" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
          <text 
            x="70" y="270" 
            textAnchor="middle" 
            fill={hoveredSection === 'good' ? '#04BEFE' : '#4481EB'} 
            fontSize="16" 
            fontWeight="bold"
            filter={hoveredSection === 'good' ? "url(#glow)" : ""}
          >
            What you're GOOD AT
          </text>
        </g>
        
        <g className="label" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
          <text 
            x="250" y="440" 
            textAnchor="middle" 
            fill={hoveredSection === 'paid' ? '#3CBA92' : '#0BA360'} 
            fontSize="16" 
            fontWeight="bold"
            filter={hoveredSection === 'paid' ? "url(#glow)" : ""}
          >
            What you can be PAID FOR
          </text>
        </g>
        
        <g className="label" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(25px)' }}>
          <text 
            x="430" y="270" 
            textAnchor="middle" 
            fill={hoveredSection === 'needs' ? '#FF4E50' : '#F9D423'} 
            fontSize="16" 
            fontWeight="bold"
            filter={hoveredSection === 'needs' ? "url(#glow)" : ""}
          >
            What the world NEEDS
          </text>
        </g>
        
        {/* Description labels for intersections */}
        <g className="description" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          <circle cx="170" cy="170" r="18" fill="white" fillOpacity="0.1" />
          <text x="170" y="175" textAnchor="middle" fill="#8E2DE2" fontSize="14" fontWeight="medium">
            Passion
          </text>
        </g>
        
        <g className="description" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          <circle cx="330" cy="170" r="18" fill="white" fillOpacity="0.1" />
          <text x="330" y="175" textAnchor="middle" fill="#8E2DE2" fontSize="14" fontWeight="medium">
            Mission
          </text>
        </g>
        
        <g className="description" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          <circle cx="170" cy="370" r="18" fill="white" fillOpacity="0.1" />
          <text x="170" y="375" textAnchor="middle" fill="#8E2DE2" fontSize="14" fontWeight="medium">
            Profession
          </text>
        </g>
        
        <g className="description" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          <circle cx="330" cy="370" r="18" fill="white" fillOpacity="0.1" />
          <text x="330" y="375" textAnchor="middle" fill="#8E2DE2" fontSize="14" fontWeight="medium">
            Vocation
          </text>
        </g>
      </svg>
    </motion.div>
  );
}