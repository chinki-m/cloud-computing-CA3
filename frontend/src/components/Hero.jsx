import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code } from 'lucide-react';

export default function Hero({ onScrollToSection }) {
  return (
    <div className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brandPrimary/10 blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Floating Micro Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brandBorder bg-brandCard text-xs font-semibold text-brandSecondary shadow-premium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-brandPrimary animate-pulse" />
          <span>Intelligent Tech Stack Consultant</span>
        </motion.div>

        {/* Primary Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight mb-6"
        >
          <span className="gradient-text font-sans">Build Smarter.</span>
          <br />
          <span className="gradient-accent-text font-sans">Choose Better.</span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans"
        >
          Describe your software idea and instantly receive the perfect technology stack, architecture, deployment plan and roadmap.
        </motion.p>

        {/* Actions buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onScrollToSection('generator-form')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-brandPrimary hover:bg-brandHover text-white flex items-center justify-center gap-2 shadow-glow transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Generate Stack</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onScrollToSection('demo-presets')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-brandCard hover:bg-brandCard/60 text-slate-300 hover:text-slate-100 border border-brandBorder flex items-center justify-center gap-2 transition-all duration-300 hover:border-brandBorderActive"
          >
            <Code className="w-4 h-4 text-brandSecondary" />
            <span>Try Demo</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
