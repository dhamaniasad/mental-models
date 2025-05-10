"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { models } from "@/lib/models";
import SpaceBackground from "@/components/SpaceBackground";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import ModelCard from "@/components/ModelCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Refs for parallax sections
  const heroRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation values
  const { scrollY } = useScroll();
  
  // Parallax transformations for hero elements
  const heroBackgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroModelY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Parallax for background elements
  const bgGradient1Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const bgGradient2Y = useTransform(scrollY, [0, 1000], [0, 100]);
  const bgGradient3Y = useTransform(scrollY, [0, 1000], [0, -200]);
  
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

      {/* Hero section component */}
      <HeroSection 
        isLoaded={isLoaded}
        models={models}
        heroContentY={heroContentY}
        heroOpacity={heroOpacity}
        heroModelY={heroModelY}
        bgGradient1Y={bgGradient1Y}
        bgGradient2Y={bgGradient2Y}
        bgGradient3Y={bgGradient3Y}
      />

      {/* Models grid section with parallax */}
      <section id="explore" ref={exploreRef} className="container mx-auto px-6 py-24 z-10 relative">
        {/* Section marker with parallax */}
        <motion.div 
          className="absolute -left-4 top-24 w-8 h-0.5 bg-accent-primary"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ModelCard
                model={model}
                index={index}
                active={model.id === activeModelId}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* About section with parallax */}
      <section id="about" ref={aboutRef} className="py-32 z-10 relative overflow-hidden">
        {/* Background accents with parallax */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-accent-primary/5 to-transparent rounded-full blur-[80px]"
        ></motion.div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
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
                  initial={{ opacity: 0, y: 60, rotateY: -10 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.3 + i * 0.2,
                      ease: [0.22, 1, 0.36, 1] 
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-surface-1/30 backdrop-blur-md border border-white/5 rounded-lg p-6 group hover:border-accent-primary/20 transition-all duration-300 transform perspective-1000 hover:translate-y-[-5px]"
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


      {/* Footer component */}
      <Footer />
    </main>
  );
}