import React from 'react';
import { FileText, ArrowUp, ExternalLink, Heart, ShieldCheck, Mail } from 'lucide-react';
import { NavRoute } from '../types';

interface FooterProps {
  onNavigate: (route: NavRoute) => void;
  onOpenMissingPaperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMissingPaperModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-site-footer" className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200/60 dark:border-slate-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <button
              onClick={() => onNavigate({ view: 'home' })}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-sky-600 flex items-center justify-center text-white shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                JKSSB <span className="text-sky-600 dark:text-sky-400">Papers</span>
              </span>
            </button>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              "Making previous year question papers easier to find."
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Student-focused digital archive organizing JKSSB question papers from 2020 through 2026 across Mathematics, Science, English, Social Studies, and Urdu.
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenMissingPaperModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Found a missing paper? Suggest it here
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Archive Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'papers' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  All Question Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'about' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  About the Project
                </button>
              </li>
              <li>
                <button onClick={onOpenMissingPaperModal} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Submit / Suggest a Paper
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Subjects
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate({ view: 'subject', subject: 'mathematics' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Mathematics Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'subject', subject: 'science' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Science Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'subject', subject: 'english' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  English Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'subject', subject: 'sst' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Social Studies (SST)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate({ view: 'subject', subject: 'urdu' })} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Urdu Papers
                </button>
              </li>
            </ul>
          </div>

          {/* Years Index */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Archive Years
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
                <li key={yr}>
                  <button
                    onClick={() => onNavigate({ view: 'year', year: yr })}
                    className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {yr} Papers
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disclaimer and External Source Note */}
        <div className="py-6 border-b border-slate-200/60 dark:border-slate-800/60 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <p className="flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <span>
              <strong>Independent Resource Disclaimer:</strong> JKSSB Papers is an independent student resource and preparation archive. It is not affiliated with, authorized by, or endorsed by the Jammu and Kashmir Services Selection Board (JKSSB) or any governmental department.
            </span>
          </p>
          <p className="pl-5 text-slate-400 dark:text-slate-500">
            Sources may link to external Google Drive resources. All question papers remain the copyright of their respective exam authorities.
          </p>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} JKSSB Papers. Created for students with academic dedication.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate({ view: 'about' })}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Privacy & Disclaimer
            </button>
            <button
              onClick={() => onNavigate({ view: 'about' })}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Back to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
