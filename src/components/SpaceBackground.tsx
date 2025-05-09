"use client";

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    contextRef.current = context;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw on resize
      initializeStars();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Star properties
    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    
    // Initialize stars
    function initializeStars() {
      stars.length = 0; // Clear existing stars
      
      // Calculate number of stars based on screen size
      const totalStars = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < totalStars; i++) {
        const radius = Math.random() * 1.2;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          color: getStarColor(radius),
          speed: 0.05 + Math.random() * 0.05
        });
      }
    }
    
    // Get color based on star size
    function getStarColor(radius: number) {
      // Larger stars are more likely to have color
      if (radius > 0.8 && Math.random() > 0.7) {
        const colors = [
          "rgba(155, 176, 255, 0.8)", // Blueish
          "rgba(255, 180, 155, 0.8)", // Reddish
          "rgba(155, 255, 200, 0.8)"  // Greenish
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Most stars are white with varying opacity
      return `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
    }
    
    // Draw a single star
    function drawStar(star: typeof stars[0]) {
      if (!contextRef.current) return;
      
      const ctx = contextRef.current;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
      
      // Add glow to larger stars
      if (star.radius > 0.8) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          star.x, star.y, star.radius * 0.5,
          star.x, star.y, star.radius * 2
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Draw distant nebula
    function drawNebula() {
      if (!contextRef.current || !canvas) return;
      
      const ctx = contextRef.current;
      
      // Create a few random nebula clouds
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 100 + Math.random() * 200;
        
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        
        // Random nebula color
        const hue = Math.floor(Math.random() * 360);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 30%, 0.03)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 20%, 0.02)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Animation loop
    function animate() {
      if (!contextRef.current || !canvas) return;
      
      const ctx = contextRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = "rgba(5, 5, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebula effects
      drawNebula();
      
      // Draw and update stars
      stars.forEach(star => {
        // Move stars slightly for twinkling effect
        star.y += star.speed;
        
        // Wrap stars around screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        drawStar(star);
      });
      
      requestAnimationFrame(animate);
    }
    
    initializeStars();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="canvas-background"
      aria-hidden="true"
    />
  );
}