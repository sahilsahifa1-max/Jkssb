import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Layers, Smartphone, Sparkles } from 'lucide-react';
import { TRUST_STATS } from '../data/papers';

export const TrustStats: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    }
  };

  return (
    <section id="trust-stats-section" className="relative py-8 sm:py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 hover:border-sky-300 dark:hover:border-sky-800 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-xs border border-slate-200/60 dark:border-slate-800">
                  {getIcon(stat.icon)}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
