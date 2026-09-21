import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  FileText,
  Info
} from 'lucide-react';
import { NavRoute } from '../types';

interface NavbarProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMissingPaperModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize or navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentRoute]);

  const navLinks = [
    { label: 'Home', view: 'home' as const, icon: BookOpen },
    { label: 'Question Papers', view: 'papers' as const, icon: FileText },
    { label: 'Subjects', view: 'papers' as const, hash: '#subjects', icon: Layers },
    { label: 'Years', view: 'papers' as const, hash: '#years', icon: Calendar },
    { label: 'About', view: 'about' as const, icon: Info },
  ];

  return (
    <>
      <header
        id="main-navigation-bar"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm shadow-slate-900/5 dark:shadow-black/20 border-b border-slate-200/80 dark:border-slate-800/80 py-3'
            : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-home-button"
            onClick={() => onNavigate({ view: 'home' })}
            className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -ml-1 transition-transform"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-700 to-sky-600 p-0.5 shadow-md shadow-blue-600/20 group-hover:shadow-blue-600/30 transition-shadow">
              <div className="w-full h-full bg-slate-900/10 dark:bg-slate-950/20 rounded-[10px] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H20L25 11V26C25 26.55 24.55 27 24 27H8C7.45 27 7 26.55 7 26V7C7 6.45 7.45 6 8 6Z" fill="#FFFFFF" />
                  <path d="M20 6V11H25L20 6Z" fill="#94A3B8" />
                  <circle cx="20" cy="21" r="4.5" fill="#0284C7" />
                  <path d="M18.5 21L19.5 22L22 19.5" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                JKSSB <span className="text-sky-600 dark:text-sky-400">Papers</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wide">
                Archive 2020–2026
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute.view === link.view && !link.hash;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    if (link.hash) {
                      if (currentRoute.view !== 'home') {
                        onNavigate({ view: 'home' });
                        setTimeout(() => {
                          document.querySelector(link.hash!)?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      onNavigate({ view: link.view });
                    }
                  }}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-400 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              id="navbar-search-button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
              title="Search papers (Ctrl+K or ⌘K)"
              aria-label="Search question papers"
            >
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Search papers...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Desktop Browse CTA */}
            <button
              id="navbar-browse-cta"
              onClick={() => onNavigate({ view: 'papers' })}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 shadow-xs shadow-blue-500/20 active:scale-95 transition-all"
            >
              Browse Papers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Subtle Animated Top/Bottom Gradient Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden fixed top-[60px] left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentRoute.view === link.view && !link.hash;
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.hash) {
                        if (currentRoute.view !== 'home') {
                          onNavigate({ view: 'home' });
                          setTimeout(() => {
                            document.querySelector(link.hash!)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        } else {
                          document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        onNavigate({ view: link.view });
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm"
                >
                  <Search className="w-4 h-4" />
                  Quick Search (Ctrl+K)
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ view: 'papers' });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 text-white font-semibold text-sm shadow-md"
                >
                  Browse All 2020–2026 Papers
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
