"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Model } from "@/lib/models";

interface HeroSectionProps {
  isLoaded: boolean;
  models: Model[];
  heroContentY: any;
  heroOpacity: any;
  heroModelY: any;
  bgGradient1Y: any;
  bgGradient2Y: any;
  bgGradient3Y: any;
}

export default function HeroSection({
  isLoaded,
  models,
  heroContentY,
  heroOpacity,
  heroModelY,
  bgGradient1Y,
  bgGradient2Y,
  bgGradient3Y
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={heroRef} className="min-h-[100vh] flex flex-col justify-center z-10 relative overflow-hidden pt-32 pb-16">
      {/* Enhanced background effects with parallax */}
      <motion.div
        style={{ y: bgGradient1Y }}
        className="absolute top-[-30%] left-[-20%] w-[90%] h-[90%] bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full blur-[150px] opacity-80 animate-pulse-slow">
      </motion.div>
      <motion.div
        style={{ y: bgGradient2Y }}
        className="absolute bottom-[-20%] right-[-15%] w-[80%] h-[80%] bg-gradient-to-tl from-accent-secondary/15 to-transparent rounded-full blur-[130px] opacity-70 animate-pulse-slower">
      </motion.div>
      <motion.div
        style={{ y: bgGradient3Y }}
        className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-accent-tertiary/15 to-transparent rounded-full blur-[100px] opacity-70 animate-float">
      </motion.div>

      {/* Additional accent colors for visual interest */}
      <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-[80px] opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] left-[30%] w-[20%] h-[20%] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[70px] opacity-50 animate-float"></div>

      {/* Dynamic particle effects handled by ParticleBackground component in parent */}

      {/* Enhanced dot grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>

      <motion.div
        style={{ y: heroContentY, opacity: heroOpacity }}
        className="container mx-auto px-4 md:px-8 lg:px-10 relative"
      >
        {/* Decorative elements for visual interest */}
        <div className="absolute right-[5%] top-[-10%] h-20 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute left-[7%] bottom-[25%] h-32 w-[1px] bg-gradient-to-b from-transparent via-accent-primary/30 to-transparent"></div>
        <div className="absolute right-[12%] bottom-[5%] w-20 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Center content with improved layout and parallax - Two column layout on larger screens */}
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 xl:gap-20 py-8 md:py-12">
          {/* Left content column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="text-left w-full lg:w-2/5 relative mb-12 lg:mb-0"
          >
            {/* Decorative line above content */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary mb-8 hidden md:block"
            ></motion.div>

            {/* Premium animated badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 backdrop-blur-md shadow-glow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent-primary mr-2 animate-pulse"></div>
              <span className="text-sm text-white font-medium tracking-wider">Powerful Decision Frameworks</span>
            </motion.div>
            
            {/* Enhanced headline with creative typography */}
            <div className="relative mb-5">
              {/* Premium headline design with layered effects */}
              <motion.h1 
                className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tighter relative z-10 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-block">
                  <span className="block relative">
                    <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 animate-pulse-slow opacity-80"></span>
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                      Mental
                    </span>
                    {/* Subtle accent marker */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="absolute -right-4 top-0 h-1 bg-accent-primary/60 rounded-full"
                    ></motion.div>
                  </span>
                  <span className="block mt-[-0.15em] relative">
                    <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-accent-secondary/30 to-accent-primary/30 animate-pulse-slow opacity-80 animation-delay-500"></span>
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                      Models
                    </span>
                  </span>
                </span>
              </motion.h1>
              
              {/* Elegant text stroke design element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 0.1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none"
              >
                <div className="text-9xl md:text-[12rem] font-black text-transparent leading-none tracking-tighter text-center"
                     style={{
                       WebkitTextStroke: '1px rgba(255,255,255,0.15)',
                       textStroke: '1px rgba(255,255,255,0.15)'
                     }}>
                  THINK
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced subheadline */}
            <motion.p
              className="text-white/80 text-lg md:text-xl xl:text-2xl max-w-xl mb-10 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Explore powerful <span className="text-accent-primary/90 font-normal">interactive visualizations</span> of thinking frameworks that enhance your decision-making abilities
            </motion.p>

            {/* New feature highlight text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-10 flex items-center"
            >
              <div className="flex space-x-1 mr-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-accent-primary/90"></div>
                ))}
              </div>
              <span className="text-white/60 text-sm uppercase tracking-wider font-medium">Interactive & Explorable</span>
            </motion.div>
            
            {/* Enhanced CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-full sm:w-auto"
                whileHover="hover"
                initial="rest"
              >
                <Link
                  href="#explore"
                  className="relative px-8 py-4 rounded-lg overflow-hidden group w-full flex items-center justify-center cursor-btn"
                  onMouseMove={(e) => {
                    const btn = e.currentTarget;
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    btn.style.setProperty('--cursor-x', `${x}px`);
                    btn.style.setProperty('--cursor-y', `${y}px`);
                  }}
                >
                  {/* Premium button with animated gradient border */}
                  <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary animate-gradient-shift"></div>
                  </div>

                  <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-lg px-8 py-4 w-full h-full flex items-center justify-center">
                    <span className="font-medium text-white">Explore Models</span>
                  </div>

                  {/* Premium button hover effect - cursor following with enhanced light effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden">
                    {/* Main cursor light effect */}
                    <div className="absolute h-40 w-40 rounded-full pointer-events-none"
                      style={{
                        top: 'calc(var(--cursor-y, 0) - 80px)',
                        left: 'calc(var(--cursor-x, 0) - 80px)',
                        background: 'radial-gradient(circle closest-side, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)',
                        transition: 'opacity 0.15s ease-out',
                        mixBlendMode: 'soft-light',
                      }}>
                    </div>

                    {/* Secondary glow effect */}
                    <div className="absolute h-60 w-60 rounded-full pointer-events-none"
                      style={{
                        top: 'calc(var(--cursor-y, 0) - 120px)',
                        left: 'calc(var(--cursor-x, 0) - 120px)',
                        background: 'radial-gradient(circle closest-side, rgba(255,98,132,0.2) 0%, transparent 80%)',
                        boxShadow: '0 0 40px 5px rgba(255,58,94,0.15)',
                        transition: 'opacity 0.2s ease-out',
                      }}>
                    </div>

                    {/* Edge highlight effect */}
                    <div className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div
                className="w-full sm:w-auto"
                whileHover="hover"
                initial="rest"
              >
                <Link
                  href="#about"
                  className="relative px-8 py-4 rounded-lg border border-white/10 hover:border-white/30 text-white/80 hover:text-white font-medium transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-lg w-full flex items-center justify-center group cursor-btn"
                  onMouseMove={(e) => {
                    const btn = e.currentTarget;
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    btn.style.setProperty('--cursor-x', `${x}px`);
                    btn.style.setProperty('--cursor-y', `${y}px`);
                  }}
                >
                  <div className="flex items-center justify-center">
                    <span>Learn More</span>
                    <motion.svg
                      className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </div>

                  {/* Subtle light effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden">
                    <div className="absolute h-32 w-32 rounded-full pointer-events-none"
                      style={{
                        top: 'calc(var(--cursor-y, 0) - 64px)',
                        left: 'calc(var(--cursor-x, 0) - 64px)',
                        background: 'radial-gradient(circle closest-side, rgba(255,255,255,0.15) 0%, transparent 90%)',
                        mixBlendMode: 'overlay',
                      }}>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* 3D Interactive model visualization with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: heroModelY }}
            className="relative w-full lg:w-3/5 h-[400px] md:h-[500px] xl:h-[550px] perspective-3d"
          >
            {/* Top decorative element */}
            <div className="absolute right-[10%] -top-4 flex items-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent"></div>
              <div className="ml-2 text-xs text-white/40 tracking-widest uppercase">Explore</div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md shadow-glow">
                {/* 3D interactive model visualization */}
                <div id="model-visualization" className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[350px] w-[350px] transform-style-3d">
                    {/* 3D Orbit elements */}
                    <div className="orbit-container">
                      {/* Central core - enhanced with glow and animation */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <motion.div
                          animate={{
                            boxShadow: ['0 0 20px 5px rgba(255,58,94,0.3)', '0 0 30px 5px rgba(255,58,94,0.2)', '0 0 20px 5px rgba(255,58,94,0.3)']
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-28 h-28 rounded-full p-[2px] animate-pulse-slow"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,58,94,1) 0%, rgba(77,69,255,0.9) 100%)',
                          }}
                        >
                          <div className="w-full h-full rounded-full bg-black/70 backdrop-blur-xl flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-white/90 to-white/70 shadow-glow flex items-center justify-center transform rotate-45">
                              <div className="w-8 h-8 rounded-sm bg-black/90"></div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Orbital rings with glow effects */}
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={`ring-${ring}`}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 75, rotateZ: ring * 30 }}
                          transition={{ duration: 1.5, delay: 1.2 + ring * 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 transform-style-3d"
                          style={{ width: `${140 + ring * 60}px`, height: `${140 + ring * 60}px` }}
                        >
                          <div className="absolute inset-0 rounded-full border-2 border-white/10 transform-style-3d animate-spin-slow"
                            style={{ animationDuration: `${25 - ring * 5}s` }}
                          >
                            <div className="absolute w-full h-full rounded-full animate-glow-pulse-slow"
                              style={{
                                boxShadow: `0 0 20px 2px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.${ring * 3})`,
                                animationDelay: `${ring * 0.5}s`
                              }}>
                            </div>

                            {/* Additional glow effect */}
                            <div className="absolute inset-0 rounded-full opacity-70"
                              style={{
                                border: `1px solid rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.4)`,
                                boxShadow: `inset 0 0 15px 1px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.15)`
                              }}>
                            </div>
                            
                            {/* Orbital nodes */}
                            {[...Array(3 + ring)].map((_, i) => (
                              <motion.div
                                key={`node-${ring}-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 2 + ring * 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute"
                                style={{ 
                                  top: '50%', 
                                  left: '50%',
                                  width: '12px', 
                                  height: '12px', 
                                  marginLeft: '-6px',
                                  marginTop: '-6px',
                                  transform: `rotate(${i * (360 / (3 + ring))}deg) translateX(${70 + ring * 30}px)`
                                }}
                              >
                                <motion.div
                                  className={`w-full h-full rounded-full`}
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                      `0 0 10px 2px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.5)`,
                                      `0 0 15px 3px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.7)`,
                                      `0 0 10px 2px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.5)`
                                    ]
                                  }}
                                  transition={{
                                    duration: 2 + i * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.3
                                  }}
                                  style={{
                                    background: ring === 1
                                      ? 'linear-gradient(to right, #FF3A5E, #FF5A6E)'
                                      : ring === 2
                                        ? 'linear-gradient(to right, #4D45FF, #6A62FF)'
                                        : 'linear-gradient(to right, #18ADB5, #27C2CA)'
                                  }}
                                ></motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Premium floating model labels with connections */}
                    {models.slice(0, 5).map((model, i) => {
                      const angle = i * (360 / 5);
                      const radius = 180;
                      const x = Math.cos(angle * (Math.PI / 180)) * radius;
                      const y = Math.sin(angle * (Math.PI / 180)) * radius;
                      
                      return (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, y: 20, x: 0 }}
                          animate={{ opacity: 0.9, y: 0, x: 0 }}
                          transition={{ duration: 0.8, delay: 2.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 z-30 perspective-origin-center"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          }}
                        >
                          <div className="relative">
                            {/* Connection line to center */}
                            <motion.div 
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 0.3, scaleX: 1 }}
                              transition={{ duration: 1, delay: 2.5 + i * 0.1 }}
                              className="absolute top-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                              style={{ 
                                left: x > 0 ? 'auto' : '100%', 
                                right: x > 0 ? '100%' : 'auto',
                                width: `${Math.abs(x)}px`,
                                transformOrigin: x > 0 ? 'left' : 'right'
                              }}
                            ></motion.div>
                            
                            {/* Premium label design */}
                            <div className="px-3 py-2 rounded-xl bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-glow text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer group">
                              <span className="text-white/90 text-sm font-medium tracking-wide whitespace-nowrap">
                                {model.name}
                              </span>
                              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-primary to-accent-secondary mt-1 transition-all duration-300"></div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Enhanced gradient and lighting overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/90 opacity-60"></div>
                
                {/* Simulated light source */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full radial-pulse opacity-5 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator with better animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.9 : 0 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-white/70 text-sm font-light tracking-widest uppercase mb-2">Discover</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
          className="relative w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center"
        >
          <motion.div 
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}