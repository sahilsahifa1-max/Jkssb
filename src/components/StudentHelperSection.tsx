import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Repeat, 
  ShieldAlert, 
  BookMarked, 
  RotateCw, 
  Lightbulb, 
  Clock, 
  CheckSquare, 
  Target 
} from 'lucide-react';
import { PREPARATION_STEPS, PREP_TIPS } from '../data/papers';

export const StudentHelperSection: React.FC = () => {
  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-blue-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'BookMarked': return <BookMarked className="w-5 h-5 text-purple-500" />;
      case 'RotateCw': return <RotateCw className="w-5 h-5 text-emerald-500" />;
      default: return <Lightbulb className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section id="preparation-guide" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Aspirant Strategy & Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How to Use Previous Year Papers Effectively
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Solving past papers without a system yields low retention. Follow this 6-step study loop recommended by top-ranking JKSSB candidates.
          </p>
        </div>

        {/* 6-Step Methodology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {PREPARATION_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 font-extrabold text-sm flex items-center justify-center mb-3.5 border border-sky-200/60 dark:border-sky-800">
                  0{item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Smart Preparation Tips Bento */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-500/20 to-blue-600/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  High-Yield Recommendations
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  Smart Preparation Tips
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 w-fit">
                JKSSB Negative Marking: -0.25
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {PREP_TIPS.map((tip, idx) => (
                <div
                  key={tip.title}
                  className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/80">
                      {getTipIcon(tip.icon)}
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {tip.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
