"use client";

import { Model } from '@/lib/models';
import { motion, AnimatePresence } from 'framer-motion';
import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import { EisenhowerDiagram } from './diagrams/EisenhowerDiagram';
import { SecondOrderThinkingDiagram } from './diagrams/SecondOrderThinkingDiagram';
import { CircleOfCompetenceDiagram } from './diagrams/CircleOfCompetenceDiagram';
import { InversionDiagram } from './diagrams/InversionDiagram';
import { useState } from 'react';

interface ModelDetailProps {
  model: Model | null;
  onClose: () => void;
}

export default function ModelDetail({ model, onClose }: ModelDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'examples'>('overview');
  
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
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal content */}
        <motion.div 
          className="modal-content w-11/12 max-w-6xl h-5/6 z-10 flex flex-col"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header with tabs */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
            <h2 className="text-2xl font-bold text-gradient">{model.name}</h2>
            
            <div className="flex items-center space-x-1">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors 
                  ${activeTab === 'overview' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-300 hover:bg-gray-800/50'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors 
                  ${activeTab === 'application' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-300 hover:bg-gray-800/50'}`}
                onClick={() => setActiveTab('application')}
              >
                Application
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors 
                  ${activeTab === 'examples' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-300 hover:bg-gray-800/50'}`}
                onClick={() => setActiveTab('examples')}
              >
                Examples
              </button>
              
              {/* Close button */}
              <button 
                className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/70 text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* Left side: Interactive visualization */}
            <div className="h-full flex items-center justify-center bg-gradient-to-b from-background to-background-secondary p-4">
              <motion.div 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {renderDiagram()}
              </motion.div>
            </div>
            
            {/* Right side: Model information */}
            <div className="h-full overflow-y-auto border-l border-gray-800/50">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">{model.description}</p>
                      <h3 className="text-xl font-semibold text-white mb-3">Understanding the Model</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">{model.longDescription}</p>
                      
                      <div className="glass-lighter p-4 rounded-lg mt-6">
                        <h4 className="text-sm uppercase tracking-wider text-indigo-300 mb-2">Key Insight</h4>
                        <p className="text-gray-200 italic">
                          {model.id === 'ikigai' && "Purpose lies at the intersection of passion, profession, mission, and vocation."}
                          {model.id === 'eisenhower-matrix' && "Not everything urgent is important, and not everything important is urgent."}
                          {model.id === 'second-order-thinking' && "Short-term thinking can lead to long-term problems; always ask 'and then what?'"}
                          {model.id === 'circle-of-competence' && "Success comes from operating within your circle of competence while knowing its boundaries."}
                          {model.id === 'inversion' && "To solve difficult problems, consider what would cause the opposite of your desired outcome."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'application' && (
                  <motion.div
                    key="application"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-semibold text-white mb-4">How to Apply This Model</h3>
                      <ul className="space-y-3">
                        {model.howToUse.map((step, index) => (
                          <li 
                            key={index}
                            className="flex items-start gap-3 text-gray-300 leading-relaxed"
                          >
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 p-4 border border-gray-800/50 rounded-lg bg-gray-900/30">
                        <h4 className="text-lg font-medium text-white mb-2">Common Pitfalls</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                          {model.id === 'ikigai' && (
                            <>
                              <li>Focusing too much on one circle while neglecting others</li>
                              <li>Unrealistic expectations about finding perfect balance immediately</li>
                              <li>Not recognizing that Ikigai evolves over time</li>
                            </>
                          )}
                          {model.id === 'eisenhower-matrix' && (
                            <>
                              <li>Mislabeling tasks as urgent when they're merely pressing</li>
                              <li>Spending too much time on urgent but unimportant tasks</li>
                              <li>Not allocating enough time for important, non-urgent tasks</li>
                            </>
                          )}
                          {model.id === 'second-order-thinking' && (
                            <>
                              <li>Stopping analysis at first-order effects only</li>
                              <li>Over-complicating simple decisions</li>
                              <li>Missing non-linear or unexpected consequences</li>
                            </>
                          )}
                          {model.id === 'circle-of-competence' && (
                            <>
                              <li>Overestimating the size of your circle</li>
                              <li>Unwillingness to acknowledge when you're outside your circle</li>
                              <li>Failing to expand your circle methodically</li>
                            </>
                          )}
                          {model.id === 'inversion' && (
                            <>
                              <li>Using it in isolation without forward thinking</li>
                              <li>Focusing only on risks while missing opportunities</li>
                              <li>Becoming overly pessimistic or risk-averse</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'examples' && (
                  <motion.div
                    key="examples"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-semibold text-white mb-4">Real-World Examples</h3>
                      <div className="space-y-5">
                        {model.realWorldExamples.map((example, index) => (
                          <div 
                            key={index}
                            className="glass-lighter p-5 rounded-lg"
                          >
                            <h4 className="font-medium text-lg text-indigo-300 mb-2">{example.title}</h4>
                            <p className="text-gray-300">{example.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex items-center text-gray-400 text-sm">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Interactive with the visualization on the left to explore this mental model</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}