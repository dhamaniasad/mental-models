"use client";

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
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
      
      draw();
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Sophisticated background with blurred gradient circles
    function draw() {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Sophisticated black gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#0A0A0A');
      bgGradient.addColorStop(1, '#111111');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Apply a very subtle grain effect
      applyGrain(ctx, width, height, 0.015);
      
      // Draw large blurred gradient circles
      drawBlurredCircles(ctx, width, height);
      
      // Add subtle grid of dots
      drawDotGrid(ctx, width, height);
      
      // Apply subtle vignette effect
      applyVignette(ctx, width, height);
    }
    
    function applyGrain(ctx, width, height, intensity) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * intensity;
        data[i] = data[i] + noise;
        data[i+1] = data[i+1] + noise;
        data[i+2] = data[i+2] + noise;
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
    
    function drawBlurredCircles(ctx, width, height) {
      // Create several large, blurred gradient circles
      ctx.save();
      
      // Define gradient circles with different colors
      const circles = [
        { x: width * 0.2, y: height * 0.3, radius: Math.max(width, height) * 0.3, color1: 'rgba(255, 30, 86, 0.03)', color2: 'rgba(5, 0, 0, 0)' },
        { x: width * 0.8, y: height * 0.7, radius: Math.max(width, height) * 0.4, color1: 'rgba(0, 30, 255, 0.02)', color2: 'rgba(0, 0, 5, 0)' },
        { x: width * 0.5, y: height * 0.2, radius: Math.max(width, height) * 0.25, color1: 'rgba(255, 30, 86, 0.015)', color2: 'rgba(5, 0, 0, 0)' },
        { x: width * 0.1, y: height * 0.7, radius: Math.max(width, height) * 0.2, color1: 'rgba(128, 0, 128, 0.02)', color2: 'rgba(0, 0, 0, 0)' },
      ];
      
      circles.forEach(circle => {
        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        
        gradient.addColorStop(0, circle.color1);
        gradient.addColorStop(1, circle.color2);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
    }
    
    function drawDotGrid(ctx, width, height) {
      ctx.save();
      
      // Draw subtle grid of dots
      const spacing = 40;
      const dotSize = 0.5;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      
      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          // Add slight randomness to dot positions
          const offsetX = (Math.random() - 0.5) * 2;
          const offsetY = (Math.random() - 0.5) * 2;
          
          // Different sizes and opacities for dots
          if (Math.random() > 0.97) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, dotSize * 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          } else if (Math.random() > 0.92) {
            ctx.fillStyle = 'rgba(255, 100, 100, 0.15)';
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, dotSize * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          } else {
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.restore();
    }
    
    function applyVignette(ctx, width, height) {
      ctx.save();
      
      // Create radial gradient for vignette effect
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 1.5
      );
      
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      ctx.restore();
    }
        
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}