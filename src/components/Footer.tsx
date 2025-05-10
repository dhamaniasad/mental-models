"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative mt-48 overflow-hidden">
      {/* Premium 3D perspective footer design */}
      <div
        className="absolute -top-40 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black/20 z-10"
        style={{ backdropFilter: 'blur(80px)' }}
      />
      
      {/* Custom interactive gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 58, 94, 0.15), rgba(77, 69, 255, 0.05) 40%, transparent 60%)`,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Premium border top */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
      </div>
      
      <motion.footer 
        className="relative z-20 bg-black/40 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Inner glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent blur-sm" />
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 relative">
          <div className="grid grid-cols-12 gap-x-8 gap-y-16">
            {/* Brand section - larger and prominent */}
            <motion.div 
              className="col-span-12 lg:col-span-5 space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="relative">
                {/* Logo with glow */}
                <div className="relative inline-flex items-center">
                  <div className="h-14 w-1 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary mr-4" />
                  <div className="relative">
                    <h2 className="text-white text-3xl font-bold tracking-tight">Mental Models</h2>
                    <div className="absolute -inset-1 bg-accent-primary/20 blur-lg opacity-50 rounded-full" />
                  </div>
                </div>
                
                {/* Premium slogan with highlight */}
                <div className="mt-8 max-w-md">
                  <p className="text-lg text-white/80 leading-relaxed">
                    Transform your thinking with visually stunning, 
                    <span className="relative inline-block mx-1">
                      <span className="relative z-10 text-white font-medium">interactive mental models</span>
                      <span className="absolute bottom-0 left-0 right-0 h-[6px] bg-accent-primary/20" />
                    </span>
                    that elevate decision-making to an art form.
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="mt-10">
                  <motion.div
                    className="relative inline-flex items-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/model/ikigai" className="relative z-10">
                      <span className="relative z-10 block bg-gradient-to-r from-accent-primary to-accent-secondary px-7 py-3 rounded-full text-white font-medium">
                        Explore Models
                      </span>
                    </Link>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Links sections - beautifully arranged */}
            <div className="col-span-12 lg:col-span-7">
              <div className="grid grid-cols-12 gap-x-8 gap-y-12">
                {/* Popular Models */}
                <motion.div
                  className="col-span-6 md:col-span-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="text-white font-semibold mb-6 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-2.5"></div>
                    Popular Models
                  </h4>

                  <div className="space-y-5">
                    {['Ikigai', 'Second-Order Thinking', 'Circle of Competence', 'Eisenhower Matrix', 'Inversion'].map((item, i) => (
                      <Link
                        href={`/model/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        key={i}
                        className="block text-white/60 hover:text-white transition-colors duration-300 text-base group"
                      >
                        <span className="inline-block relative">
                          {item}
                          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-accent-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
                
                {/* Categories */}
                <motion.div
                  className="col-span-6 md:col-span-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="text-white font-semibold mb-6 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary mr-2.5"></div>
                    Categories
                  </h4>

                  <div className="space-y-5">
                    {['Decision Making', 'Problem Solving', 'Systems Thinking', 'Psychology', 'Productivity'].map((item, i) => (
                      <div
                        key={i}
                        className="block text-white/60 hover:text-white transition-colors duration-300 text-base group"
                      >
                        <span className="inline-block relative">
                          {item}
                          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-accent-secondary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
              </div>
            </div>
          </div>
          
          
          {/* Bottom bar */}
          <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              © {new Date().getFullYear()} Mental Models. All rights reserved.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Just display the copyright notice, no non-functional links */}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}