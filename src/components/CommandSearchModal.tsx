import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  Calculator, 
  Atom, 
  Globe, 
  PenTool, 
  CheckCircle2,
  CornerDownLeft,
  FolderOpen
} from 'lucide-react';
import { QuestionPaper, NavRoute, SubjectId } from '../types';
import { PAPERS, SUBJECTS } from '../data/papers';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: NavRoute) => void;
  onSelectPaper: (paper: QuestionPaper) => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectPaper,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter papers based on query
  const trimmed = query.trim().toLowerCase();
  const searchResults: QuestionPaper[] = trimmed
    ? PAPERS.filter((paper) => {
        const fullSearchable = `${paper.title} ${paper.subjectName} ${paper.year} ${paper.exam} ${paper.tags.join(' ')} ${paper.department}`.toLowerCase();
        return fullSearchable.includes(trimmed);
      }).slice(0, 8)
    : PAPERS.slice(0, 6);

  // Keyboard navigation inside command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          handleSelect(searchResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (paper: QuestionPaper) => {
    onClose();
    onSelectPaper(paper);
  };

  const getSubjectIcon = (sub: SubjectId) => {
    switch (sub) {
      case 'mathematics': return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'science': return <Atom className="w-4 h-4 text-teal-500" />;
      case 'english': return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'sst': return <Globe className="w-4 h-4 text-amber-500" />;
      case 'urdu': return <PenTool className="w-4 h-4 text-rose-500" />;
      default: return <BookOpen className="w-4 h-4 text-sky-500" />;
    }
  };

  const quickPills = [
    { label: 'Mathematics 2024', q: 'Mathematics 2024' },
    { label: 'Science 2023', q: 'Science 2023' },
    { label: 'English 2025', q: 'English 2025' },
    { label: 'Urdu 2020', q: 'Urdu 2020' },
    { label: 'SST 2022', q: 'SST 2022' },
    { label: 'Mathematics Archive', q: 'Mathematics' },
  ];

  // Helper to highlight matching text
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-sky-200/80 dark:bg-sky-900/60 text-sky-900 dark:text-sky-200 rounded px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20">
        {/* Backdrop */}
        <motion.div
          id="command-palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          id="command-palette-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Search question papers"
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-950/30 border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Top Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
            <Search className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <input
              ref={inputRef}
              id="command-search-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search e.g. Mathematics 2024, Science 2023, English 2025, Urdu..."
              className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
              ESC
            </kbd>
          </div>

          {/* Suggested Quick Filter Chips */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0 mr-1">Quick:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                onClick={() => {
                  setQuery(pill.q);
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-600 dark:text-slate-300 whitespace-nowrap transition-colors font-medium"
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
            {searchResults.length > 0 ? (
              searchResults.map((paper, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={paper.id}
                    id={`search-result-item-${paper.id}`}
                    onClick={() => handleSelect(paper)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800'
                        : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {getSubjectIcon(paper.subject)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {highlightMatch(paper.displayTitle || paper.title, trimmed)}
                          </h4>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300">
                            {paper.year}
                          </span>
                          {paper.isComingSoon ? (
                            <span className="inline-flex items-center text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                              Coming soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                              2020–2025 archive
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {paper.isComingSoon
                            ? 'Awaiting 2026 exam cycle release'
                            : `Question paper available in the ${paper.subjectName} archive.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!paper.isComingSoon ? (
                        <a
                          href={paper.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-xs"
                          title={`Open ${paper.subjectName} Google Drive folder`}
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span className="hidden xs:inline">Open Archive</span>
                          <ExternalLink className="w-3 h-3 opacity-80" />
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                  No question papers found matching "{query}"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Try checking the spelling or searching for a subject like Mathematics, Science, English, SST, or Urdu.
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">↑↓</kbd>
                navigate
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">↵</kbd>
                select
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">ESC</kbd>
                close
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigate({ view: 'papers' });
              }}
              className="text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center gap-1"
            >
              Browse all archive
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
