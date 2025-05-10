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
    }, 1200); // Shorter load time for brutalist design
  }, []);

  // We'll use Next.js Link components instead of handling clicks with direct navigation

  return (
    <main className="min-h-screen flex flex-col">
      {/* Grid background */}
      <SpaceBackground />

      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} // Faster transitions in brutalist design
          >
            <motion.h1
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono uppercase text-white text-2xl tracking-widest mb-6"
            >
              Mental Models
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-1 bg-accent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header component */}
      <Header />

      {/* Hero section */}
      <section className="container mx-auto px-6 pt-32 pb-16 z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -15 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="max-w-xl"
          >
            {/* Accent bar */}
            <div className="h-1 w-24 bg-accent mb-8"></div>

            <h2 className="text-3xl md:text-5xl font-mono font-bold uppercase text-white mb-8 leading-tight tracking-tight">
              Thinking Tools <br />for Modern Problems
            </h2>

            <p className="text-white font-mono text-sm leading-relaxed border-l-2 border-white pl-4 mb-12">
              Raw, unfiltered mental models for decision making and problem solving.
              A brutalist approach to visualizing cognitive frameworks.
            </p>

            <Link
              href="#explore"
              className="inline-block border-2 border-white px-6 py-3 font-mono uppercase text-xs tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              Explore Models
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 15 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative w-full md:w-72 h-72 border-2 border-white flex items-center justify-center"
          >
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`h-${i}`} className="w-full h-px bg-white/20" style={{ top: `${i * 25}%`, position: 'absolute', left: 0, right: 0 }} />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`v-${i}`} className="h-full w-px bg-white/20" style={{ left: `${i * 25}%`, position: 'absolute', top: 0, bottom: 0 }} />
              ))}
            </div>

            <div className="relative text-accent font-mono font-bold text-xl z-10">
              <span className="absolute -left-3 -top-3 w-6 h-6 border-2 border-accent"></span>
              MM
              <span className="absolute -right-3 -bottom-3 w-6 h-6 border-2 border-accent"></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Models grid section */}
      <section id="explore" className="container mx-auto px-6 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="flex items-center mb-12">
            <div className="h-px w-12 bg-accent mr-6"></div>
            <h2 className="text-white font-mono uppercase text-xl tracking-wider">Mental Models</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {models.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                index={index}
                active={model.id === activeModelId}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* About section */}
      <section id="about" className="py-24 border-t-2 border-white z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <div className="flex items-center mb-12">
              <div className="h-px w-12 bg-accent mr-6"></div>
              <h2 className="text-white font-mono uppercase text-xl tracking-wider">About Mental Models</h2>
            </div>

            <div className="md:w-3/4">
              <p className="text-white font-mono text-sm leading-relaxed mb-6">
                Mental models are frameworks for thinking. They simplify complex situations
                so you can reason through them effectively. Having a rich set of mental models
                to draw from can help you make better decisions and solve difficult problems.
              </p>
              <p className="text-white font-mono text-sm leading-relaxed">
                This brutalist approach strips away distractions to focus on the raw essence of these cognitive tools.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-2 border-white p-6"
            >
              <h3 className="font-mono uppercase text-accent text-sm tracking-wider mb-4">Why Use Mental Models?</h3>
              <p className="text-white font-mono text-xs leading-relaxed">
                Mental models help us understand the world, identify patterns, and make sense
                of complexity. They're tools that extend our cognitive capabilities beyond our built-in limitations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-2 border-white p-6"
            >
              <h3 className="font-mono uppercase text-accent text-sm tracking-wider mb-4">How To Use This Explorer</h3>
              <p className="text-white font-mono text-xs leading-relaxed">
                Browse the collection of mental models in the grid above. Click on a model
                to view detailed information with interactive visualizations focusing on the model's core principles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-2 border-white p-6"
            >
              <h3 className="font-mono uppercase text-accent text-sm tracking-wider mb-4">Learning By Interaction</h3>
              <p className="text-white font-mono text-xs leading-relaxed">
                Each model features an interactive component designed to help you
                internalize the concept through direct engagement rather than just passive reading.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </main>
  );
}