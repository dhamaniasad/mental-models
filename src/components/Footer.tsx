"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand section */}
          <div className="md:col-span-5 space-y-10">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-accent-primary rounded-lg flex items-center justify-center mr-5">
                <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Mental<span className="font-normal">Models</span>
              </span>
            </div>

            <p className="text-gray-600 max-w-md text-base leading-relaxed">
              Transform your thinking with visual, interactive mental models
              that enhance decision-making and problem-solving capabilities.
            </p>

            <div className="pt-4">
              <Link
                href="#explore"
                className="bg-accent-primary hover:bg-accent-primary-dark text-white rounded-lg px-8 py-3.5 text-sm font-medium transition-colors duration-200 inline-block"
              >
                Explore Models
              </Link>
            </div>
          </div>

          {/* Links sections */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {/* Popular Models */}
              <div className="pl-2">
                <h4 className="text-gray-900 font-bold text-base mb-7">
                  Popular Models
                </h4>
                <ul className="space-y-5">
                  {['Ikigai', 'Second-Order Thinking', 'Circle of Competence', 'Eisenhower Matrix', 'Inversion'].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={`/model/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="text-gray-600 hover:text-accent-primary transition-colors duration-200 text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Models */}
              <div className="pl-2">
                <h4 className="text-gray-900 font-bold text-base mb-7">
                  New Models
                </h4>
                <ul className="space-y-5">
                  {['Divergent Thinking', 'Lateral Thinking', 'Contrarian Thinking', 'Probabilistic Thinking', 'First Principles'].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={`/model/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace('first-principles', 'first-principles-thinking')}`}
                        className="text-gray-600 hover:text-accent-primary transition-colors duration-200 text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="pl-2">
                <h4 className="text-gray-900 font-bold text-base mb-7">
                  Categories
                </h4>
                <ul className="space-y-5">
                  {['Decision Making', 'Problem Solving', 'Creativity', 'Strategic Thinking', 'Self-Development'].map((item, i) => (
                    <li key={i}>
                      <span className="text-gray-600 text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mental Models Explorer. All rights reserved.
          </p>

          <div className="flex gap-12">
            <span className="text-gray-500 text-sm">Privacy Policy</span>
            <span className="text-gray-500 text-sm">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}