"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Model } from '@/lib/models';
import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import gsap from 'gsap';

interface ModelViewerProps {
  model: Model;
}

export function ModelViewer({ model }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'how-to-use' | 'examples'>('description');
  const [activeExample, setActiveExample] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
  const springScale = useSpring(scale, { damping: 20, stiffness: 100 });
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    // Show interaction tip after a delay
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Add hover effect for content areas
    const content = contentRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = content.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(content, {
        rotateY: x * 3,
        rotateX: -y * 3,
        duration: 0.75,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(content, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.75,
        ease: "power2.out"
      });
    };
    
    content.addEventListener('mousemove', handleMouseMove);
    content.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      content.removeEventListener('mousemove', handleMouseMove);
      content.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const renderDiagram = () => {
    switch (model.id) {
      case 'ikigai':
        return <IkigaiDiagram />;
      default:
        return null;
    }
  };
  
  const tabVariants = {
    inactive: { 
      opacity: 0.7,
      y: 0
    },
    active: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };
  
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale: springScale }}
      className="relative"
    >
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div 
            ref={contentRef}
            className="p-10 md:p-12 flex flex-col h-full perspective-1000 transform-style-3d"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
            >
              {model.name}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-700 dark:text-gray-300 mb-8"
            >
              {model.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex border-b border-gray-200 dark:border-gray-700 mb-8"
            >
              {(['description', 'how-to-use', 'examples'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === tab ? "active" : "inactive"}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <span className="relative z-10">
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                      layoutId="underline"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="prose dark:prose-invert max-w-none"
                  >
                    <p>{model.longDescription}</p>
                  </motion.div>
                )}

                {activeTab === 'how-to-use' && (
                  <motion.div
                    key="how-to-use"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ul className="space-y-4">
                      {model.howToUse.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mr-4 mt-0.5 shadow-inner">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{step}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'examples' && (
                  <motion.div
                    key="examples"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex space-x-3 mb-8">
                      {model.realWorldExamples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveExample(index)}
                          className={`w-3 h-3 rounded-full ${
                            activeExample === index 
                              ? 'bg-indigo-600 dark:bg-indigo-400'
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                          aria-label={`Example ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {model.realWorldExamples.map((example, index) => (
                        activeExample === index && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-sm"
                          >
                            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">{example.title}</h3>
                            <p className="text-gray-700 dark:text-gray-200">{example.description}</p>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            ref={ref}
            className="relative h-[500px] md:h-auto bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center overflow-hidden"
          >
            {inView && renderDiagram()}
            
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Hover to interact with the diagram
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}