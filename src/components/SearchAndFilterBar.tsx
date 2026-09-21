import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  RotateCcw, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FilterState, SubjectId } from '../types';
import { YEARS, SUBJECTS, EXAM_CATEGORIES } from '../data/papers';

interface SearchAndFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalMatches: number;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatches,
}) => {
  const exampleSearches = [
    { label: 'Mathematics 2024', subject: 'mathematics' as SubjectId, year: 2024 },
    { label: 'Science 2023', subject: 'science' as SubjectId, year: 2023 },
    { label: 'English 2025', subject: 'english' as SubjectId, year: 2025 },
    { label: 'Urdu 2022', subject: 'urdu' as SubjectId, year: 2022 },
  ];

  const hasActiveFilters = 
    Boolean(filters.searchQuery.trim()) || 
    filters.year !== 'all' || 
    filters.subject !== 'all' || 
    filters.exam !== 'all';

  return (
    <div id="main-search-and-filter-bar" className="w-full space-y-4">
      {/* Search Input Box */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-sky-600 dark:group-focus-within:text-sky-400 transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <input
          id="main-papers-search-input"
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder="Search question papers (e.g., Mathematics 2024, Science SI, Class IV, Urdu)..."
          className="w-full pl-12 sm:pl-14 pr-24 sm:pr-28 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium shadow-sm group-hover:border-slate-300 dark:group-hover:border-slate-700 focus:border-sky-500 dark:focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/15 transition-all"
        />

        <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center gap-2">
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ⌘K
          </span>
        </div>
      </div>

      {/* Featured Search Examples */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Try searching:
        </span>
        {exampleSearches.map((ex) => (
          <button
            key={ex.label}
            onClick={() => {
              onFilterChange({
                subject: ex.subject,
                year: ex.year,
                searchQuery: '',
              });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950/60 dark:hover:text-sky-400 text-slate-600 dark:text-slate-300 font-medium transition-colors border border-slate-200/80 dark:border-slate-700"
          >
            "{ex.label}"
          </button>
        ))}
      </div>

      {/* Filter Controls Row */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5">
        
        {/* Subject Filter Chips */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              Filter by Subject
            </span>
            {filters.subject !== 'all' && (
              <button
                onClick={() => onFilterChange({ subject: 'all' })}
                className="text-sky-600 dark:text-sky-400 hover:underline"
              >
                Clear subject
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ subject: 'all' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.subject === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Subjects
            </button>
            {SUBJECTS.map((sub) => {
              const isSelected = filters.subject === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onFilterChange({ subject: isSelected ? 'all' : sub.id })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Filter Chips */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-sky-500" />
              Filter by Year (2020–2026)
            </span>
            {filters.year !== 'all' && (
              <button
                onClick={() => onFilterChange({ year: 'all' })}
                className="text-sky-600 dark:text-sky-400 hover:underline"
              >
                Clear year
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ year: 'all' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.year === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Years
            </button>
            {YEARS.map((yr) => {
              const isSelected = filters.year === yr;
              return (
                <button
                  key={yr}
                  onClick={() => onFilterChange({ year: isSelected ? 'all' : yr })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Filter Status & Reset */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white font-bold">{totalMatches}</strong> verified {totalMatches === 1 ? 'paper' : 'papers'}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
