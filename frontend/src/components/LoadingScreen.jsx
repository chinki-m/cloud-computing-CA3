import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function LoadingScreen() {
  const messages = [
    "Analyzing requirements...",
    "Selecting technologies...",
    "Comparing frameworks...",
    "Designing architecture...",
    "Preparing recommendations...",
    "Almost done..."
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 text-center scroll-mt-24" id="loading-screen">
      <div className="glass-panel p-12 rounded-3xl shadow-premium flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
        {/* Pulsating backdrop glow */}
        <div className="absolute w-48 h-48 rounded-full bg-brandPrimary/10 blur-[60px] pointer-events-none animate-pulse-glow" />

        {/* Bouncing core chip icon */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-brandMuted/40 border border-brandBorder shadow-glow mb-6 animate-pulse">
          <Cpu className="w-8 h-8 text-brandPrimary animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Animating Status Message */}
        <div className="h-8 mb-6 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIdx}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-base font-semibold text-slate-200 font-sans"
            >
              {messages[currentIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Incremental Loading Indicator */}
        <div className="w-56 h-1.5 rounded-full bg-brandMuted/50 overflow-hidden border border-brandBorder">
          <motion.div
            initial={{ width: "5%" }}
            animate={{ width: `${((currentIdx + 1) / messages.length) * 100}%` }}
            transition={{ duration: 2.2, ease: "linear" }}
            className="h-full bg-gradient-to-r from-brandPrimary to-brandSecondary rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
