"use client";

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen with pixel ratio adjustment
    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Particle system
    const particles: Particle[] = [];
    const particleCount = 100;
    const maxDistance = 150;
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
      life: number;
      maxLife: number;
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
    
    function createParticle() {
      const colors = ['255,58,94', '77,69,255', '24,173,181']; // Red, Blue, Teal
      const size = Math.random() * 3 + 1;
      const maxLife = Math.random() * 200 + 50;
      
      particles.push({
        x: Math.random() * canvas.width / window.devicePixelRatio,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife,
      });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      // Create particles on mouse move
      if (Math.random() > 0.6) {
        const colors = ['255,58,94', '77,69,255', '24,173,181'];
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3,
          life: 0,
          maxLife: Math.random() * 50 + 20,
        });
      }
      
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationId: number;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update life
        p.life += 1;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          createParticle();
          continue;
        }
        
        // Mouse repulsion if mouse is moving
        if (isMouseMoving) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.2;
            p.vy += Math.sin(angle) * force * 0.2;
          }
        }
        
        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary check with bounce
        if (p.x <= 0 || p.x >= canvas.width / window.devicePixelRatio) {
          p.vx *= -1;
        }
        if (p.y <= 0 || p.y >= canvas.height / window.devicePixelRatio) {
          p.vy *= -1;
        }
        
        // Draw particle
        const fadeInOut = p.life < 10 ? p.life / 10 : p.life > p.maxLife - 10 ? (p.maxLife - p.life) / 10 : 1;
        ctx.globalAlpha = p.opacity * fadeInOut;
        ctx.fillStyle = `rgba(${p.color},${p.opacity * fadeInOut})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        ctx.globalAlpha = 0.1 * fadeInOut;
        ctx.strokeStyle = `rgba(${p.color},${0.1 * fadeInOut})`;
        ctx.lineWidth = 0.5;
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      id="particles-js"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}