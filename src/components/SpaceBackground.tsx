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
    
    // Simple grid pattern for brutalist aesthetic
    function draw() {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw minimal grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Large grid (64px)
      const gridSize = 64;
      
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Add occasional thicker lines for visual interest
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      
      // Thicker vertical lines (every 4)
      for (let x = 0; x <= width; x += gridSize * 4) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Thicker horizontal lines (every 4)
      for (let y = 0; y <= height; y += gridSize * 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Add a red accent line
      ctx.strokeStyle = 'rgba(255, 82, 82, 0.4)';
      ctx.lineWidth = 2;
      
      const accentLineY = height / 3;
      ctx.beginPath();
      ctx.moveTo(0, accentLineY);
      ctx.lineTo(width, accentLineY);
      ctx.stroke();
      
      // Add crosshair points at grid intersections
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let x = 0; x <= width; x += gridSize * 4) {
        for (let y = 0; y <= height; y += gridSize * 4) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Add random noise dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let i = 0; i < width * height / 10000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
        
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="canvas-background"
        aria-hidden="true"
      />
      <div className="brutalist-grid"></div>
    </>
  );
}