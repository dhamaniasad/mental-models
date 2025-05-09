"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface CanvasProps {
  cursorPosition: {
    x: number;
    y: number;
  };
}

export function Canvas({ cursorPosition }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (!canvasRef.current || !inView) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Particle settings - reduced count for less busy appearance
    const particleCount = 80;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    // Create gradient colors with reduced opacity
    const gradientColors = [
      'rgba(138, 43, 226, 0.4)', // purple
      'rgba(30, 144, 255, 0.4)', // blue
      'rgba(220, 20, 60, 0.4)',  // crimson
    ];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const randomColorIndex = Math.floor(Math.random() * gradientColors.length);
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2, // Reduced speed for more subtle movement
        speedY: (Math.random() - 0.5) * 0.2, // Reduced speed for more subtle movement
        color: gradientColors[randomColorIndex],
      });
    }
    
    // Animation variables
    let mouseRadius = 100;
    
    // Animation loop
    function animate() {
      // Create slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and render particles
      for (const particle of particles) {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Calculate distance from cursor
        const dx = cursorPosition.x - particle.x;
        const dy = cursorPosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply cursor repulsion
        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;
          
          // Push particle away from cursor
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }
      
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 80})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [inView, cursorPosition]);
  
  return (
    <canvas 
      ref={(node) => {
        canvasRef.current = node;
        if (ref) {
          // @ts-ignore - this is fine because we're just passing the ref
          ref(node);
        }
      }}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
}