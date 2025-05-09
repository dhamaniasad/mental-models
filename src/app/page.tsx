"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { models } from "@/lib/models";
import { Canvas } from "@/components/Canvas";
import { ModelViewer } from "@/components/ModelViewer";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Canvas cursorPosition={cursorPosition} />
      
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white text-4xl font-bold"
            >
              Mental Models
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="min-h-screen">
        <header className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-white text-xl font-medium tracking-tight"
            >
              Mental Models
            </motion.div>
            
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <ul className="flex space-x-8 text-white text-sm">
                <li className="relative overflow-hidden">
                  <span className="block hover:opacity-60 transition-opacity cursor-pointer">About</span>
                </li>
                <li className="relative overflow-hidden">
                  <span className="block hover:opacity-60 transition-opacity cursor-pointer">Models</span>
                </li>
                <li className="relative overflow-hidden">
                  <span className="block hover:opacity-60 transition-opacity cursor-pointer">Contact</span>
                </li>
              </ul>
            </motion.nav>
          </div>
        </header>
        
        <main>
          <section className="h-screen flex flex-col justify-center relative">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="max-w-4xl"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6">
                  Visualizing Mental Models
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">
                  Explore powerful frameworks that shape how we think, make decisions, and solve problems.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center flex-col">
                <span className="text-white text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut" 
                    }}
                    className="w-1 h-2 bg-white rounded-full mt-2"
                  />
                </div>
              </div>
            </motion.div>
          </section>
          
          <section
            ref={titleRef}
            className="py-32 bg-gray-50 dark:bg-gray-900 text-black dark:text-white relative z-10"
          >
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="mb-16 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ikigai
                </h2>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  A Japanese concept meaning "a reason for being" - the intersection of what you love, 
                  what you are good at, what the world needs, and what you can be paid for.
                </p>
              </motion.div>
              
              <ModelViewer model={models[0]} />
            </div>
          </section>
        </main>
        
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="mb-8 md:mb-0">
                <h3 className="text-xl font-medium mb-4">Mental Models</h3>
                <p className="text-gray-400 max-w-xs">
                  Exploring the frameworks that help us understand the world and make better decisions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Site</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-400 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-gray-400 transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-gray-400 transition-colors">Models</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Connect</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-400 transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-gray-400 transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-gray-400 transition-colors">Email</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Mental Models. All rights reserved.</p>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}