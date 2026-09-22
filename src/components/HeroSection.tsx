import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Calculator,
  Atom,
  BookOpen,
  Calendar
} from 'lucide-react';
import { NavRoute } from '../types';

interface HeroSectionProps {
  onNavigate: (route: NavRoute) => void;
  onOpenSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-400/10 via-blue-500/10 to-indigo-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 inset-x-0 h-40 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Independent Student Archive • 2020–2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              JKSSB Previous Year <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
                Question Papers
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Find, browse and access JKSSB question papers from 2020 to 2026 — organized by year, subject and examination. Direct access to verified Google Drive repositories.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-primary-browse-btn"
                onClick={() => onNavigate({ view: 'papers' })}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 shadow-lg shadow-blue-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Browse Question Papers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-search-btn"
                onClick={onOpenSearch}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                Search Papers (Ctrl+K)
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Drive Folders
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                Maths, Science, English, SST, Urdu
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Completely Free Access
              </span>
            </div>
          </motion.div>

          {/* Right Animated Paper Stack Visual */}
          <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md h-[340px] sm:h-[380px]">
              
              {/* Card 3 (Bottom Layer) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 6 }}
                animate={{ opacity: 0.5, y: 16, rotate: 6 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute inset-x-4 top-10 h-64 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 shadow-lg pointer-events-none"
              />

              {/* Card 2 (Middle Layer) */}
              <motion.div
                initial={{ opacity: 0, y: 25, rotate: -3 }}
                animate={{ opacity: 0.8, y: 8, rotate: -3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-x-2 top-5 h-64 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-850 dark:to-slate-900 border border-slate-200 dark:border-slate-750 shadow-xl pointer-events-none"
              />

              {/* Card 1 (Top Hero Card with Subtle Float) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -6, 0] 
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' } 
                }}
                className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between"
              >
                {/* Card Top Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          Featured Archive
                        </span>
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          Mathematics Archive (2020–2025)
                        </h2>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Verified Drive
                    </span>
                  </div>

                  {/* Mock Paper Preview Snippet */}
                  <div className="mt-4 space-y-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-mono">
                        <span>SERIES: 2020–2025</span>
                        <span>OFFICIAL DRIVE</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        Q1. If the ratio of speed of two trains is 7:8 and the second train runs 400 km in 4 hours, then the speed of the first train is:
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-sky-600 dark:text-sky-400">A)</span> 70 km/h
                      </div>
                      <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-sky-600 dark:text-sky-400">B)</span> 87.5 km/h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>2020 – 2025 Archive</span>
                  </div>

                  <button
                    onClick={() => onNavigate({ view: 'papers', subject: 'mathematics', year: 2024 })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/60 transition-colors"
                  >
                    View Papers
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
