"use client";

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    color: string;
    speed: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleDirection: boolean;
  }>>([]);
  
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
    
    // Initialize stars
    function initializeStars() {
      // Clear existing stars
      starsRef.current = [];
      
      // Fewer stars for a more subtle effect
      const totalStars = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < totalStars; i++) {
        const radius = Math.random() * 0.8; // Smaller stars
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          color: getStarColor(radius),
          speed: 0.02 + Math.random() * 0.03, // Slower movement
          opacity: 0.2 + Math.random() * 0.5, // Lower base opacity
          twinkleSpeed: 0.001 + Math.random() * 0.002,
          twinkleDirection: Math.random() > 0.5
        });
      }
    }
    
    // Get color based on star size
    function getStarColor(radius: number) {
      // Fewer colored stars
      if (radius > 0.6 && Math.random() > 0.85) {
        const colors = [
          "rgba(155, 176, 255, 0.6)", // Blueish (more subtle)
          "rgba(255, 180, 155, 0.5)", // Reddish (more subtle)
          "rgba(155, 255, 200, 0.5)"  // Greenish (more subtle)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Most stars are white with very low opacity
      return `rgba(255, 255, 255, 0.7)`;
    }
    
    // Draw a single star
    function drawStar(star: typeof starsRef.current[0]) {
      if (!contextRef.current) return;
      
      const ctx = contextRef.current;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      // Apply the star's current opacity
      const color = star.color.replace(/[\d\.]+\)$/g, `${star.opacity})`);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add very subtle glow only to the larger stars
      if (star.radius > 0.7) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          star.x, star.y, star.radius * 0.3,
          star.x, star.y, star.radius * 1.5
        );
        gradient.addColorStop(0, color.replace(/[\d\.]+\)$/g, `${star.opacity * 0.3})`));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Draw subtle gradient background
    function drawBackground() {
      if (!contextRef.current || !canvas) return;
      
      const ctx = contextRef.current;
      
      // Create a dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(10, 10, 20, 1)");
      gradient.addColorStop(1, "rgba(5, 5, 15, 1)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Animation loop
    function animate() {
      if (!contextRef.current || !canvas) return;
      
      const ctx = contextRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      drawBackground();
      
      // Draw and update stars
      starsRef.current.forEach(star => {
        // Move stars very slowly
        star.y += star.speed;
        
        // Wrap stars around screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Subtle twinkling effect
        if (star.twinkleDirection) {
          star.opacity += star.twinkleSpeed;
          if (star.opacity >= 0.2 + Math.random() * 0.5) {
            star.twinkleDirection = false;
          }
        } else {
          star.opacity -= star.twinkleSpeed;
          if (star.opacity <= 0.1 + Math.random() * 0.2) {
            star.twinkleDirection = true;
          }
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