"use client";

import { Model } from '@/lib/models';
import { motion, AnimatePresence } from 'framer-motion';
import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import { EisenhowerDiagram } from './diagrams/EisenhowerDiagram';

interface ModelDetailProps {
  model: Model | null;
  onClose: () => void;
}

export default function ModelDetail({ model, onClose }: ModelDetailProps) {
  if (!model) return null;
  
  const renderDiagram = () => {
    switch (model.id) {
      case 'ikigai':
        return <IkigaiDiagram />;
      case 'eisenhower-matrix':
        return <EisenhowerDiagram />;
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
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal content */}
        <motion.div 
          className="w-11/12 max-w-6xl h-5/6 bg-surface-primary border border-gray-800 rounded-lg overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 relative"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 text-gray-400 hover:text-white z-20"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Left side: Interactive visualization */}
          <div className="h-full lg:border-r border-gray-800 flex items-center justify-center bg-black/30 p-6">
            <motion.div 
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {renderDiagram()}
            </motion.div>
          </div>
          
          {/* Right side: Model information */}
          <div className="h-full overflow-y-auto p-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gradient glow-text mb-4">{model.name}</h2>
              <p className="text-gray-300 mb-8">{model.description}</p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-white mb-4">Understanding the Model</h3>
                  <p className="text-gray-300 leading-relaxed">{model.longDescription}</p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-white mb-4">How to Apply This Model</h3>
                  <ul className="space-y-2 text-gray-300 list-inside list-disc">
                    {model.howToUse.map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                        className="leading-relaxed"
                      >
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-white mb-4">Real-World Examples</h3>
                  <div className="space-y-4">
                    {model.realWorldExamples.map((example, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                      >
                        <h4 className="font-medium text-purple-300 mb-2">{example.title}</h4>
                        <p className="text-gray-300 text-sm">{example.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}