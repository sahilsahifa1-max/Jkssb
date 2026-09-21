import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  FolderOpen, 
  BookOpen, 
  HelpCircle, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ArrowRight
} from 'lucide-react';
import { NavRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: NavRoute) => void;
  onOpenMissingPaperModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenMissingPaperModal }) => {
  return (
    <div id="about-page" className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Archive Mission & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About JKSSB Papers
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            A student-centered open archive dedicated to making authentic JKSSB previous year question papers accessible, fast, and structured for all aspirants across Jammu & Kashmir.
          </p>
        </div>

        {/* Why JKSSB Papers Exists */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Purpose & Core Philosophy
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Aspirants preparing for competitive examinations under the Jammu & Kashmir Services Selection Board (JKSSB) frequently encounter disorganized websites, broken download links, intrusive advertisements, or paywalls just to access past exam papers.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>JKSSB Papers</strong> solves this problem by providing a modern, ad-free, blazing-fast index of question papers spanning from 2020 through 2026. Every paper is categorized by year, examination type, and subject discipline (Mathematics, Science, English, SST, Urdu).
          </p>
        </div>

        {/* Three Guiding Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Verified Sources
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never fabricate question papers or post unverified content. All resources link directly to verified Google Drive repositories.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Speed & Mobile Ready
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero page reloads for searches, instant keyboard navigation with ⌘K, clean typography, and installable PWA support for mobile study.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% Free Forever
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Built purely to support aspirants. No registration required, no paywalls, and no subscription demands.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <ShieldCheck className="w-5 h-5" />
            <span>Important Independent Resource Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            <strong>JKSSB Papers</strong> is an independent academic compilation managed by students and education advocates. It is not affiliated with, authorized, maintained, sponsored or endorsed by the Jammu and Kashmir Services Selection Board (JKSSB), the Government of Jammu & Kashmir, or any official recruitment body.
          </p>
          <p className="leading-relaxed">
            All original question paper trademarks and rights belong to their respective authorities. The questions and materials provided are for non-commercial educational practice and reference purposes only.
          </p>
        </div>

        {/* Contact & Community Contribution */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">
              Contribute or Report an Issue
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Have an official JKSSB question paper from 2020–2026 not listed here? Let us know so we can verify and include it in the repository.
            </p>
          </div>

          <button
            onClick={onOpenMissingPaperModal}
            className="px-5 py-3 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-100 transition-colors shrink-0 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Suggest / Submit Paper
          </button>
        </div>

      </div>
    </div>
  );
};
