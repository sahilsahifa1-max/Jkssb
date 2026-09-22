import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { YEARS, PAPERS } from '../data/papers';

interface BrowseByYearProps {
  onSelectYear: (year: number) => void;
}

export const BrowseByYear: React.FC<BrowseByYearProps> = ({ onSelectYear }) => {
  const getYearHighlight = (year: number) => {
    switch (year) {
      case 2026: return 'Latest 2026 Papers';
      case 2025: return 'Graduate & FAA Series';
      case 2024: return 'Sub-Inspector & CGL Exams';
      case 2023: return 'Forestry & VLW Papers';
      case 2022: return 'Police SI & Technical';
      case 2021: return 'Special Class IV Drive';
      case 2020: return 'Landmark PAA Exams';
      default: return 'Previous Year Series';
    }
  };

  return (
    <section id="years" className="py-12 sm:py-16 bg-slate-100/50 dark:bg-slate-950/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              Chronological Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Browse by Year (2020–2025)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Navigate previous year questions chronologically to trace syllabus shifts, recurrent exam patterns, and mark allocations.
            </p>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            2020–2025 Verified Archives Available
          </div>
        </div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {YEARS.map((yr, idx) => {
            const papersCount = PAPERS.filter((p) => p.year === yr).length;
            const is2026 = yr === 2026;

            return (
              <motion.div
                key={yr}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectYear(yr)}
                className={`group relative rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                  is2026
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 hover:border-amber-400 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-700 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      is2026
                        ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300' 
                        : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                    }`}>
                      {is2026 ? 'Coming soon' : 'Archive'}
                    </span>
                    <Calendar className={`w-4 h-4 ${is2026 ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>

                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {yr}
                  </div>

                  <p className="text-[11px] mt-1 font-medium leading-tight line-clamp-2 text-slate-500 dark:text-slate-400">
                    {is2026 ? 'Awaiting 2026 release' : getYearHighlight(yr)}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    {is2026 ? 'Coming soon' : `${papersCount} Subjects`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
