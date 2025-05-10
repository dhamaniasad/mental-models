"use client";

import { Model } from '@/lib/models';
import { motion, AnimatePresence, useTransform, useSpring, useScroll } from 'framer-motion';
import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import { EisenhowerDiagram } from './diagrams/EisenhowerDiagram';
import { SecondOrderThinkingDiagram } from './diagrams/SecondOrderThinkingDiagram';
import { CircleOfCompetenceDiagram } from './diagrams/CircleOfCompetenceDiagram';
import { InversionDiagram } from './diagrams/InversionDiagram';
import { useState, useRef, useEffect } from 'react';

interface ModelDetailProps {
  model: Model | null;
  onClose: () => void;
}

export default function ModelDetail({ model, onClose }: ModelDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'examples'>('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  if (!model) return null;
  
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
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-400">
              Interactive diagram coming soon
            </div>
          </div>
        );
    }
  };
  
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0 },
  };
  
  const tabIndicatorVariants = {
    inactive: { opacity: 0, scaleX: 0 },
    active: { opacity: 1, scaleX: 1 },
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Light mode backdrop with blur effect */}
        <motion.div
          className="absolute inset-0 bg-gray-500/20 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Light mode subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at center, rgba(79, 70, 229, 0.03), rgba(255, 255, 255, 0) 70%)",
            }}
          />
        </motion.div>
        
        {/* Modal content with premium design */}
        <motion.div
          ref={containerRef}
          className="relative z-10 w-[95vw] max-w-7xl h-[85vh] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Light mode subtle background pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.1), transparent 80%)`,
              transition: 'background 0.3s ease',
            }}
          />

          {/* Subtle corner accents for light mode */}
          <div className="absolute top-0 left-0 w-[150px] h-[150px] pointer-events-none">
            <div className="absolute top-0 left-0 w-[1px] h-[60px] bg-gradient-to-b from-accent-primary/30 to-transparent" />
            <div className="absolute top-0 left-0 w-[60px] h-[1px] bg-gradient-to-r from-accent-primary/30 to-transparent" />
          </div>
          <div className="absolute top-0 right-0 w-[150px] h-[150px] pointer-events-none">
            <div className="absolute top-0 right-0 w-[1px] h-[60px] bg-gradient-to-b from-accent-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 w-[60px] h-[1px] bg-gradient-to-r from-transparent to-accent-primary/20" />
          </div>
          <div className="absolute bottom-0 left-0 w-[150px] h-[150px] pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[1px] h-[60px] bg-gradient-to-t from-accent-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[60px] h-[1px] bg-gradient-to-r from-accent-primary/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-[150px] h-[150px] pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[1px] h-[60px] bg-gradient-to-t from-accent-primary/30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[60px] h-[1px] bg-gradient-to-r from-transparent to-accent-primary/30" />
          </div>
          
          {/* Light mode header with clean design */}
          <div className="relative px-10 pt-10 pb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.h2
                className="text-3xl font-bold tracking-tight text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {model.name}
              </motion.h2>
              <motion.div
                className="flex items-center justify-center rounded-full px-3.5 py-1.5 bg-accent-primary/10 border border-accent-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="text-xs font-medium text-accent-primary tracking-wider uppercase">Interactive</span>
              </motion.div>
            </div>

            {/* Light mode close button */}
            <motion.button
              className="relative group"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="absolute inset-0 rounded-full bg-gray-100 transform scale-0 group-hover:scale-100 transition-transform duration-200" />
              <div className="relative z-10 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-accent-primary transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-full bg-accent-primary/5 blur-sm" />
              </div>
            </motion.button>
          </div>
          
          {/* Light mode tabs */}
          <div className="px-10 pt-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-0">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'application', label: 'How to Apply' },
                { id: 'examples', label: 'Examples' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`relative px-6 py-4 text-gray-700 font-medium transition-colors ${activeTab === tab.id ? 'text-accent-primary' : ''}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? 'active' : 'inactive'}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary origin-left"
                    variants={tabIndicatorVariants}
                    animate={activeTab === tab.id ? 'active' : 'inactive'}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Content area with light mode layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(85vh-160px)] overflow-hidden">
            {/* Left: Interactive visualization with light mode styling */}
            <div className="relative flex items-center justify-center p-10 overflow-hidden">
              {/* Subtle gradient orbs for light mode */}
              <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-accent-primary/2 rounded-full blur-[80px] opacity-60" />
              <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] bg-accent-secondary/2 rounded-full blur-[60px] opacity-70" />

              <motion.div
                className="w-full h-full flex items-center justify-center relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative w-full max-w-[90%] h-[90%] flex items-center justify-center">
                  {/* Light mode visualization container */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm overflow-hidden">
                    {/* Subtle accent effect */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
                  </div>

                  {/* The actual diagram */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                    {renderDiagram()}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right: Content area with light mode styling */}
            <div className="relative h-full overflow-y-auto">
              {/* Light mode scrollbar styling */}
              <div className="absolute right-0 top-0 bottom-0 w-[3px]">
                <div className="absolute inset-0 bg-gray-100" />
              </div>

              {/* Content with clean animations */}
              <div className="px-10 py-8 h-full pr-12">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      className="space-y-10"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* Main description with clean typography */}
                      <div className="space-y-6">
                        <p className="text-xl text-gray-800 leading-relaxed">
                          {model.description}
                        </p>

                        <div className="text-gray-600 leading-relaxed">
                          {model.longDescription}
                        </div>
                      </div>

                      {/* Light mode callout box */}
                      <div className="relative p-6 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-primary" />

                        <div className="relative z-10 pl-2">
                          <div className="flex items-center space-x-2 mb-3">
                            <h4 className="font-semibold text-gray-900 text-lg">Key Insight</h4>
                          </div>

                          <p className="text-gray-700 italic">
                            {model.id === 'ikigai' && "Purpose lies at the intersection of passion, profession, mission, and vocation."}
                            {model.id === 'eisenhower-matrix' && "Not everything urgent is important, and not everything important is urgent."}
                            {model.id === 'second-order-thinking' && "Short-term thinking can lead to long-term problems; always ask 'and then what?'"}
                            {model.id === 'circle-of-competence' && "Success comes from operating within your circle of competence while knowing its boundaries."}
                            {model.id === 'inversion' && "To solve difficult problems, consider what would cause the opposite of your desired outcome."}
                          </p>
                        </div>
                      </div>
                      
                      {/* Light mode benefits list */}
                      <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 text-lg">Benefits of Using This Model</h3>

                        <div className="space-y-4">
                          {[
                            { title: "Clarity", description: "Gain clear insights into complex decisions" },
                            { title: "Structure", description: "Add structure to your thinking process" },
                            { title: "Perspective", description: "See problems from multiple angles" },
                            { title: "Decision Quality", description: "Make more robust, well-considered decisions" }
                          ].map((benefit, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start space-x-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i, duration: 0.5 }}
                            >
                              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mt-0.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-primary">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'application' && (
                    <motion.div
                      key="application"
                      className="space-y-10"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">How to Apply This Model</h3>

                      {/* Light mode steps with animations */}
                      <div className="space-y-6">
                        {model.howToUse.map((step, index) => (
                          <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <div className="flex">
                              {/* Light mode step indicator */}
                              <div className="flex-shrink-0 mr-5">
                                <div className="relative flex items-center justify-center">
                                  <div className="w-9 h-9 rounded-full bg-accent-primary/10 flex items-center justify-center">
                                    <span className="text-accent-primary font-medium">{index + 1}</span>
                                  </div>
                                  {index < model.howToUse.length - 1 && (
                                    <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-gray-200 to-transparent"></div>
                                  )}
                                </div>
                              </div>

                              {/* Light mode step content */}
                              <div className="pb-12">
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                  <p className="text-gray-700">{step}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Light mode pitfalls section */}
                      <div className="relative p-6 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />

                        <div className="relative z-10 pl-2">
                          <div className="flex items-center space-x-2 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500">
                              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h4 className="font-semibold text-gray-900">Common Pitfalls to Avoid</h4>
                          </div>

                          <ul className="space-y-3">
                            {model.id === 'ikigai' && [
                              "Focusing too much on one circle while neglecting others",
                              "Unrealistic expectations about finding perfect balance immediately",
                              "Not recognizing that Ikigai evolves over time"
                            ].map((item, i) => (
                              <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}

                            {model.id === 'eisenhower-matrix' && [
                              "Mislabeling tasks as urgent when they're merely pressing",
                              "Spending too much time on urgent but unimportant tasks",
                              "Not allocating enough time for important, non-urgent tasks"
                            ].map((item, i) => (
                              <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}

                            {model.id === 'second-order-thinking' && [
                              "Stopping analysis at first-order effects only",
                              "Over-complicating simple decisions",
                              "Missing non-linear or unexpected consequences"
                            ].map((item, i) => (
                              <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}

                            {model.id === 'circle-of-competence' && [
                              "Overestimating the size of your circle",
                              "Unwillingness to acknowledge when you're outside your circle",
                              "Failing to expand your circle methodically"
                            ].map((item, i) => (
                              <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}

                            {model.id === 'inversion' && [
                              "Using it in isolation without forward thinking",
                              "Focusing only on risks while missing opportunities",
                              "Becoming overly pessimistic or risk-averse"
                            ].map((item, i) => (
                              <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-amber-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'examples' && (
                    <motion.div
                      key="examples"
                      className="space-y-10"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Real-World Examples</h3>

                      {/* Light mode examples cards with animations */}
                      <div className="space-y-7">
                        {model.realWorldExamples.map((example, index) => (
                          <motion.div
                            key={index}
                            className="relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                          >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-primary" />

                            <div className="relative z-10 p-7">
                              <h4 className="text-lg font-medium text-accent-primary mb-3">
                                {example.title}
                              </h4>
                              <p className="text-gray-700 leading-relaxed">
                                {example.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Light mode interactive prompt */}
                      <motion.div
                        className="mt-8 flex items-center justify-center space-x-5 p-6 rounded-xl bg-blue-50 border border-blue-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-blue-800 text-sm flex-1">
                          <span className="font-medium">Tip:</span> Interact with the visualization on the left to explore this mental model in detail. The diagram responds to your interactions.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}