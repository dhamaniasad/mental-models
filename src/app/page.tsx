"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { models } from "@/lib/models";
import SpaceBackground from "@/components/SpaceBackground";
import ModelCard from "@/components/ModelCard";
import ModelDetail from "@/components/ModelDetail";

export default function Home() {
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // Shorter load time
  }, []);
  
  const handleCardClick = (modelId: string) => {
    if (activeModelId === modelId) {
      setShowDetail(true);
    } else {
      setActiveModelId(modelId);
    }
  };
  
  const activeModel = models.find(m => m.id === activeModelId) || null;
  
  return (
    <main className="min-h-screen flex flex-col">
      <SpaceBackground />
      
      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gradient mb-6"
            >
              Mental Models Explorer
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header className="container pt-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-between items-center py-4"
        >
          <h1 className="text-2xl font-bold text-gradient">Mental Models</h1>
          
          <nav>
            <ul className="flex space-x-8 text-sm font-medium">
              <li>
                <a href="#explore" className="text-gray-300 hover:text-white transition-colors">
                  Explore
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </header>
      
      {/* Hero section */}
      <section className="container flex-1 flex flex-col items-center justify-center pt-10 pb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center max-w-2xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Powerful <span className="text-gradient glow-text">Mental Models</span> for Better Thinking
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Explore interactive visualizations of frameworks that can transform how you think, make decisions, and solve problems.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <div id="explore" className="container models-space dotted-grid">
            {/* Grid of model cards */}
            {models.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                index={index}
                active={model.id === activeModelId}
                onClick={() => handleCardClick(model.id)}
              />
            ))}
          </div>
          
          {/* Instruction text */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              {activeModelId 
                ? 'Click the highlighted card again to explore in detail' 
                : 'Select a mental model to begin exploring'}
            </p>
          </div>
        </motion.div>
      </section>
      
      {/* About section */}
      <section id="about" className="py-20 border-t border-gray-800/30 z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">What Are Mental Models?</h2>
            <p className="text-lg text-gray-300">
              Mental models are frameworks for thinking. They simplify complex situations
              so you can reason through them effectively. Having a rich set of mental models
              to draw from can help you make better decisions and solve difficult problems.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-3">Why Use Mental Models?</h3>
              <p className="text-gray-300">
                Mental models help us understand the world, identify patterns, and make sense
                of complexity. They're tools that extend our cognitive capabilities.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-3">How to Use This Explorer</h3>
              <p className="text-gray-300">
                Browse the collection of mental models in the grid above. Click on a model
                to select it, then click again to view detailed information with interactive visualizations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-3">Learning By Interaction</h3>
              <p className="text-gray-300">
                Each model features an interactive component designed to help you
                internalize the concept through engagement rather than just reading.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-800/30 z-10 text-sm text-gray-400">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} Mental Models Explorer</div>
          <div className="mt-4 md:mt-0">
            Crafted with care for clearer thinking and better decisions.
          </div>
        </div>
      </footer>
      
      {/* Model detail modal */}
      {showDetail && activeModel && (
        <ModelDetail 
          model={activeModel} 
          onClose={() => setShowDetail(false)} 
        />
      )}
    </main>
  );
}