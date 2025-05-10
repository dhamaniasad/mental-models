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

export default function ModelPage({ params }: { params: { id: string } }) {
  const [model, setModel] = useState<typeof models[0] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    const foundModel = models.find(m => m.id === params.id);
    if (foundModel) {
      setModel(foundModel);
      // Short loading animation
      setTimeout(() => {
        setIsLoaded(true);
      }, 800);
    } else {
      notFound();
    }
  }, [params.id]);
  
  if (!model) {
    return null; // Show nothing while loading to avoid flash
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid background */}
      <SpaceBackground />
      
      {/* Loading screen */}
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono uppercase text-white text-2xl tracking-widest mb-6"
        >
          {model.name}
        </motion.div>
      </motion.div>
      
      {/* Header component */}
      <Header />
      
      <main className="pt-32 pb-24 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center font-mono text-xs uppercase text-white tracking-widest hover:text-accent mb-12 border border-white px-4 py-2"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back
            </Link>
            
            <div className="flex items-start gap-3 mb-12">
              <div className="h-1 w-12 bg-accent mt-5"></div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-mono font-bold uppercase text-white mb-6 tracking-tight"
                >
                  {model.name}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -15 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-white font-mono text-sm leading-relaxed border-l-2 border-white pl-4"
                >
                  {model.description}
                </motion.p>
              </div>
            </div>
          </div>
          
          {/* Model viewer component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-24 w-full max-w-5xl mx-auto"
          >
            <ModelViewer model={model} />
          </motion.div>
          
          {/* Additional content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Resources */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-px w-8 bg-accent mr-4"></div>
                <h2 className="font-mono uppercase text-white text-sm tracking-wider">Resources</h2>
              </div>
              
              <ul className="space-y-4 font-mono text-xs">
                <li className="pb-3 border-b border-white/20">
                  <a href="https://fs.blog/mental-models/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-white hover:text-accent flex justify-between items-center"
                  >
                    <span>Farnam Street Mental Models</span>
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li className="pb-3 border-b border-white/20">
                  <a href="https://www.mentalmodelsbox.com/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-white hover:text-accent flex justify-between items-center"
                  >
                    <span>Mental Models Box</span>
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li className="pb-3 border-b border-white/20">
                  <a href={`https://en.wikipedia.org/wiki/${model.id.replace(/-/g, '_')}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-white hover:text-accent flex justify-between items-center"
                  >
                    <span>Wikipedia</span>
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Related models */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-px w-8 bg-accent mr-4"></div>
                <h2 className="font-mono uppercase text-white text-sm tracking-wider">Related Models</h2>
              </div>
              
              <div className="space-y-6">
                {models.filter(m => m.id !== model.id).slice(0, 3).map((relatedModel, index) => (
                  <Link 
                    href={`/model/${relatedModel.id}`} 
                    key={relatedModel.id}
                    className="block border border-white hover:border-accent p-4 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="w-6 h-6 border border-white flex items-center justify-center text-xs mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-mono uppercase text-sm mb-2">{relatedModel.name}</h3>
                        <p className="font-mono text-xs text-white/70 line-clamp-2">{relatedModel.description}</p>
                      </div>
                    </div>
                  </Link>
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