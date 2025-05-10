"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Model } from '@/lib/models';
import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import { EisenhowerDiagram } from './diagrams/EisenhowerDiagram';
import { SecondOrderThinkingDiagram } from './diagrams/SecondOrderThinkingDiagram';
import { CircleOfCompetenceDiagram } from './diagrams/CircleOfCompetenceDiagram';
import { InversionDiagram } from './diagrams/InversionDiagram';

interface ModelViewerProps {
  model: Model;
}

export function ModelViewer({ model }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'how-to-use' | 'examples'>('description');
  const [activeExample, setActiveExample] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [50, 0, 0, 50]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Show interaction tip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Get the number of available images based on model
  const getMaxImagesForModel = (modelId: string): number => {
    switch (modelId) {
      case 'divergent-thinking':
        return 4;
      case 'lateral-thinking':
        return 0; // Update when lateral thinking images are added
      case 'contrarian-thinking':
        return 0; // Update when contrarian thinking images are added
      default:
        return 0;
    }
  };

  // Rotate through available images every 5 seconds
  useEffect(() => {
    const maxImages = getMaxImagesForModel(model.id);
    
    if (maxImages > 0) {
      const timer = setInterval(() => {
        setImageIndex(prev => prev < maxImages ? prev + 1 : 1);
      }, 5000);
      
      return () => clearInterval(timer);
    }
  }, [model.id]);

  // Render the appropriate diagram based on the model
  const renderDiagram = () => {
    const maxImages = getMaxImagesForModel(model.id);
    
    // For models with custom images
    if (maxImages > 0) {
      const folderName = model.id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const imagePrefix = model.id === 'divergent-thinking' ? 'div' : 'img';
      
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`div${imageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="relative w-[85%] h-[85%]">
                <Image
                  src={`/images/divergent/div${imageIndex}.png`}
                  alt={`${model.name} Visualization ${imageIndex}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="rounded-md"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {maxImages > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
              {Array.from({ length: maxImages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setImageIndex(i + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    imageIndex === i + 1
                      ? 'bg-accent-primary shadow-sm'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
    
    // For models with SVG diagrams
    switch (model.id) {
      case 'ikigai':
        return <IkigaiDiagram />;
      case 'eisenhower-matrix':
        return <EisenhowerDiagram />;
      case 'second-order-thinking':
        return <SecondOrderThinkingDiagram />;
      case 'circle-of-competence':
        return <CircleOfCompetenceDiagram />;
      case 'inversion':
        return <InversionDiagram />;
      default:
        return <IkigaiDiagram />; // Fallback to ikigai diagram if no match
    }
  };

  // Animation variants
  const tabVariants = {
    inactive: {
      opacity: 0.7,
      x: 0
    },
    active: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0, 0, 0.2, 1]
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className="relative"
    >
      <div className="overflow-hidden bg-white">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Content Section - Clean, modern */}
          <div className="p-8 md:p-10 flex flex-col h-full border-r border-gray-100">
            {/* Subtle accent element */}
            <div className="h-1 w-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mb-8"></div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl font-bold text-gray-900 mb-4"
            >
              About this framework
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-600 mb-8 text-base leading-relaxed"
            >
              {model.description}
            </motion.p>

            {/* Clean, modern tab navigation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex mb-8 border-b border-gray-200"
            >
              {(['description', 'how-to-use', 'examples'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === tab ? "active" : "inactive"}
                  className={`relative px-5 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? 'text-accent-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="relative z-10">
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
                      layoutId="tab-underline"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Content area - Cleaner design */}
            <div className="flex-1 overflow-auto" style={{ maxHeight: '400px' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-gray-700 text-base leading-relaxed pr-4"
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
                    className="pr-4"
                  >
                    <ul className="space-y-6">
                      {model.howToUse.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-medium mr-4 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 text-base">{step}</span>
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
                    className="space-y-6 pr-4"
                  >
                    <div className="flex space-x-3 mb-6">
                      {model.realWorldExamples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveExample(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            activeExample === index
                              ? 'bg-accent-primary text-white shadow-sm'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          aria-label={`Example ${index + 1}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {model.realWorldExamples.map((example, index) => (
                        activeExample === index && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="p-6 rounded-xl border border-gray-200 bg-gray-50"
                          >
                            <h3 className="font-bold text-gray-900 mb-3">{example.title}</h3>
                            <p className="text-gray-700">{example.description}</p>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Diagram Section - Modern, clean styling */}
          <div
            ref={ref}
            className="relative h-[450px] md:h-auto bg-gray-50 flex items-center justify-center overflow-hidden"
          >
            {/* Subtle grid background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:16px_16px] opacity-50"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-primary/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-secondary/5 rounded-full blur-xl"></div>

            {/* Main diagram container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-md aspect-square flex items-center justify-center">
                {inView && renderDiagram()}
              </div>
            </div>

            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md px-4 py-2 text-sm font-medium text-gray-700"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Interactive diagram - click to explore
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