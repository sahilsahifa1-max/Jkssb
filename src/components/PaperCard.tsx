import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Copy, 
  Calculator, 
  Atom, 
  BookOpen, 
  Globe, 
  PenTool, 
  ArrowRight,
  FolderOpen,
  Calendar,
  Check
} from 'lucide-react';
import { QuestionPaper, SubjectId } from '../types';

interface PaperCardProps {
  paper: QuestionPaper;
  onOpenDetails: (paper: QuestionPaper) => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper, onOpenDetails, onToast }) => {
  const [copied, setCopied] = useState(false);

  const getSubjectIcon = (subject: SubjectId) => {
    switch (subject) {
      case 'mathematics': return <Calculator className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
      case 'science': return <Atom className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'english': return <BookOpen className="w-5 h-5 text-indigo-600 dark:text-purple-400" />;
      case 'sst': return <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'urdu': return <PenTool className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default: return <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  const getSubjectColorClasses = (subject: SubjectId) => {
    switch (subject) {
      case 'mathematics': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      case 'science': return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800';
      case 'english': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'sst': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'urdu': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
      default: return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
    }
  };

  const handleShareOrCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/paper/${paper.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: paper.title,
          text: `Check out the ${paper.title} on JKSSB Papers:`,
          url: shareUrl,
        });
        onToast('Shared successfully!');
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      onToast('Could not copy link', 'error');
    }
  };

  return (
    <motion.div
      id={`paper-card-${paper.id}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-black/40 hover:border-sky-300 dark:hover:border-sky-800/80 transition-all cursor-pointer"
      onClick={() => onOpenDetails(paper)}
    >
      {/* Top Meta row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          {/* Subject Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700">
              {getSubjectIcon(paper.subject)}
            </div>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getSubjectColorClasses(paper.subject)}`}>
              {paper.subjectName}
            </span>
          </div>

          {/* Year & Archive Badges */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              {paper.year}
            </span>
            {paper.isComingSoon ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Coming soon
              </span>
            ) : (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                2020–2025 Archive
              </span>
            )}
          </div>
        </div>

        {/* Paper Title (e.g. Mathematics — 2024) */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {paper.displayTitle || `${paper.subjectName} — ${paper.year}`}
        </h3>

        {/* Archive Clarification Text */}
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          {paper.isComingSoon
            ? 'Official 2026 question papers will be added upon exam completion.'
            : `Question paper available in the ${paper.subjectName} archive.`}
        </p>

        {/* Exam & Cadre Subtext */}
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 line-clamp-1">
          {paper.exam}
        </p>

        {/* Source & Verification Metadata */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-slate-200">Source:</span>
            <span>Google Drive</span>
          </div>

          {paper.verified && !paper.isComingSoon ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Folder
            </span>
          ) : (
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              Awaiting 2026 Papers
            </span>
          )}
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Open Archive CTA */}
        {paper.isComingSoon ? (
          <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed">
            Coming soon
          </span>
        ) : (
          <a
            href={paper.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-xs transition-colors"
            title={`Open ${paper.subjectName} Google Drive archive in new tab`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Open Archive</span>
            <ExternalLink className="w-3 h-3 opacity-90" />
          </a>
        )}

        {/* Copy Link & Details Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShareOrCopy}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            title="Share or copy paper link"
            aria-label="Share paper link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onOpenDetails(paper)}
            className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:text-slate-400 dark:hover:text-sky-400 dark:hover:bg-sky-950/50 transition-colors"
            title="View paper details and metadata"
            aria-label="View paper details"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
