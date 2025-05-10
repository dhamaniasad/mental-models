"use client";

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t-2 border-white py-6 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Red accent line */}
          <div className="w-full h-px bg-accent mb-8 md:hidden"></div>

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <div className="h-8 w-2 bg-accent mr-4"></div>
            <p className="text-white font-mono text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Mental Models
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-10 mt-6 md:mt-0"
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent font-mono text-xs uppercase tracking-widest relative
                         after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-accent
                         after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100
                         after:transition-transform after:duration-200 after:origin-left"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent font-mono text-xs uppercase tracking-widest relative
                         after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-accent
                         after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100
                         after:transition-transform after:duration-200 after:origin-left"
            >
              GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}