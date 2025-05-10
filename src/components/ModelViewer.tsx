"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

  useEffect(() => {
    // Show interaction tip after a delay
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const renderDiagram = () => {
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

  // Brutalist tab variants - sharp and decisive
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
        ease: [0, 0, 0.2, 1] // Sharp easing
      }
    }
  };

  // Content variants with more abrupt transitions
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
        ease: [0, 0, 0.2, 1] // Sharp easing
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
      <div className="border-2 border-white overflow-hidden bg-black">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Content Section */}
          <div className="p-6 md:p-10 flex flex-col h-full border-r-2 border-white">
            {/* Red accent bar */}
            <div className="h-1 w-32 bg-accent mb-6"></div>

            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-mono font-bold uppercase text-white mb-6 tracking-tight"
            >
              {model.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-white mb-8 font-mono text-sm leading-relaxed"
            >
              {model.description}
            </motion.p>

            {/* Brutalist tab navigation */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex mb-8 border-b-2 border-white/30"
            >
              {(['description', 'how-to-use', 'examples'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === tab ? "active" : "inactive"}
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest ${
                    activeTab === tab
                      ? 'text-accent bg-white/10'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      layoutId="brutalist-underline"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden font-mono">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-white text-sm leading-relaxed"
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
                    <ul className="space-y-6">
                      {model.howToUse.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 w-6 h-6 border border-white flex items-center justify-center text-white mr-4 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-white text-sm">{step}</span>
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
                    <div className="flex space-x-4 mb-8">
                      {model.realWorldExamples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveExample(index)}
                          className={`w-5 h-5 flex items-center justify-center ${
                            activeExample === index
                              ? 'bg-accent text-black'
                              : 'border border-white text-white'
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
                            transition={{ duration: 0.2 }}
                            className="p-4 border border-white"
                          >
                            <h3 className="font-bold uppercase text-accent mb-3 text-sm tracking-wider">{example.title}</h3>
                            <p className="text-white text-sm">{example.description}</p>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Diagram Section - Brutalist styling */}
          <div
            ref={ref}
            className="relative h-[400px] md:h-auto bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`h-${i}`} className="w-full h-px bg-white/10" style={{ top: `${i * 12.5}%`, position: 'absolute', left: 0, right: 0 }} />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`v-${i}`} className="h-full w-px bg-white/10" style={{ left: `${i * 12.5}%`, position: 'absolute', top: 0, bottom: 0 }} />
              ))}
              <div className="absolute top-1/3 left-0 right-0 h-px bg-accent/30" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-accent/30" />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {inView && renderDiagram()}
            </div>

            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 border border-white px-3 py-1 text-xs font-mono text-white uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent"></div>
                    Interact with diagram
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