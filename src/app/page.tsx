"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { models } from "@/lib/models";
import SpaceBackground from "@/components/SpaceBackground";
import ParticleBackground from "@/components/ParticleBackground";
import ModelCard from "@/components/ModelCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
  }, []);

  // Add CSS rule for fancy animation
  useEffect(() => {
    // Add CSS rule for fancy hover effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shine {
        100% {
          left: 125%;
        }
      }
      .animate-shine {
        animation: shine 1.5s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Enhanced backgrounds */}
      <SpaceBackground />
      <ParticleBackground />

      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 mb-8 relative">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg"
                ></motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0.7, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-8 bg-white rounded-sm transform rotate-45"></div>
                </motion.div>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-2xl font-medium text-white tracking-wide mb-4"
              >
                Mental Models
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
              ></motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header component */}
      <Header />

      {/* Hero section - Award-worthy immersive design */}
      <section className="min-h-[100vh] flex flex-col justify-center z-10 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute top-[-30%] left-[-20%] w-[90%] h-[90%] bg-gradient-to-br from-accent-primary/10 to-transparent rounded-full blur-[150px] opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-15%] w-[80%] h-[80%] bg-gradient-to-tl from-accent-secondary/10 to-transparent rounded-full blur-[130px] opacity-60 animate-pulse-slower"></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-accent-tertiary/8 to-transparent rounded-full blur-[100px] opacity-50 animate-float"></div>

        {/* Dynamic particle effect overlay */}
        <div
          id="particles-js"
          className="absolute inset-0 opacity-40 pointer-events-none"
        ></div>

        {/* Enhanced dot grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative">
          {/* Center content with improved layout */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-8 relative"
            >
              {/* Premium animated badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center justify-center mb-5 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-primary/15 to-accent-secondary/15 border border-accent-primary/20 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-accent-primary mr-2 animate-pulse"></div>
                <span className="text-sm text-white/90 font-medium tracking-wide">Explore Powerful Decision Frameworks</span>
              </motion.div>

              {/* Enhanced headline with creative typography */}
              <div className="relative">
                {/* Premium headline design with layered effects */}
                <motion.h1
                  className="text-5xl md:text-8xl font-extrabold text-white leading-tight tracking-tighter relative z-10 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-block">
                    <span className="block relative">
                      <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 animate-pulse-slow opacity-70"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                        Mental
                      </span>
                    </span>
                    <span className="block mt-[-0.2em] relative">
                      <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-accent-secondary/20 to-accent-primary/20 animate-pulse-slow opacity-70 animation-delay-500"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                        Models
                      </span>
                    </span>
                  </span>
                </motion.h1>

                {/* Elegant text stroke design element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isLoaded ? 0.07 : 0, scale: isLoaded ? 1 : 0.9 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none"
                >
                  <div className="text-8xl md:text-[12rem] font-black text-transparent leading-none tracking-tighter text-center"
                       style={{
                         WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                         textStroke: '1px rgba(255,255,255,0.1)'
                       }}>
                    THINK
                  </div>
                </motion.div>
              </div>

              {/* Enhanced subheadline */}
              <motion.p
                className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Discover interactive visualizations of powerful thinking frameworks
                to enhance your decision-making and problem-solving abilities
              </motion.p>

              {/* Enhanced CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="#explore"
                  className="relative px-8 py-4 rounded-lg overflow-hidden group w-full sm:w-auto flex items-center justify-center"
                >
                  {/* Premium button with animated gradient border */}
                  <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary animate-gradient-shift"></div>
                  </div>

                  <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-lg px-8 py-4 w-full h-full flex items-center justify-center">
                    <span className="font-medium text-white">Explore Models</span>
                  </div>

                  {/* Premium button hover effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] transform -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
                  </div>
                </Link>

                <Link
                  href="#about"
                  className="px-8 py-4 rounded-lg border border-white/10 hover:border-white/30 text-white/80 hover:text-white font-medium transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-lg w-full sm:w-auto flex items-center justify-center group"
                >
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
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Interactive model visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-10 h-[500px] max-w-6xl mx-auto perspective-3d"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md">
                  {/* 3D interactive model visualization */}
                  <div id="model-visualization" className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[350px] w-[350px] transform-style-3d">
                      {/* 3D Orbit elements */}
                      <div className="orbit-container">
                        {/* Central core */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                        >
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary p-[2px] animate-pulse-slow">
                            <div className="w-full h-full rounded-full bg-black/70 backdrop-blur-xl flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white/90 to-white/70 flex items-center justify-center transform rotate-45">
                                <div className="w-7 h-7 rounded-sm bg-black/90"></div>
                              </div>
                            </div>
                          </div>
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
                            <div className="absolute inset-0 rounded-full border-2 border-white/5 transform-style-3d animate-spin-slow">
                              <div className="absolute w-full h-full rounded-full animate-glow-pulse-slow"
                                style={{
                                  boxShadow: `0 0 20px 2px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.${ring * 2})`,
                                  animationDelay: `${ring * 0.5}s`
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
                                  <div
                                    className={`w-full h-full rounded-full animate-pulse-fast`}
                                    style={{
                                      background: ring === 1
                                        ? 'linear-gradient(to right, #FF3A5E, #FF5A6E)'
                                        : ring === 2
                                          ? 'linear-gradient(to right, #4D45FF, #6A62FF)'
                                          : 'linear-gradient(to right, #18ADB5, #27C2CA)',
                                      boxShadow: `0 0 10px 2px rgba(${ring === 1 ? '255,58,94' : ring === 2 ? '77,69,255' : '24,173,181'}, 0.5)`,
                                      animationDelay: `${i * 0.2}s`
                                    }}
                                  ></div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Premium floating model labels with connections */}
                      {models.slice(0, 7).map((model, i) => {
                        const angle = i * (360 / 7);
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/90 opacity-70"></div>

                  {/* Simulated light source */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full radial-pulse opacity-5 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced scroll indicator with better animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 0.9 : 0 }}
              transition={{ duration: 0.5, delay: 3.5 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
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
          </div>
        </div>
      </section>

      {/* Models grid section */}
      <section id="explore" className="container mx-auto px-6 py-24 z-10 relative">
        {/* Section marker */}
        <div className="absolute -left-4 top-24 w-8 h-0.5 bg-accent-primary"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Explore Mental Models
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-2xl mb-12"
          >
            Select a model to discover frameworks that can transform your decision-making 
            and problem-solving approach
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {models.map((model, index) => (
            <ModelCard
              key={model.id}
              model={model}
              index={index}
              active={model.id === activeModelId}
            />
          ))}
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-32 z-10 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-accent-primary/5 to-transparent rounded-full blur-[80px] opacity-40"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="h-0.5 bg-accent-primary mb-12"
              ></motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                About Mental Models
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-2/3"
              >
                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                  Mental models are frameworks for thinking. They simplify complex situations
                  so you can reason through them effectively. Having a rich set of mental models
                  to draw from can help you make better decisions and solve difficult problems.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  This approach focuses on the essence of these cognitive tools, emphasizing
                  clarity and practical applications over complex theoretical discussions.
                </p>
              </motion.div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Why Use Mental Models?",
                  description: "Mental models help us understand the world, identify patterns, and make sense of complexity. They're tools that extend our cognitive capabilities beyond our built-in limitations.",
                  icon: (
                    <svg className="w-8 h-8 text-accent-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21.5L17.5 13L13 8.5L14.5 4.5L6 13L10.5 17.5L9 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.5 8.5L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "How To Use This Explorer",
                  description: "Browse the collection of mental models in the grid above. Click on a model to view detailed information with interactive visualizations focusing on the model's core principles.",
                  icon: (
                    <svg className="w-8 h-8 text-accent-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Learning By Interaction",
                  description: "Each model features an interactive component designed to help you internalize the concept through direct engagement rather than just passive reading.",
                  icon: (
                    <svg className="w-8 h-8 text-accent-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 6L12 3L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-surface-1/30 backdrop-blur-md border border-white/5 rounded-lg p-6 group hover:border-accent-primary/20 transition-colors duration-300"
                >
                  <div className="bg-surface-2 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-5 group-hover:text-accent-primary transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-20 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-surface-1/50 backdrop-blur-lg rounded-xl p-8 md:p-12 border border-white/10 overflow-hidden relative">
            {/* Background gradient */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
              >
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join our community</h2>
                  <p className="text-white/70 mb-0">Get updates on new mental models and features to enhance your decision-making toolkit.</p>
                </div>
                
                <div className="flex-1 w-full md:w-auto">
                  <div className="bg-surface-2/80 backdrop-blur-md rounded-lg p-1 flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-transparent border-0 text-white/90 placeholder-white/40 outline-none flex-1"
                    />
                    <button className="bg-accent-primary hover:bg-accent-primary-dark text-white font-medium px-4 py-2 rounded-md transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </main>
  );
}