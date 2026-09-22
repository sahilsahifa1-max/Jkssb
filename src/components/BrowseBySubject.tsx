import React from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Atom, 
  BookOpen, 
  Globe, 
  PenTool, 
  ArrowRight, 
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import { SUBJECTS } from '../data/papers';
import { SubjectId, NavRoute } from '../types';

interface BrowseBySubjectProps {
  onSelectSubject: (subjectId: SubjectId) => void;
}

export const BrowseBySubject: React.FC<BrowseBySubjectProps> = ({ onSelectSubject }) => {
  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'mathematics': return <Calculator className="w-6 h-6 text-blue-600 dark:text-sky-400" />;
      case 'science': return <Atom className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'english': return <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'sst': return <Globe className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'urdu': return <PenTool className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      default: return <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <section id="subjects" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              Subject Archives
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Browse by Subject
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              All question papers neatly structured across 5 primary examination disciplines from 2020 through 2025.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Verified Google Drive Archives
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-300 dark:hover:border-sky-800 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Code + Year Span */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/80 group-hover:scale-105 transition-transform">
                    {getSubjectIcon(sub.id)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      2020–2025
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {sub.code}
                    </span>
                  </div>
                </div>

                {/* Subject Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {sub.name}
                </h3>

                {/* Tagline required by spec */}
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                  Previous year question papers
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                  {sub.description}
                </p>

                {/* Source Label */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Source:</span>
                    <span>Google Drive</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    Official Archive
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-3 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={() => onSelectSubject(sub.id)}
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Filter in App
                </button>

                <a
                  href={sub.folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-xs transition-colors"
                  title={`Open official ${sub.name} Google Drive repository (2020–2025)`}
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Open Papers</span>
                  <ExternalLink className="w-3 h-3 opacity-90" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
