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
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {/* Subject Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700">
              {getSubjectIcon(paper.subject)}
            </div>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getSubjectColorClasses(paper.subject)}`}>
              {paper.subjectName}
            </span>
          </div>

          {/* Year Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            {paper.year}
          </span>
        </div>

        {/* Paper Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {paper.title}
        </h3>

        {/* Exam & Cadre Details */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">
          {paper.exam} • {paper.department}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {paper.type}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Lang: {paper.language}
          </span>
          {paper.verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Drive Folder
            </span>
          )}
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Open Paper CTA */}
        <a
          href={paper.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-xs transition-colors"
          title="Open Google Drive folder in new tab"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Open Paper</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

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
