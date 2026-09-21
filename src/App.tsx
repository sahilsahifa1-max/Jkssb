import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStats } from './components/TrustStats';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { PaperCard } from './components/PaperCard';
import { BrowseBySubject } from './components/BrowseBySubject';
import { BrowseByYear } from './components/BrowseByYear';
import { StudentHelperSection } from './components/StudentHelperSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CommandSearchModal } from './components/CommandSearchModal';
import { MissingPaperModal } from './components/MissingPaperModal';
import { PaperDetailPage } from './components/PaperDetailPage';
import { AboutPage } from './components/AboutPage';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

import { QuestionPaper, FilterState, NavRoute, SubjectId } from './types';
import { PAPERS, SUBJECTS, YEARS } from './data/papers';
import { ArrowLeft, BookOpen, Calendar, Filter, Layers, RotateCcw, Search, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jkssb_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jkssb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jkssb_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Notifications Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMissingPaperOpen, setIsMissingPaperOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    year: 'all',
    subject: 'all',
    exam: 'all',
  });

  // Route state
  const parseRouteFromUrl = (): NavRoute => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    const yearParam = searchParams.get('year');
    const subjectParam = searchParams.get('subject') as SubjectId | null;
    const qParam = searchParams.get('q');

    if (path.startsWith('/paper/')) {
      const paperId = path.replace('/paper/', '');
      return { view: 'paper-detail', paperId };
    }

    if (path.startsWith('/papers/')) {
      const yearStr = path.replace('/papers/', '');
      const yr = parseInt(yearStr, 10);
      if (!isNaN(yr)) {
        return { view: 'papers', year: yr };
      }
    }

    if (path.startsWith('/subjects/')) {
      const sub = path.replace('/subjects/', '') as SubjectId;
      return { view: 'papers', subject: sub };
    }

    if (path === '/papers') {
      return {
        view: 'papers',
        year: yearParam ? parseInt(yearParam, 10) : 'all',
        subject: subjectParam || 'all',
      };
    }

    if (path === '/about') {
      return { view: 'about' };
    }

    return {
      view: 'home',
      year: yearParam ? parseInt(yearParam, 10) : undefined,
      subject: subjectParam || undefined,
    };
  };

  const [currentRoute, setCurrentRoute] = useState<NavRoute>(parseRouteFromUrl);

  // Sync route changes with browser history & title
  const navigate = (route: NavRoute) => {
    setCurrentRoute(route);

    let url = '/';
    let title = 'JKSSB Papers — Previous Year Question Papers (2020–2026)';

    if (route.view === 'home') {
      url = '/';
      title = 'JKSSB Papers — Previous Year Question Papers (2020–2026)';
    } else if (route.view === 'papers') {
      const params = new URLSearchParams();
      if (route.year && route.year !== 'all') params.set('year', String(route.year));
      if (route.subject && route.subject !== 'all') params.set('subject', route.subject);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      url = `/papers${queryStr}`;
      title = 'Browse JKSSB Question Papers (2020–2026)';

      if (route.year) {
        setFilters((prev) => ({ ...prev, year: route.year! }));
      }
      if (route.subject) {
        setFilters((prev) => ({ ...prev, subject: route.subject! }));
      }
    } else if (route.view === 'subject' && route.subject) {
      url = `/subjects/${route.subject}`;
      title = `JKSSB ${route.subject.toUpperCase()} Question Papers (2020–2026)`;
      setFilters((prev) => ({ ...prev, subject: route.subject! }));
    } else if (route.view === 'year' && route.year) {
      url = `/papers/${route.year}`;
      title = `JKSSB ${route.year} Question Papers`;
      setFilters((prev) => ({ ...prev, year: route.year! }));
    } else if (route.view === 'paper-detail' && route.paperId) {
      url = `/paper/${route.paperId}`;
      const found = PAPERS.find((p) => p.id === route.paperId);
      title = found ? `${found.title} — JKSSB Papers` : 'JKSSB Question Paper';
    } else if (route.view === 'about') {
      url = '/about';
      title = 'About JKSSB Papers — Independent Student Resource';
    }

    window.history.pushState({}, '', url);
    document.title = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromUrl();
      setCurrentRoute(route);
      if (route.year) setFilters((prev) => ({ ...prev, year: route.year! }));
      if (route.subject) setFilters((prev) => ({ ...prev, subject: route.subject! }));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filtered papers list
  const filteredPapers = useMemo(() => {
    return PAPERS.filter((paper) => {
      // Year filter
      if (filters.year !== 'all' && paper.year !== filters.year) {
        return false;
      }
      // Subject filter
      if (filters.subject !== 'all' && paper.subject !== filters.subject) {
        return false;
      }
      // Exam filter
      if (filters.exam !== 'all' && paper.exam !== filters.exam) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const searchableText = `${paper.title} ${paper.subjectName} ${paper.year} ${paper.exam} ${paper.department} ${paper.tags.join(' ')}`.toLowerCase();
        return searchableText.includes(query);
      }
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      year: 'all',
      subject: 'all',
      exam: 'all',
    });
    showToast('Filters reset to default');
  };

  const handleOpenPaperDetails = (paper: QuestionPaper) => {
    navigate({ view: 'paper-detail', paperId: paper.id });
  };

  // Selected paper for detail view
  const currentPaper = useMemo(() => {
    if (currentRoute.view === 'paper-detail' && currentRoute.paperId) {
      return PAPERS.find((p) => p.id === currentRoute.paperId) || PAPERS[0];
    }
    return null;
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white antialiased transition-colors">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenMissingPaperModal={() => setIsMissingPaperOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentRoute.view === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onNavigate={navigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Trust Statistics */}
            <TrustStats />

            {/* Main Interactive Papers Catalog Section */}
            <section id="papers-archive" className="py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                      Verified Question Archive
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Explore Question Papers
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                      Filter by year (2020–2026), subject, or search by exam keywords with instant live updates.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsMissingPaperOpen(true)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Can't find a paper? Suggest it</span>
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                  <SearchAndFilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    totalMatches={filteredPapers.length}
                  />
                </div>

                {/* Papers Grid */}
                {filteredPapers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        paper={paper}
                        onOpenDetails={handleOpenPaperDetails}
                        onToast={showToast}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      No question papers match your filters
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
                      Try resetting your year or subject filters, or check the spelling in your search query.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset All Filters
                    </button>
                  </div>
                )}

              </div>
            </section>

            {/* Browse by Subject */}
            <BrowseBySubject
              onSelectSubject={(subjectId) => {
                navigate({ view: 'papers', subject: subjectId });
              }}
            />

            {/* Browse by Year (2020-2026) */}
            <BrowseByYear
              onSelectYear={(year) => {
                navigate({ view: 'papers', year });
              }}
            />

            {/* Preparation Strategy & Methodology */}
            <StudentHelperSection />

            {/* FAQ Accordion Section */}
            <FaqSection />
          </div>
        )}

        {/* VIEW: ALL PAPERS / FILTERED PAPERS */}
        {(currentRoute.view === 'papers' || currentRoute.view === 'subject' || currentRoute.view === 'year') && (
          <div className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="mb-8">
                <button
                  onClick={() => navigate({ view: 'home' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 mb-3 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Home
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  JKSSB Question Papers Archive
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  Verified question papers from 2020 to 2026. Use the filters below to instantly pinpoint papers by discipline, exam cycle, or year.
                </p>
              </div>

              {/* Filter controls */}
              <div className="mb-8">
                <SearchAndFilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalMatches={filteredPapers.length}
                />
              </div>

              {/* Grid of Results */}
              {filteredPapers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPapers.map((paper) => (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      onOpenDetails={handleOpenPaperDetails}
                      onToast={showToast}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    No question papers found
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
                    No question papers match your current search query and filter selection.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset All Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW: PAPER DETAIL */}
        {currentRoute.view === 'paper-detail' && currentPaper && (
          <PaperDetailPage
            paper={currentPaper}
            onNavigate={navigate}
            onToast={showToast}
          />
        )}

        {/* VIEW: ABOUT */}
        {currentRoute.view === 'about' && (
          <AboutPage
            onNavigate={navigate}
            onOpenMissingPaperModal={() => setIsMissingPaperOpen(true)}
          />
        )}

      </main>

      {/* Global Site Footer */}
      <Footer
        onNavigate={navigate}
        onOpenMissingPaperModal={() => setIsMissingPaperOpen(true)}
      />

      {/* Command Palette Modal (Ctrl+K) */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
        onSelectPaper={(paper) => {
          navigate({ view: 'paper-detail', paperId: paper.id });
        }}
      />

      {/* Missing Paper Suggestion Modal */}
      <MissingPaperModal
        isOpen={isMissingPaperOpen}
        onClose={() => setIsMissingPaperOpen(false)}
        onToast={showToast}
      />

      {/* PWA Install Notification */}
      <PWAInstallPrompt />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
