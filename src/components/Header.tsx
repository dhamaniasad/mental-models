"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  
  // Ultra-premium animation values with enhanced dynamics
  const headerOpacity = useTransform(scrollY, [0, 50], [0.9, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);
  const accentProgress = useTransform(scrollY, [0, 200], [0.02, 1]);
  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    mouseX.set(x / rect.width);
  };
  
  // Premium animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    press: { 
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const menuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      pointerEvents: 'none'
    },
    open: { 
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.header 
      className="fixed top-0 w-full z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Liquid progress indicator that fills as you scroll */}
      <div className="relative h-[2px] overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-accent-primary/50 via-accent-secondary to-accent-primary/50 origin-left"
          style={{ 
            scaleX: accentProgress,
            filter: 'blur(0.5px)'
          }}
        />
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      </div>
      
      {/* Ultra-premium dynamic glass panel */}
      <motion.div 
        className="relative backdrop-blur-xl border-b border-white/[0.05]"
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur.get()}px)`,
          height: headerHeight
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic gradient that follows cursor */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{
            background: `
              radial-gradient(
                circle at ${mouseX.get() * 100}% 50%, 
                rgba(255, 58, 94, 0.08), 
                rgba(77, 69, 255, 0.05) 30%, 
                transparent 70%
              )
            `,
            opacity: 0.7
          }}
        />
        
        {/* Premium noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-20" />
        
        <div className="container max-w-7xl mx-auto px-6 md:px-10 h-full flex justify-between items-center relative z-10">
          {/* Premium logo animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center"
            style={{ scale: logoScale }}
          >
            <Link href="/" className="flex items-center group">
              <div className="relative mr-4">
                {/* Premium logo glow effect */}
                <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-accent-primary/20 blur-lg transition-opacity duration-700" />
                
                {/* Logo mark */}
                <div className="relative z-10 w-10 h-10 overflow-hidden rounded-lg bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary p-[1.5px]">
                  <div className="w-full h-full rounded-[5px] bg-black/80 backdrop-blur-xl flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-700"></div>
                  </div>
                </div>
              </div>
              
              {/* Premium logo text with micro-interaction */}
              <div className="relative overflow-hidden">
                <motion.div 
                  className="text-xl font-bold tracking-tight text-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                    Mental<span className="font-light">Models</span>
                  </span>
                </motion.div>
                
                {/* Subtle accent underline */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-[1px] group-hover:translate-y-0 transition duration-500"></div>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-10">
              {[
                { path: "/", label: "Home" },
                { path: "#explore", label: "Explore" },
                { path: "#about", label: "About" }
              ].map((item, i) => (
                <motion.li
                  key={item.path}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    href={item.path} 
                    className="relative text-sm font-medium text-white/70 hover:text-white py-3 px-1 block group"
                  >
                    <span className="relative z-10 transition-colors duration-300">
                      {item.label}
                    </span>
                    
                    {/* Premium hover effect with gradient */}
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] group-hover:h-[2px] transition-all duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Premium CTA button */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="press"
            >
              <Link 
                href="#explore" 
                className="relative overflow-hidden group"
              >
                {/* Button background with gradient border */}
                <div className="absolute inset-0 p-[1px] rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary animate-gradient-shift" />
                </div>
                
                <div className="relative px-6 py-2.5 rounded-full bg-black/50 backdrop-blur-xl text-sm font-medium text-white z-10">
                  Explore Models
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] transform -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* Mobile menu button */}
            <div className="ml-6 md:hidden">
              <motion.button
                className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <motion.span 
                    className="w-5 h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-5 h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-5 h-0.5 bg-white rounded-full block"
                    animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Premium mobile menu with backdrop blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 md:hidden bg-black/50 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container px-6 py-6 mx-auto">
              <ul className="space-y-4">
                {[
                  { path: "/", label: "Home" },
                  { path: "#explore", label: "Explore" },
                  { path: "#about", label: "About" }
                ].map((item, i) => (
                  <motion.li
                    key={item.path}
                    variants={menuItemVariants}
                    className="border-b border-white/5 pb-3"
                  >
                    <Link 
                      href={item.path}
                      className="text-lg font-medium text-white/80 hover:text-white flex items-center justify-between"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                      <svg 
                        className="w-4 h-4 text-white/50" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}