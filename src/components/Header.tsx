"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Header animations
  const headerOpacity = useTransform(scrollY, [0, 50], [0.9, 1]);
  const headerShadow = useTransform(scrollY, [0, 100], [0, 0.1]);
  const accentProgress = useTransform(scrollY, [0, 200], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };
  
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header 
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress bar */}
      <div className="relative h-1 overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 right-0 bg-accent-primary origin-left"
          style={{ scaleX: accentProgress }}
        />
      </div>
      
      {/* Header content */}
      <motion.div 
        className={`relative bg-white ${scrolled ? 'shadow-md' : ''}`}
        style={{ 
          boxShadow: scrolled ? `0 4px 6px rgba(0, 0, 0, ${headerShadow.get()})` : 'none'
        }}
      >
        <div className="container max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              {/* Logo icon */}
              <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center mr-5">
                <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
              </div>

              {/* Logo text */}
              <span className="text-xl font-bold text-gray-900">
                Mental<span className="font-normal">Models</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-14">
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
                    className="text-gray-600 hover:text-accent-primary font-medium transition-colors duration-200 px-3 py-3"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* CTA and mobile menu button */}
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <Link
                href="#explore"
                className="bg-accent-primary hover:bg-accent-primary-dark text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200"
              >
                Explore Models
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col space-y-1.5 p-3"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.span
                className="w-7 h-0.5 bg-gray-800 block"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-7 h-0.5 bg-gray-800 block"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-7 h-0.5 bg-gray-800 block"
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="container px-12 py-6">
          <ul className="space-y-6">
            {[
              { path: "/", label: "Home" },
              { path: "#explore", label: "Explore" },
              { path: "#about", label: "About" }
            ].map((item) => (
              <li key={item.path} className="border-b border-gray-100 pb-3">
                <Link
                  href={item.path}
                  className="text-gray-800 hover:text-accent-primary font-medium block py-3 px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="#explore"
                className="bg-accent-primary text-white rounded-lg px-6 py-3 text-sm font-medium inline-block"
                onClick={() => setIsOpen(false)}
              >
                Explore Models
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}