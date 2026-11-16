import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brandBorder bg-[#0F0B1F]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brandCard border border-brandBorder shadow-premium">
            <Layers className="w-5 h-5 text-brandPrimary" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3.5 h-3.5 text-brandSecondary animate-pulse" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-100 font-sans">
            Stack<span className="text-brandPrimary">Wise</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brandMuted text-brandSecondary border border-brandBorder font-mono">
            v1.0.0
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline-block"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
