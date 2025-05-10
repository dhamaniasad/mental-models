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
                  <motion.a
                    href="#"
                    className="relative inline-flex items-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 bg-gradient-to-r from-accent-primary to-accent-secondary px-7 py-3 rounded-full text-white font-medium">
                      Explore Premium Templates
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
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
                        href="#" 
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
                      <Link 
                        href="#" 
                        key={i}
                        className="block text-white/60 hover:text-white transition-colors duration-300 text-base group"
                      >
                        <span className="inline-block relative">
                          {item}
                          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-accent-secondary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
                
                {/* Connect */}
                <motion.div 
                  className="col-span-12 md:col-span-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="text-white font-semibold mb-6 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mr-2.5"></div>
                    Connect
                  </h4>
                  
                  <div className="space-y-5">
                    {[
                      { name: 'Twitter', url: 'https://twitter.com', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                      { name: 'Instagram', url: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                      { name: 'GitHub', url: 'https://github.com', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                      { name: 'LinkedIn', url: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                    ].map((item, i) => (
                      <a 
                        href={item.url} 
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white/60 hover:text-white transition-colors duration-300 text-base group"
                      >
                        <svg className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor">
                          <path d={item.icon} />
                        </svg>
                        <span className="inline-block relative">
                          {item.name}
                          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-accent-tertiary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                        </span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Newsletter section */}
          <motion.div 
            className="mt-24 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-tertiary/10 backdrop-blur-md rounded-xl" />
            <div className="absolute inset-0 bg-black/20 rounded-xl" />
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <div className="px-8 py-10 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">Join our newsletter</h3>
                      <p className="mt-3 text-white/70">Get exclusive updates, premium templates, and early access to new mental models.</p>
                    </div>
                    
                    <div className="w-full md:w-auto">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 min-w-[240px]"
                        />
                        <motion.button
                          className="relative px-6 py-3 rounded-full bg-white text-black font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Subscribe
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-70" />
            </div>
          </motion.div>
          
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
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}