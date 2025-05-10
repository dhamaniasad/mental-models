"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Model } from '@/lib/models';
import Link from 'next/link';

interface ModelCardProps {
  model: Model;
  index: number;
  active: boolean;
}

export default function ModelCard({ model, index, active }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get model-specific icon and color
  const getModelVisuals = () => {
    switch (model.id) {
      case 'ikigai':
        return { icon: "🌱", color: "bg-green-500", bgColor: "bg-green-50" };
      case 'eisenhower-matrix':
        return { icon: "⏱️", color: "bg-orange-500", bgColor: "bg-orange-50" };
      case 'second-order-thinking':
        return { icon: "🔄", color: "bg-indigo-500", bgColor: "bg-indigo-50" };
      case 'circle-of-competence':
        return { icon: "⭕", color: "bg-yellow-500", bgColor: "bg-yellow-50" };
      case 'inversion':
        return { icon: "⚖️", color: "bg-red-500", bgColor: "bg-red-50" };
      case 'mental-models':
        return { icon: "🧠", color: "bg-purple-500", bgColor: "bg-purple-50" };
      case 'first-principles-thinking':
        return { icon: "🔬", color: "bg-blue-500", bgColor: "bg-blue-50" };
      case 'occams-razor': 
        return { icon: "✂️", color: "bg-gray-500", bgColor: "bg-gray-50" };
      case 'hanlons-razor':
        return { icon: "🤝", color: "bg-pink-500", bgColor: "bg-pink-50" };
      case 'bayes-theorem':
        return { icon: "📊", color: "bg-teal-500", bgColor: "bg-teal-50" };
      case 'probabilistic-thinking':
        return { icon: "🎲", color: "bg-cyan-500", bgColor: "bg-cyan-50" };
      case 'black-swan-theory':
        return { icon: "🦢", color: "bg-slate-700", bgColor: "bg-slate-50" };
      case 'divergent-thinking':
        return { icon: "💡", color: "bg-amber-500", bgColor: "bg-amber-50" };
      case 'lateral-thinking':
        return { icon: "🧩", color: "bg-emerald-500", bgColor: "bg-emerald-50" };
      case 'contrarian-thinking':
        return { icon: "⚡", color: "bg-violet-500", bgColor: "bg-violet-50" };
      default:
        return { icon: "📝", color: "bg-blue-500", bgColor: "bg-blue-50" };
    }
  };

  const { icon, color, bgColor } = getModelVisuals();

  // Card animations
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Arrow animation
  const arrowVariants = {
    hidden: { 
      x: 0,
    },
    visible: { 
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Category based on model ID
  const getCategory = () => {
    switch(model.id) {
      case 'ikigai':
        return 'Self-Development';
      case 'eisenhower-matrix':
        return 'Productivity';
      case 'second-order-thinking':
      case 'probabilistic-thinking':
        return 'Decision Making';
      case 'circle-of-competence':
        return 'Self-Awareness';
      case 'inversion':
        return 'Problem Solving';
      case 'mental-models':
        return 'Meta-Cognition';
      case 'first-principles-thinking':
        return 'Innovation';
      case 'occams-razor':
        return 'Critical Thinking';
      case 'hanlons-razor':
        return 'Relationship';
      case 'bayes-theorem':
        return 'Probability';
      case 'black-swan-theory':
        return 'Risk Management';
      case 'divergent-thinking':
        return 'Creativity';
      case 'lateral-thinking':
        return 'Innovation';
      case 'contrarian-thinking':
        return 'Strategic Thinking';
      default:
        return 'Mental Model';
    }
  };

  return (
    <Link href={`/model/${model.id}`} className="block h-full">
      <motion.div
        className="h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={index}
        variants={cardVariants}
      >
        <div className={`h-full flex flex-col rounded-xl bg-white border ${active ? 'border-accent-primary' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}>
          {active && (
            <div className="h-1.5 bg-accent-primary w-full" />
          )}

          <div className="p-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-16 h-16 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}>
                {icon}
              </div>

              {active && (
                <motion.span
                  className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Active
                </motion.span>
              )}
            </div>

            <div className="mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                {getCategory()}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-5">
              {model.name}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-10 flex-grow">
              {model.description}
            </p>

            <div className="flex items-center mt-auto">
              <span className={`text-accent-primary font-medium text-sm flex items-center ${isHovered ? 'gap-3' : 'gap-2'} transition-all`}>
                Explore model
                <motion.div
                  variants={arrowVariants}
                  animate={isHovered ? "visible" : "hidden"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}