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
      {/* Minimalist light background - disabled dark space backgrounds */}

      {/* Loading screen - light theme */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
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
                  className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg shadow-md"
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
                className="text-2xl font-bold text-gray-900 tracking-tight mb-4"
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
      />

      {/* Models grid section */}
      <section id="explore" className="bg-gray-50 py-40 z-10 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-2 bg-accent-primary rounded"></div>
              <span className="text-accent-primary font-medium text-sm">Explore</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Mental Models Collection
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-xl max-w-3xl leading-relaxed"
            >
              Select a model to discover frameworks that can transform your decision-making
              and problem-solving approach
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut"
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
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-48 z-10 relative overflow-hidden">
        <div className="container mx-auto relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-2 bg-accent-primary rounded"></div>
                <span className="text-accent-primary font-medium text-sm">About</span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-10"
              >
                About Mental Models
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-2/3"
              >
                <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                  Mental models are frameworks for thinking. They simplify complex situations
                  so you can reason through them effectively. Having a rich set of mental models
                  to draw from can help you make better decisions and solve difficult problems.
                </p>
                <p className="text-gray-600 text-xl leading-relaxed">
                  This approach focuses on the essence of these cognitive tools, emphasizing
                  clarity and practical applications over complex theoretical discussions.
                </p>
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  title: "Why Use Mental Models?",
                  description: "Mental models help us understand the world, identify patterns, and make sense of complexity. They're tools that extend our cognitive capabilities beyond our built-in limitations.",
                  icon: "🧭",
                  color: "bg-blue-50",
                  iconColor: "text-blue-500"
                },
                {
                  title: "How To Use This Explorer",
                  description: "Browse the collection of mental models in the grid above. Click on a model to view detailed information with interactive visualizations focusing on the model's core principles.",
                  icon: "🔍",
                  color: "bg-purple-50",
                  iconColor: "text-purple-500"
                },
                {
                  title: "Learning By Interaction",
                  description: "Each model features an interactive component designed to help you internalize the concept through direct engagement rather than just passive reading.",
                  icon: "🔄",
                  color: "bg-green-50",
                  iconColor: "text-green-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.1 + i * 0.1,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-xl border border-gray-100 p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <div className={`${item.color} rounded-xl p-5 w-20 h-20 flex items-center justify-center mb-8 text-3xl`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-5">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{item.description}</p>
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