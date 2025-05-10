"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { models } from "@/lib/models";
import SpaceBackground from "@/components/SpaceBackground";
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
      {/* Sophisticated background */}
      <SpaceBackground />

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

      {/* Hero section - Modern, sophisticated design */}
      <section className="min-h-[90vh] flex flex-col justify-center z-10 relative overflow-hidden">
        {/* Background gradient circles - subtle */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-accent-primary/5 to-transparent rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-tl from-accent-secondary/5 to-transparent rounded-full blur-[100px] opacity-50"></div>
        
        {/* Dot grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', 
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative">
          {/* Center content */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/10">
                <span className="text-sm text-accent-primary/90 font-medium">Next-Generation Decision Framework</span>
              </div>
              
              <motion.h1 
                className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                  Mental Models
                </span>
              </motion.h1>
              
              <motion.p
                className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Interactive visualizations of powerful thinking frameworks for better decision-making
              </motion.p>
              
              <motion.div
                className="flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link
                  href="#explore"
                  className="relative px-8 py-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium overflow-hidden group"
                >
                  <span className="relative z-10">Explore Models</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                </Link>
                
                <Link
                  href="#about"
                  className="px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium transition-colors duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Featured model graphic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative mt-16 h-[400px] max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 backdrop-blur-sm">
                  {/* Interactive element - circular graph representing models */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-64 w-64">
                      {/* Circles */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm"
                      ></motion.div>
                      
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute inset-5 rounded-full border border-white/15 backdrop-blur-sm"
                      ></motion.div>
                      
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute inset-10 rounded-full border border-white/20 backdrop-blur-sm"
                      ></motion.div>
                      
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md"></div>
                        </div>
                      </motion.div>
                      
                      {/* Connection lines */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <motion.div 
                          key={angle}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 0.6, height: '100%' }}
                          transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }}
                          className="absolute top-1/2 left-1/2 w-px h-full bg-white/10 origin-bottom"
                          style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                        ></motion.div>
                      ))}
                      
                      {/* Nodes */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <motion.div 
                          key={`node-${angle}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 2 + i * 0.15 }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-accent-primary"
                          style={{ 
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px)`,
                          }}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Labels floating around */}
                  {['Inversion', 'Second-Order', 'Circle of Competence', 'Ikigai', 'Falsifiability'].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.7, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.5 + i * 0.2 }}
                      className="absolute text-white/80 text-sm font-medium px-3 py-1 rounded-full bg-gray-900/50 backdrop-blur-md border border-white/5"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                      }}
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-70"></div>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 0.7 : 0 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-5 text-white/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
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