"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Model } from '@/lib/models';

interface ModelSelectorProps {
  models: Model[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
}

export function ModelSelector({ models, activeModelId, onSelectModel }: ModelSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const activeModel = models.find(model => model.id === activeModelId) || models[0];
  
  return (
    <div className="relative z-20">
      <div 
        className="flex items-center gap-2 cursor-pointer mb-12"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {activeModel.name}
        </h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-indigo-400"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 w-full md:max-w-md bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden z-30"
          >
            <div className="max-h-[350px] overflow-y-auto py-2">
              {models.map((model) => (
                <motion.div
                  key={model.id}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className={`px-4 py-3 cursor-pointer ${model.id === activeModelId ? 'bg-indigo-900/30' : ''}`}
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsExpanded(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${model.id === activeModelId ? 'text-indigo-400' : 'text-white'}`}>
                      {model.name}
                    </h3>
                    {model.id === activeModelId && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-indigo-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{model.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}