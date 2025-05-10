"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Sharp animation values for brutalist design
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9]);
  const accentOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 ${scrolled ? 'border-b-2 border-white' : ''}`}>
      {/* Red accent bar that appears on scroll */}
      <motion.div
        className="h-1 bg-accent"
        style={{ opacity: accentOpacity }}
      />

      <div className="container max-w-none px-6 py-4 flex justify-between items-center bg-black">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }} // Sharp easing
          style={{ scale: logoScale }}
          className="flex items-center"
        >
          <div className="w-6 h-6 border-2 border-white mr-3 relative">
            <div className="absolute w-3 h-3 bg-accent right-0 bottom-0" />
          </div>
          <span className="text-xl font-mono font-bold tracking-tight uppercase text-white">
            Mental Models
          </span>
        </motion.div>

        <nav>
          <ul className="flex gap-10">
            <li>
              <Link
                href="/"
                className="text-white uppercase font-mono text-sm tracking-widest hover:text-accent relative
                           after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-accent
                           after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100
                           after:transition-transform after:duration-200 after:origin-left"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white uppercase font-mono text-sm tracking-widest hover:text-accent relative
                           after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-accent
                           after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100
                           after:transition-transform after:duration-200 after:origin-left"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}