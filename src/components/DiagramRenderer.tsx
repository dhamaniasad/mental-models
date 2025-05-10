"use client";

import { IkigaiDiagram } from './diagrams/IkigaiDiagram';
import { EisenhowerDiagram } from './diagrams/EisenhowerDiagram';
import { SecondOrderThinkingDiagram } from './diagrams/SecondOrderThinkingDiagram';
import { CircleOfCompetenceDiagram } from './diagrams/CircleOfCompetenceDiagram';
import { InversionDiagram } from './diagrams/InversionDiagram';
import { DivergentThinkingDiagram } from './diagrams/DivergentThinkingDiagram';
import { LateralThinkingDiagram } from './diagrams/LateralThinkingDiagram';
import { ContrarianThinkingDiagram } from './diagrams/ContrarianThinkingDiagram';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagramRendererProps {
  modelId: string;
}

export function DiagramRenderer({ modelId }: DiagramRendererProps) {
  const [previousModelId, setPreviousModelId] = useState<string>(modelId);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  
  useEffect(() => {
    if (modelId !== previousModelId) {
      setIsChanging(true);
      
      // After animation out is complete, update the previous model
      const timer = setTimeout(() => {
        setPreviousModelId(modelId);
        setIsChanging(false);
      }, 300); // Match the exit animation duration
      
      return () => clearTimeout(timer);
    }
  }, [modelId, previousModelId]);
  
  const renderDiagram = (id: string) => {
    switch (id) {
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
      case 'divergent-thinking':
        return <DivergentThinkingDiagram />;
      case 'lateral-thinking':
        return <LateralThinkingDiagram />;
      case 'contrarian-thinking':
        return <ContrarianThinkingDiagram />;
      default:
        return <div className="flex items-center justify-center h-full">Diagram coming soon</div>;
    }
  };
  
  return (
    <div className="h-[500px] md:h-auto relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={previousModelId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          {renderDiagram(previousModelId)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}