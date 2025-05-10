"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Model } from "@/lib/models";

interface HeroSectionProps {
  isLoaded: boolean;
  models: Model[];
}

export default function HeroSection({ isLoaded, models }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-6 text-sm font-medium text-accent-primary"
            >
              THINKING TOOLS
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-none"
            >
              Powerful mental models, visualized
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-xl"
            >
              Interactive frameworks to make better decisions, solve complex problems, and think with clarity and precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-8 mb-16"
            >
              <Link
                href="#explore"
                className="bg-accent-primary hover:bg-accent-primary-dark text-white rounded-lg px-8 py-4 font-medium inline-flex items-center gap-2 shadow-sm transition-colors"
              >
                Explore frameworks
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 10H15.5M15.5 10L10.5 5M15.5 10L10.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-10"
            >
              {[
                { label: "Interactive", icon: "🔄" },
                { label: "Evidence-based", icon: "✓" },
                { label: "Visual learning", icon: "👁️" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-gray-700 font-medium">{feature.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Column - Simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:order-last"
          >
            <div className="relative aspect-[4/3] w-full max-w-[500px] mx-auto">
              {/* Simple card with diagram */}
              <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="font-bold text-xl text-gray-900">Decision Frameworks</h3>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full max-w-[320px] aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Simple Ikigai diagram */}
                      <div className="relative w-full h-full">
                        <motion.div
                          className="absolute w-[70%] h-[70%] rounded-full border-2 border-blue-400 bg-blue-50/30 left-0 top-0"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute w-[70%] h-[70%] rounded-full border-2 border-green-400 bg-green-50/30 right-0 top-0"
                          animate={{
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                        <motion.div
                          className="absolute w-[70%] h-[70%] rounded-full border-2 border-red-400 bg-red-50/30 left-0 bottom-0"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3.5,
                            ease: "easeInOut",
                            delay: 0.7
                          }}
                        />
                        <motion.div
                          className="absolute w-[70%] h-[70%] rounded-full border-2 border-yellow-400 bg-yellow-50/30 right-0 bottom-0"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3.7,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[30%] h-[30%] bg-accent-primary rounded-full flex items-center justify-center text-white font-bold">
                            Ikigai
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  </div>
                  <span className="text-sm text-gray-500">Interactive visualization</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 14l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}