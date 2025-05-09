"use client";

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Mental Models. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}