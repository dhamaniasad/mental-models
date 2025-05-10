"use client";

import { useEffect, useState } from "react";
import { models } from "@/lib/models";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SpaceBackground from "@/components/SpaceBackground";
import { ModelViewer } from "@/components/ModelViewer";

interface ModelPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ModelPage({ params }: ModelPageProps) {
  const id = params.id;

  const [model, setModel] = useState<typeof models[0] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const foundModel = models.find(m => m.id === id);
    if (foundModel) {
      setModel(foundModel);
      // Short loading animation
      setTimeout(() => {
        setIsLoaded(true);
      }, 800);
    } else {
      notFound();
    }
  }, [id]);
  
  if (!model) {
    return null; // Show nothing while loading to avoid flash
  }
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Light, modern page background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px] opacity-30 z-0"></div>

      {/* Loading screen - elegant fade */}
      <motion.div
        className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent-primary font-bold text-3xl tracking-tight"
        >
          {model.name}
        </motion.div>
      </motion.div>

      {/* Header component */}
      <Header />

      <main className="pt-40 pb-32 z-10 relative">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-20">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-accent-primary mb-16 transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-accent-primary/10 flex items-center justify-center mr-3 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Back to frameworks</span>
            </Link>

            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 text-sm font-medium text-accent-primary uppercase tracking-wider"
              >
                Decision Framework
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                {model.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                {model.description}
              </motion.p>
            </div>
          </div>

          {/* Model viewer component - modern, clean design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-32 w-full max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2 px-3 py-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 font-medium">Interactive Framework</span>
                  </div>
                </div>
              </div>
              <ModelViewer model={model} />
            </div>
          </motion.div>

          {/* Detailed content - modern cards layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-20">
              <div className="flex items-center justify-center mb-12">
                <div className="h-px w-12 bg-gray-200 mr-6"></div>
                <h2 className="text-xl font-bold text-gray-900">Full Description</h2>
                <div className="h-px w-12 bg-gray-200 ml-6"></div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {model.longDescription}
                </p>
              </div>
            </div>

            {/* How to use section - clean, modern */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-12">
                <div className="h-px w-12 bg-gray-200 mr-6"></div>
                <h2 className="text-xl font-bold text-gray-900">How to Apply</h2>
                <div className="h-px w-12 bg-gray-200 ml-6"></div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
                <div className="grid grid-cols-1 gap-8">
                  {model.howToUse.map((step, index) => (
                    <div key={index} className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modern grid layout for bottom sections */}
            <div className="grid md:grid-cols-2 gap-16">
              {/* Resources - redesigned with cards */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px w-8 bg-gray-200 mr-4"></div>
                  <h2 className="text-lg font-bold text-gray-900">Resources</h2>
                  <div className="h-px w-8 bg-gray-200 ml-4"></div>
                </div>

                <div className="space-y-4">
                  <a href="https://fs.blog/mental-models/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium mb-1 group-hover:text-accent-primary transition-colors">Farnam Street Mental Models</h3>
                      <p className="text-sm text-gray-500">Comprehensive guides to mental models</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-accent-primary/10 flex items-center justify-center ml-4 transition-colors">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-accent-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </a>
                  <a href="https://www.mentalmodelsbox.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium mb-1 group-hover:text-accent-primary transition-colors">Mental Models Box</h3>
                      <p className="text-sm text-gray-500">Practical applications of mental models</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-accent-primary/10 flex items-center justify-center ml-4 transition-colors">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-accent-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </a>
                  <a href={`https://en.wikipedia.org/wiki/${model.id.replace(/-/g, '_')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium mb-1 group-hover:text-accent-primary transition-colors">Wikipedia</h3>
                      <p className="text-sm text-gray-500">Academic background and history</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-accent-primary/10 flex items-center justify-center ml-4 transition-colors">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-accent-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              {/* Related models - clean cards */}
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px w-8 bg-gray-200 mr-4"></div>
                  <h2 className="text-lg font-bold text-gray-900">Related Frameworks</h2>
                  <div className="h-px w-8 bg-gray-200 ml-4"></div>
                </div>

                <div className="space-y-4">
                  {models.filter(m => m.id !== model.id).slice(0, 3).map((relatedModel, index) => (
                    <Link
                      href={`/model/${relatedModel.id}`}
                      key={relatedModel.id}
                      className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent-primary hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 group-hover:bg-accent-primary/10 flex items-center justify-center text-gray-500 group-hover:text-accent-primary transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-gray-900 font-medium mb-2 group-hover:text-accent-primary transition-colors">{relatedModel.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{relatedModel.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-world examples - bonus section */}
            <div className="mt-20">
              <div className="flex items-center justify-center mb-12">
                <div className="h-px w-12 bg-gray-200 mr-6"></div>
                <h2 className="text-xl font-bold text-gray-900">Real-World Examples</h2>
                <div className="h-px w-12 bg-gray-200 ml-6"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {model.realWorldExamples.map((example, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                    <div className="p-1 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                    <div className="p-8 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{example.title}</h3>
                      <p className="text-gray-700 text-sm">{example.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}