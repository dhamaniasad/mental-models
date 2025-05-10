"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface CanvasProps {
  cursorPosition: {
    x: number;
    y: number;
  };
}

interface GridPoint {
  x: number;
  y: number;
  baseY: number;
  originalY: number;
  size: number;
  hue: number;
  opacity: number;
  velocity: number;
  maxDisplacement: number;
}

interface FloatingParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  phase: number;
  depth: number; // For 3D effect
}

export function Canvas({ cursorPosition }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FloatingParticle[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // Grid points for the interactive waves effect
  const gridPointsRef = useRef<GridPoint[]>([]);
  const timeRef = useRef<number>(0);
  const previousTimestampRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set up separate canvas for gradients to improve performance
    if (!gradientCanvasRef.current) return;
    const gradientCanvas = gradientCanvasRef.current;
    const gradientCtx = gradientCanvas.getContext('2d');
    if (!gradientCtx) return;

    // Set canvas to full screen with pixel ratio adjustment
    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;

      // Main canvas
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);

      // Gradient canvas
      gradientCanvas.width = window.innerWidth * pixelRatio;
      gradientCanvas.height = window.innerHeight * pixelRatio;
      gradientCanvas.style.width = `${window.innerWidth}px`;
      gradientCanvas.style.height = `${window.innerHeight}px`;
      gradientCtx.scale(pixelRatio, pixelRatio);

      // Redraw on resize
      drawGradientBackground();

      // Initialize the interactive grid
      initializeGrid();
      initializeParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    function drawGradientBackground() {
      // Create a rich radial gradient for the background
      const centerX = gradientCanvas.width / (window.devicePixelRatio || 1) / 2;
      const centerY = gradientCanvas.height / (window.devicePixelRatio || 1) / 2;

      // Create gradient from center to edges
      const gradient = gradientCtx.createRadialGradient?.(
        centerX, centerY, 0,
        centerX, centerY, Math.max(centerX, centerY) * 1.2
      ) as CanvasGradient;

      // Rich color stops for depth
      gradient.addColorStop(0, 'rgba(18, 18, 40, 1)');      // Deep blue-black at center
      gradient.addColorStop(0.4, 'rgba(12, 12, 35, 1)');    // Dark blue
      gradient.addColorStop(0.7, 'rgba(10, 8, 30, 1)');     // Even darker
      gradient.addColorStop(1, 'rgba(5, 3, 20, 1)');        // Almost black at edges

      // Fill the background
      gradientCtx.fillStyle = gradient;
      gradientCtx.fillRect(0, 0, gradientCanvas.width / (window.devicePixelRatio || 1), gradientCanvas.height / (window.devicePixelRatio || 1));

      // Add vignette effect
      const vignetteGradient = gradientCtx.createRadialGradient?.(
        centerX, centerY, 0,
        centerX, centerY, Math.max(centerX, centerY) * 1.1
      ) as CanvasGradient;

      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      gradientCtx.fillStyle = vignetteGradient;
      gradientCtx.fillRect(0, 0, gradientCanvas.width / (window.devicePixelRatio || 1), gradientCanvas.height / (window.devicePixelRatio || 1));

      // Optional: Add a subtle noise texture
      addNoiseTexture(gradientCtx, gradientCanvas);
    }

    function addNoiseTexture(context: CanvasRenderingContext2D, targetCanvas: HTMLCanvasElement) {
      // Create a subtle noise pattern with very low opacity
      const pixelRatio = window.devicePixelRatio || 1;
      const imageData = context.createImageData(
        targetCanvas.width / pixelRatio,
        targetCanvas.height / pixelRatio
      );
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Random noise value
        const value = Math.random() < 0.5 ? 0 : Math.random() * 2;

        // Apply extremely subtle noise
        data[i] = value;     // Red
        data[i + 1] = value; // Green
        data[i + 2] = value; // Blue
        data[i + 3] = 3;     // Ultra-low alpha for subtlety
      }

      context.putImageData(imageData, 0, 0);
    }

    function initializeGrid() {
      gridPointsRef.current = [];

      // Determine grid spacing based on screen size
      const gridSpacingX = 60; // Horizontal spacing
      const gridSpacingY = 60; // Vertical spacing

      const pixelRatio = window.devicePixelRatio || 1;
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;

      // Calculate how many points we need
      const numCols = Math.ceil(width / gridSpacingX) + 1;
      const numRows = Math.ceil(height / gridSpacingY) + 1;

      // Create grid points
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * gridSpacingX;
          const baseY = row * gridSpacingY;
          // Add some randomness to y position for more organic look
          const y = baseY + (Math.random() - 0.5) * 10;

          gridPointsRef.current.push({
            x,
            y,
            baseY,
            originalY: y, // Store original position for animation
            size: 0.5 + Math.random() * 1.5, // Vary point sizes
            hue: 220 + Math.random() * 40, // Bluish hue with variation
            opacity: 0.1 + Math.random() * 0.3, // Vary opacity
            velocity: 0,
            maxDisplacement: 10 + Math.random() * 20 // Max movement range
          });
        }
      }
    }

    function initializeParticles() {
      particlesRef.current = [];

      // Create floating particles
      const particleCount = Math.floor((canvas.width * canvas.height) / 50000);

      for (let i = 0; i < particleCount; i++) {
        const depth = 0.1 + Math.random() * 0.9; // Depth factor (0.1 to 1.0)

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 1 + 4 * depth, // Size based on depth
          color: `hsla(${220 + Math.random() * 40}, 100%, ${70 + depth * 30}%, ${0.2 + depth * 0.3})`,
          speed: 0.05 + Math.random() * 0.15 * depth,
          angle: Math.random() * Math.PI * 2,
          oscillationSpeed: 0.001 + Math.random() * 0.005,
          oscillationDistance: 2 + Math.random() * 8,
          phase: Math.random() * Math.PI * 2,
          depth
        });
      }
    }

    function updateGridPoints(deltaTime: number) {
      const pixelRatio = window.devicePixelRatio || 1;

      // Wave frequency and amplitude
      const waveFrequency = 0.1;
      const waveAmplitude = 4;
      timeRef.current += deltaTime * 0.001; // Convert to seconds

      // Update grid points
      gridPointsRef.current.forEach(point => {
        // Distance from cursor
        const dx = cursorPosition.x - point.x;
        const dy = cursorPosition.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply cursor influence (inverse of distance)
        const cursorInfluence = Math.max(0, 1 - distance / 200) * 30;

        // Calculate wave displacement
        const timeOffset = point.x * waveFrequency;
        const waveDisplacement = Math.sin(timeRef.current + timeOffset) * waveAmplitude;

        // Target position = original + wave + cursor
        const targetY = point.originalY + waveDisplacement +
                        (cursorInfluence > 0 ? cursorInfluence : 0);

        // Apply spring physics for smooth movement
        const spring = 0.05; // Spring strength
        const friction = 0.8; // Friction factor

        // Calculate spring force
        const force = spring * (targetY - point.y);

        // Update velocity with spring force
        point.velocity += force * deltaTime * 0.05;
        point.velocity *= friction;

        // Update position with velocity
        point.y += point.velocity;

        // Constrain displacement to max range
        const displacement = Math.abs(point.y - point.originalY);
        if (displacement > point.maxDisplacement) {
          const direction = point.y > point.originalY ? 1 : -1;
          point.y = point.originalY + (point.maxDisplacement * direction);
          point.velocity *= -0.5; // Bounce with damping
        }

        // Adjust opacity based on cursor proximity
        point.opacity = 0.1 + Math.random() * 0.1 + (cursorInfluence / 30) * 0.3;
      });
    }

    function updateParticles(deltaTime: number) {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;

      particlesRef.current.forEach(particle => {
        // Update position based on angle and speed
        particle.x += Math.cos(particle.angle) * particle.speed * deltaTime * 0.1;
        particle.y += Math.sin(particle.angle) * particle.speed * deltaTime * 0.1;

        // Add sinusoidal oscillation
        particle.y += Math.sin(timeRef.current * particle.oscillationSpeed + particle.phase) *
                      particle.oscillationDistance * deltaTime * 0.01;

        // Randomly change angle occasionally
        if (Math.random() < 0.001 * deltaTime) {
          particle.angle += (Math.random() - 0.5) * Math.PI * 0.2;
        }

        // Wrap around screen edges
        if (particle.x < -particle.radius * 2) particle.x = width + particle.radius;
        if (particle.x > width + particle.radius * 2) particle.x = -particle.radius;
        if (particle.y < -particle.radius * 2) particle.y = height + particle.radius;
        if (particle.y > height + particle.radius * 2) particle.y = -particle.radius;
      });
    }

    function drawGridLines() {
      const pixelRatio = window.devicePixelRatio || 1;

      // Draw lines connecting grid points
      ctx.lineWidth = 0.2;
      ctx.beginPath();

      // Connect horizontally
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;
      const numCols = Math.ceil(width / 60) + 1;

      gridPointsRef.current.forEach((point, index) => {
        // Connect to the point to the right (if not last in row)
        if ((index + 1) % numCols !== 0 && index + 1 < gridPointsRef.current.length) {
          const nextPoint = gridPointsRef.current[index + 1];

          // Calculate distance for opacity
          const dist = Math.sqrt(
            Math.pow(nextPoint.x - point.x, 2) +
            Math.pow(nextPoint.y - point.y, 2)
          );

          // Only connect if points are not too far apart (handles edge cases)
          if (dist < 100) {
            // Gradient based on point's color
            const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
            gradient.addColorStop(0, `hsla(${point.hue}, 80%, 60%, ${point.opacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${nextPoint.hue}, 80%, 60%, ${nextPoint.opacity * 0.5})`);

            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }
        }

        // Connect to the point below (if exists)
        const belowIndex = index + numCols;
        if (belowIndex < gridPointsRef.current.length) {
          const belowPoint = gridPointsRef.current[belowIndex];

          // Calculate distance for opacity
          const dist = Math.sqrt(
            Math.pow(belowPoint.x - point.x, 2) +
            Math.pow(belowPoint.y - point.y, 2)
          );

          // Only connect if points are not too far apart
          if (dist < 100) {
            const gradient = ctx.createLinearGradient(point.x, point.y, belowPoint.x, belowPoint.y);
            gradient.addColorStop(0, `hsla(${point.hue}, 80%, 60%, ${point.opacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${belowPoint.hue}, 80%, 60%, ${belowPoint.opacity * 0.5})`);

            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(belowPoint.x, belowPoint.y);
            ctx.stroke();
          }
        }
      });
    }

    function drawGridPoints() {
      // Draw each point
      gridPointsRef.current.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${point.hue}, 80%, 60%, ${point.opacity})`;
        ctx.fill();

        // Add a subtle glow for some points
        if (point.size > 1.5 || Math.random() < 0.05) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient?.(
            point.x, point.y, point.size,
            point.x, point.y, point.size * 3
          ) as CanvasGradient;
          gradient.addColorStop(0, `hsla(${point.hue}, 80%, 60%, ${point.opacity * 0.4})`);
          gradient.addColorStop(1, `hsla(${point.hue}, 80%, 60%, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
    }

    function drawParticles() {
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Add glow based on particle size (depth)
        if (particle.depth > 0.7) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient?.(
            particle.x, particle.y, particle.radius * 0.5,
            particle.x, particle.y, particle.radius * 2
          ) as CanvasGradient;
          const baseColor = particle.color.replace(/[\d\.]+\)$/, '');
          gradient.addColorStop(0, `${baseColor}0.3)`);
          gradient.addColorStop(1, `${baseColor}0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
    }

    function animate(timestamp: number) {
      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      // Calculate delta time for smooth animation
      const deltaTime = previousTimestampRef.current ?
                        Math.min(timestamp - previousTimestampRef.current, 100) : 16.67;
      previousTimestampRef.current = timestamp;

      // Update all interactive elements
      updateGridPoints(deltaTime);
      updateParticles(deltaTime);

      // Draw grid system first
      drawGridLines();
      drawGridPoints();

      // Draw floating particles on top
      drawParticles();

      // Set initialized after first frame
      if (!initialized) {
        setInitialized(true);
      }

      requestAnimationFrame(animate);
    }

    // Initial setup
    drawGradientBackground();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [inView, cursorPosition, initialized]);

  return (
    <>
      <canvas
        ref={gradientCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-black"
      />
      <canvas
        ref={(node) => {
          canvasRef.current = node;
          if (ref) {
            // @ts-ignore - this is fine because we're just passing the ref
            ref(node);
          }
        }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      />
      {/* Initial reveal animation */}
      <motion.div
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.7, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}